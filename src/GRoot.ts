import { Application, Container, FederatedPointerEvent, Matrix, Point } from "pixi.js";
import { GComponent } from "./GComponent";
import { GObject} from "./GObject";
import { DisplayEvent, MouseEvents } from "./utils/LayaCompliant";
import { ToolSet } from "./utils/ToolSet";
import { UIConfig } from "./UIConfig";
import { UIPackage } from "./UIPackage";
import { GGraph } from "./GGraph";
import { PopupDirection, RelationType } from "./FieldTypes";
import { Window } from "./Window";
export class GRoot extends GComponent {
    public static contentScaleLevel: number = 0;

    private _modalLayer: GGraph;
    private _popupStack: GObject[];
    private _justClosedPopups: GObject[];
    private _modalWaitPane: GObject;
    private _tooltipWin: GObject;
    private _defaultTooltipWin: GObject;
    private _checkPopups: boolean;
    public app:Application;
    public stage:Container;
    private static _inst: GRoot;
    public ScrollFrameRate:number = 30;
    public static get inst(): GRoot {
        if (!GRoot._inst)
            new GRoot();
        return GRoot._inst;
    }

    constructor() {
        super();
        if (!GRoot._inst)
            GRoot._inst = this;

        this.opaque = false;
        this._popupStack = [];
        this._justClosedPopups = [];
        this.displayObject.once(DisplayEvent.Added, this.__addedToStage, this);
    }

    public launch(app:Application){
        this.app = app;
        this.stage = app.stage;
    }

    public get mousePosition():Point{
        return this.app.renderer.events.pointer.global
    }

    public showWindow(win: Window): void {
        this.addChild(win);
        win.requestFocus();

        if (win.x > this.width)
            win.x = this.width - win.width;
        else if (win.x + win.width < 0)
            win.x = 0;

        if (win.y > this.height)
            win.y = this.height - win.height;
        else if (win.y + win.height < 0)
            win.y = 0;

        this.adjustModalLayer();
    }

    public hideWindow(win: Window): void {
        win.hide();
    }

    public hideWindowImmediately(win: Window): void {
        if (win.parent == this)
            this.removeChild(win);

        this.adjustModalLayer();
    }

    public bringToFront(win: Window): void {
        var cnt: number = this.numChildren;
        var i: number;
        if (this._modalLayer.parent && !win.modal)
            i = this.getChildIndex(this._modalLayer) - 1;
        else
            i = cnt - 1;

        for (; i >= 0; i--) {
            var g: GObject = this.getChildAt(i);
            if (g == win)
                return;
            if (g instanceof Window)
                break;
        }

        if (i >= 0)
            this.setChildIndex(win, i);
    }

    public showModalWait(msg?: string): void {
        if (UIConfig.globalModalWaiting != null) {
            if (this._modalWaitPane == null)
                this._modalWaitPane = UIPackage.createObjectFromURL(UIConfig.globalModalWaiting);
            this._modalWaitPane.setSize(this.width, this.height);
            this._modalWaitPane.addRelation(this, RelationType.Size);

            this.addChild(this._modalWaitPane);
            this._modalWaitPane.text = msg;
        }
    }

    public closeModalWait(): void {
        if (this._modalWaitPane && this._modalWaitPane.parent)
            this.removeChild(this._modalWaitPane);
    }

    public closeAllExceptModals(): void {
        var arr: GObject[] = this._children.slice();
        var cnt: number = arr.length;
        for (var i: number = 0; i < cnt; i++) {
            var g: GObject = arr[i];
            if ((g instanceof Window) && !g.modal)
                g.hide();
        }
    }

    public closeAllWindows(): void {
        var arr: GObject[] = this._children.slice();
        var cnt: number = arr.length;
        for (var i: number = 0; i < cnt; i++) {
            var g: GObject = arr[i];
            if (g instanceof Window)
                g.hide();
        }
    }

    public getTopWindow(): Window {
        var cnt: number = this.numChildren;
        for (var i: number = cnt - 1; i >= 0; i--) {
            var g: GObject = this.getChildAt(i);
            if (g instanceof Window) {
                return g;
            }
        }

        return null;
    }

    public get modalLayer(): GGraph {
        return this._modalLayer;
    }

    public get hasModalWindow(): boolean {
        return this._modalLayer.parent != null;
    }

    public get modalWaiting(): boolean {
        return this._modalWaitPane && this._modalWaitPane.inContainer;
    }

    public showPopup(popup: GObject, target?: GObject, dir?: PopupDirection | boolean): void {
        if (this._popupStack.length > 0) {
            var k: number = this._popupStack.indexOf(popup);
            if (k != -1) {
                for (var i: number = this._popupStack.length - 1; i >= k; i--)
                    this.removeChild(this._popupStack.pop());
            }
        }
        this._popupStack.push(popup);

        if (target) {
            var p: GObject = target;
            while (p) {
                if (p.parent == this) {
                    if (popup.sortingOrder < p.sortingOrder) {
                        popup.sortingOrder = p.sortingOrder;
                    }
                    break;
                }
                p = p.parent;
            }
        }

        this.addChild(popup);
        this.adjustModalLayer();

        var pos: Point;
        var sizeW: number = 0, sizeH: number = 0;
        if (target) {
            pos = target.localToGlobal();
            sizeW = target.width;
            sizeH = target.height;
        }
        else {
            let mousePoint:Point = this.mousePosition;
            pos = this.globalToLocal(mousePoint.x, mousePoint.y);
        }
        var xx: number, yy: number;
        xx = pos.x;
        if (xx + popup.width > this.width)
            xx = xx + sizeW - popup.width;
        yy = pos.y + sizeH;
        if (((dir === undefined || dir === PopupDirection.Auto) && pos.y + popup.height > this.height)
            || dir === false || dir === PopupDirection.Up) {
            yy = pos.y - popup.height - 1;
            if (yy < 0) {
                yy = 0;
                xx += sizeW / 2;
            }
        }

        popup.x = xx;
        popup.y = yy;
    }

    public togglePopup(popup: GObject, target?: GObject, dir?: PopupDirection | boolean): void {
        if (this._justClosedPopups.indexOf(popup) != -1)
            return;

        this.showPopup(popup, target, dir);
    }

    public hidePopup(popup?: GObject): void {
        if (popup) {
            var k: number = this._popupStack.indexOf(popup);
            if (k != -1) {
                for (var i: number = this._popupStack.length - 1; i >= k; i--)
                    this.closePopup(this._popupStack.pop());
            }
        }
        else {
            var cnt: number = this._popupStack.length;
            for (i = cnt - 1; i >= 0; i--)
                this.closePopup(this._popupStack[i]);
            this._popupStack.length = 0;
        }
    }

    public get hasAnyPopup(): boolean {
        return this._popupStack.length != 0;
    }

    private closePopup(target: GObject): void {
        if (target.parent) {
            if (target instanceof Window)
                target.hide();
            else
                this.removeChild(target);
        }
    }

    public showTooltips(msg: string): void {
        if (this._defaultTooltipWin == null) {
            var resourceURL: string = UIConfig.tooltipsWin;
            if (!resourceURL) {
                console.log("UIConfig.tooltipsWin not defined");
                return;
            }

            this._defaultTooltipWin = UIPackage.createObjectFromURL(resourceURL);
        }

        this._defaultTooltipWin.text = msg;
        this.showTooltipsWin(this._defaultTooltipWin);
    }

    public showTooltipsWin(tooltipWin: GObject, position?: Point): void {
        this.hideTooltips();

        this._tooltipWin = tooltipWin;

        var xx: number = 0;
        var yy: number = 0;
        if (position == null) {
            let mousePoint:Point = this.mousePosition;
            xx = mousePoint.x + 10;
            yy = mousePoint.y + 20;
        }
        else {
            xx = position.x;
            yy = position.y;
        }
        var pt: Point = this.globalToLocal(xx, yy);
        xx = pt.x;
        yy = pt.y;

        if (xx + this._tooltipWin.width > this.width) {
            xx = xx - this._tooltipWin.width - 1;
            if (xx < 0)
                xx = 10;
        }
        if (yy + this._tooltipWin.height > this.height) {
            yy = yy - this._tooltipWin.height - 1;
            if (xx - this._tooltipWin.width - 1 > 0)
                xx = xx - this._tooltipWin.width - 1;
            if (yy < 0)
                yy = 10;
        }

        this._tooltipWin.x = xx;
        this._tooltipWin.y = yy;
        this.addChild(this._tooltipWin);
    }

    public hideTooltips(): void {
        if (this._tooltipWin) {
            if (this._tooltipWin.parent)
                this.removeChild(this._tooltipWin);
            this._tooltipWin = null;
        }
    }

    public get focus(): GObject {
        return null;
    }

    public set focus(value: GObject) {
        this.setFocus(value);
    }

    private setFocus(value: GObject): void {
    }

    //TODO:support volumeScale get
    public get volumeScale(): number {
        console.log('dont support volumeScale!!!');
        return 0;;
    }

    //TODO:support volumeScale set
    public set volumeScale(value: number) {
        console.log('dont support volumeScale!!!');
        
    }

    //TODO:support sound play
    public playOneShotSound(url: string, volumeScale?: number): void {
        if (ToolSet.startsWith(url, "ui://"))
            return;

        console.log('dont support playOneShotSound!!!');
    }

    private adjustModalLayer(): void {
        var cnt: number = this.numChildren;

        if (this._modalWaitPane != null && this._modalWaitPane.parent != null)
            this.setChildIndex(this._modalWaitPane, cnt - 1);

        for (var i: number = cnt - 1; i >= 0; i--) {
            var g: GObject = this.getChildAt(i);
            if ((g instanceof Window) && g.modal) {
                if (this._modalLayer.parent == null)
                    this.addChildAt(this._modalLayer, i);
                else
                    this.setChildIndexBefore(this._modalLayer, i);
                return;
            }
        }

        if (this._modalLayer.parent)
            this.removeChild(this._modalLayer);
    }

    private __addedToStage(): void {
        GRoot.inst.stage.on(MouseEvents.Down, this.__stageMouseDown, this);
        GRoot.inst.stage.on(MouseEvents.Up, this.__stageMouseUp, this);

        this._modalLayer = new GGraph();
        this._modalLayer.setSize(this.width, this.height);
        this._modalLayer.drawRect(0, null, UIConfig.modalLayerColor);
        this._modalLayer.addRelation(this, RelationType.Size);

        this.app.renderer.on('resize', this.__winResize, this);

        this.__winResize();
    }

    public checkPopups(clickTarget: Container): void {
        if (this._checkPopups)
            return;

        this._checkPopups = true;
        this._justClosedPopups.length = 0;
        if (this._popupStack.length > 0) {
            var mc: Container = clickTarget;
            while (mc != this.stage && mc) {
                let owner = mc.$owner;
                if (owner) {
                    var pindex: number = this._popupStack.indexOf(owner);
                    if (pindex != -1) {
                        for (var i: number = this._popupStack.length - 1; i > pindex; i--) {
                            var popup: GObject = this._popupStack.pop();
                            this.closePopup(popup);
                            this._justClosedPopups.push(popup);
                        }
                        return;
                    }
                }
                mc = mc.parent;
            }

            var cnt: number = this._popupStack.length;
            for (i = cnt - 1; i >= 0; i--) {
                popup = this._popupStack[i];
                this.closePopup(popup);
                this._justClosedPopups.push(popup);
            }
            this._popupStack.length = 0;
        }
    }

    private __stageMouseDown(evt: FederatedPointerEvent): void {
        if (this._tooltipWin)
            this.hideTooltips();

        this.checkPopups(evt.target);
    }

    private __stageMouseUp(): void {
        this._checkPopups = false;
    }

    private __winResize(): void {
        this.setSize(this.stage.width, this.stage.height);

        this.updateContentScaleLevel();
    }

    private updateContentScaleLevel(): void {
        var mat:Matrix = <Matrix>(this.stage)._canvasTransform;
        var ss: number = Math.max(mat.getScaleX(), mat.getScaleY());
        if (ss >= 3.5)
            GRoot.contentScaleLevel = 3; //x4
        else if (ss >= 2.5)
            GRoot.contentScaleLevel = 2; //x3
        else if (ss >= 1.5)
            GRoot.contentScaleLevel = 1; //x2
        else
            GRoot.contentScaleLevel = 0;
    }
}