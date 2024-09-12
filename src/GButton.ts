import { AudioClip, Color, EventMouse } from "cc";
import { Controller } from "./Controller";
import { Event as FUIEvent } from "./event/Event";
import { ButtonMode, ObjectPropID } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GObject } from "./GObject";
import { GRoot } from "./GRoot";
import { GTextField } from "./GTextField";
import { PackageItem } from "./PackageItem";
import { UIConfig } from "./UIConfig";
import { UIPackage } from "./UIPackage";
import { ByteBuffer } from "./utils/ByteBuffer";
import { Window } from "./Window";

export class GButton extends GComponent {
    protected _titleObject: GObject;
    protected _iconObject: GObject;

    private _mode: ButtonMode;
    private _selected: boolean;
    private _title: string;
    private _selectedTitle: string;
    private _icon: string;
    private _selectedIcon: string;
    private _sound: string;
    private _soundVolumeScale: number;
    private _buttonController: Controller;
    private _relatedController?: Controller;
    private _relatedPageId: string;
    private _changeStateOnClick: boolean;
    private _linkedPopup?: GObject;
    private _downEffect: number;
    private _downEffectValue: number;
    private _downColor?: Color;
    private _downScaled?: boolean;
    private _down: boolean;
    private _over: boolean;

    public static UP: string = "up";
    public static DOWN: string = "down";
    public static OVER: string = "over";
    public static SELECTED_OVER: string = "selectedOver";
    public static DISABLED: string = "disabled";
    public static SELECTED_DISABLED: string = "selectedDisabled";

    public constructor() {
        super();

        this._node.name = "GButton";
        this._mode = ButtonMode.Common;
        this._title = "";
        this._icon = "";
        this._sound = UIConfig.buttonSound;
        this._soundVolumeScale = UIConfig.buttonSoundVolumeScale;
        this._changeStateOnClick = true;
        this._downEffect = 0;
        this._downEffectValue = 0.8;
    }

    public get icon(): string | null {
        return this._icon;
    }

    public set icon(value: string | null) {
        this._icon = value;
        value = (this._selected && this._selectedIcon) ? this._selectedIcon : this._icon;
        if (this._iconObject)
            this._iconObject.icon = value;
        this.updateGear(7);
    }

    public get selectedIcon(): string | null {
        return this._selectedIcon;
    }

    public set selectedIcon(value: string | null) {
        this._selectedIcon = value;
        value = (this._selected && this._selectedIcon) ? this._selectedIcon : this._icon;
        if (this._iconObject)
            this._iconObject.icon = value;
    }

    public get title(): string | null {
        return this._title;
    }

    public set title(value: string | null) {
        this._title = value;
        if (this._titleObject)
            this._titleObject.text = (this._selected && this._selectedTitle) ? this._selectedTitle : this._title;
        this.updateGear(6);
    }

    public get text(): string | null {
        return this.title;
    }

    public set text(value: string | null) {
        this.title = value;
    }

    public get selectedTitle(): string | null {
        return this._selectedTitle;
    }

    public set selectedTitle(value: string | null) {
        this._selectedTitle = value;
        if (this._titleObject)
            this._titleObject.text = (this._selected && this._selectedTitle) ? this._selectedTitle : this._title;
    }

    public get titleColor(): Color {
        var tf: GTextField = this.getTextField();
        if (tf)
            return tf.color;
        else
            return Color.BLACK;
    }

    public set titleColor(value: Color) {
        var tf: GTextField = this.getTextField();
        if (tf)
            tf.color = value;
    }

    public get titleFontSize(): number {
        var tf: GTextField = this.getTextField();
        if (tf)
            return tf.fontSize;
        else
            return 0;
    }

    public set titleFontSize(value: number) {
        var tf: GTextField = this.getTextField();
        if (tf)
            tf.fontSize = value;
    }
    
    public get sound(): string | null {
        return this._sound;
    }

    public set sound(val: string | null) {
        this._sound = val;
    }

    public get soundVolumeScale(): number {
        return this._soundVolumeScale;
    }

    public set soundVolumeScale(value: number) {
        this._soundVolumeScale = value;
    }

    public set selected(val: boolean) {
        if (this._mode == ButtonMode.Common)
            return;

        if (this._selected != val) {
            this._selected = val;
            this.setCurrentState();
            if (this._selectedTitle && this._titleObject)
                this._titleObject.text = this._selected ? this._selectedTitle : this._title;
            if (this._selectedIcon) {
                var str: string = this._selected ? this._selectedIcon : this._icon;
                if (this._iconObject)
                    this._iconObject.icon = str;
            }
            if (this._relatedController
                && this._parent
                && !this._parent._buildingDisplayList) {
                if (this._selected) {
                    this._relatedController.selectedPageId = this._relatedPageId;
                    if (this._relatedController.autoRadioGroupDepth)
                        this._parent.adjustRadioGroupDepth(this, this._relatedController);
                }
                else if (this._mode == ButtonMode.Check && this._relatedController.selectedPageId == this._relatedPageId)
                    this._relatedController.oppositePageId = this._relatedPageId;
            }
        }
    }

    public get selected(): boolean {
        return this._selected;
    }

    public get mode(): ButtonMode {
        return this._mode;
    }

    public set mode(value: ButtonMode) {
        if (this._mode != value) {
            if (value == ButtonMode.Common)
                this.selected = false;
            this._mode = value;
        }
    }

    public get relatedController(): Controller {
        return this._relatedController;
    }

    public set relatedController(val: Controller) {
        this._relatedController = val;
    }

    public get relatedPageId(): string | null {
        return this._relatedPageId;
    }

    public set relatedPageId(val: string | null) {
        this._relatedPageId = val;
    }

    public get changeStateOnClick(): boolean {
        return this._changeStateOnClick;
    }

    public set changeStateOnClick(value: boolean) {
        this._changeStateOnClick = value;
    }

    public get linkedPopup(): GObject {
        return this._linkedPopup;
    }

    public set linkedPopup(value: GObject) {
        this._linkedPopup = value;
    }

    public getTextField(): GTextField {
        if (this._titleObject instanceof GTextField)
            return this._titleObject;
        else if ('getTextField' in this._titleObject)
            return (<any>this._titleObject).getTextField();
        else
            return null;
    }

    public fireClick(): void {
        GRoot.inst.inputProcessor.simulateClick(this);
    }

    protected setState(val: string): void {
        if (this._buttonController)
            this._buttonController.selectedPage = val;

        if (this._downEffect == 1) {
            var cnt: number = this.numChildren;
            if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED) {

                if (!this._downColor)
                    this._downColor = new Color();
                var r: number = this._downEffectValue * 255;
                this._downColor.r = this._downColor.g = this._downColor.b = r;
                for (var i: number = 0; i < cnt; i++) {
                    var obj: GObject = this.getChildAt(i);
                    if (!(obj instanceof GTextField))
                        obj.setProp(ObjectPropID.Color, this._downColor);
                }
            }
            else {
                for (var i: number = 0; i < cnt; i++) {
                    var obj: GObject = this.getChildAt(i);
                    if (!(obj instanceof GTextField))
                        obj.setProp(ObjectPropID.Color, Color.WHITE);
                }
            }
        }
        else if (this._downEffect == 2) {
            if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED) {
                if (!this._downScaled) {
                    this._downScaled = true;
                    this.setScale(this.scaleX * this._downEffectValue, this.scaleY * this._downEffectValue);
                }
            }
            else {
                if (this._downScaled) {
                    this._downScaled = false;
                    this.setScale(this.scaleX / this._downEffectValue, this.scaleY / this._downEffectValue);
                }
            }
        }
    }

    protected setCurrentState() {
        if (this.grayed && this._buttonController && this._buttonController.hasPage(GButton.DISABLED)) {
            if (this._selected)
                this.setState(GButton.SELECTED_DISABLED);
            else
                this.setState(GButton.DISABLED);
        }
        else {
            if (this._selected)
                this.setState(this._over ? GButton.SELECTED_OVER : GButton.DOWN);
            else
                this.setState(this._over ? GButton.OVER : GButton.UP);
        }
    }

    public handleControllerChanged(c: Controller): void {
        super.handleControllerChanged(c);

        if (this._relatedController == c)
            this.selected = this._relatedPageId == c.selectedPageId;
    }

    protected handleGrayedChanged(): void {
        if (this._buttonController && this._buttonController.hasPage(GButton.DISABLED)) {
            if (this.grayed) {
                if (this._selected && this._buttonController.hasPage(GButton.SELECTED_DISABLED))
                    this.setState(GButton.SELECTED_DISABLED);
                else
                    this.setState(GButton.DISABLED);
            }
            else if (this._selected)
                this.setState(GButton.DOWN);
            else
                this.setState(GButton.UP);
        }
        else
            super.handleGrayedChanged();
    }

    public getProp(index: number): any {
        switch (index) {
            case ObjectPropID.Color:
                return this.titleColor;
            case ObjectPropID.OutlineColor:
                {
                    var tf: GTextField = this.getTextField();
                    if (tf)
                        return tf.strokeColor;
                    else
                        return 0;
                }
            case ObjectPropID.FontSize:
                return this.titleFontSize;
            case ObjectPropID.Selected:
                return this.selected;
            default:
                return super.getProp(index);
        }
    }

    public setProp(index: number, value: any): void {
        switch (index) {
            case ObjectPropID.Color:
                this.titleColor = value;
                break;
            case ObjectPropID.OutlineColor:
                {
                    var tf: GTextField = this.getTextField();
                    if (tf)
                        tf.strokeColor = value;
                }
                break;
            case ObjectPropID.FontSize:
                this.titleFontSize = value;
                break;
            case ObjectPropID.Selected:
                this.selected = value;
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }

    protected constructExtension(buffer: ByteBuffer): void {
        buffer.seek(0, 6);

        this._mode = buffer.readByte();
        var str: string = buffer.readS();
        if (str)
            this._sound = str;
        this._soundVolumeScale = buffer.readFloat();
        this._downEffect = buffer.readByte();
        this._downEffectValue = buffer.readFloat();
        if (this._downEffect == 2)
            this.setPivot(0.5, 0.5, this.pivotAsAnchor);

        this._buttonController = this.getController("button");
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
        if (this._titleObject)
            this._title = this._titleObject.text;
        if (this._iconObject)
            this._icon = this._iconObject.icon;

        if (this._mode == ButtonMode.Common)
            this.setState(GButton.UP);

        this._node.on(FUIEvent.TOUCH_BEGIN, this.onTouchBegin_1, this);
        this._node.on(FUIEvent.TOUCH_END, this.onTouchEnd_1, this);
        this._node.on(FUIEvent.ROLL_OVER, this.onRollOver_1, this);
        this._node.on(FUIEvent.ROLL_OUT, this.onRollOut_1, this);
        this._node.on(FUIEvent.CLICK, this.onClick_1, this);
    }

    public setup_afterAdd(buffer: ByteBuffer, beginPos: number): void {
        super.setup_afterAdd(buffer, beginPos);

        if (!buffer.seek(beginPos, 6))
            return;

        if (buffer.readByte() != this.packageItem.objectType)
            return;

        var str: string;
        var iv: number;

        str = buffer.readS();
        if (str != null)
            this.title = str;
        str = buffer.readS();
        if (str != null)
            this.selectedTitle = str;
        str = buffer.readS();
        if (str != null)
            this.icon = str;
        str = buffer.readS();
        if (str != null)
            this.selectedIcon = str;
        if (buffer.readBool())
            this.titleColor = buffer.readColor();
        iv = buffer.readInt();
        if (iv != 0)
            this.titleFontSize = iv;
        iv = buffer.readShort();
        if (iv >= 0)
            this._relatedController = this.parent.getControllerAt(iv);
        this._relatedPageId = buffer.readS();

        str = buffer.readS();
        if (str != null)
            this._sound = str;
        if (buffer.readBool())
            this._soundVolumeScale = buffer.readFloat();

        this.selected = buffer.readBool();
    }

    private onRollOver_1(): void {
        if (!this._buttonController || !this._buttonController.hasPage(GButton.OVER))
            return;

        this._over = true;
        if (this._down)
            return;

        if (this.grayed && this._buttonController.hasPage(GButton.DISABLED))
            return;

        this.setState(this._selected ? GButton.SELECTED_OVER : GButton.OVER);
    }

    private onRollOut_1(): void {
        if (!this._buttonController || !this._buttonController.hasPage(GButton.OVER))
            return;

        this._over = false;
        if (this._down)
            return;

        if (this.grayed && this._buttonController.hasPage(GButton.DISABLED))
            return;

        this.setState(this._selected ? GButton.DOWN : GButton.UP);
    }

    private onTouchBegin_1(evt: FUIEvent): void {
        if (evt.button != EventMouse.BUTTON_LEFT)
            return;

        this._down = true;
        evt.captureTouch();

        if (this._mode == ButtonMode.Common) {
            if (this.grayed && this._buttonController && this._buttonController.hasPage(GButton.DISABLED))
                this.setState(GButton.SELECTED_DISABLED);
            else
                this.setState(GButton.DOWN);
        }

        if (this._linkedPopup) {
            if (this._linkedPopup instanceof Window)
                this._linkedPopup.toggleStatus();
            else
                GRoot.inst.togglePopup(this._linkedPopup, this);
        }
    }

    private onTouchEnd_1(evt: FUIEvent): void {
        if (evt.button != EventMouse.BUTTON_LEFT)
            return;

        if (this._down) {
            this._down = false;

            if (this._node == null)
                return;

            if (this._mode == ButtonMode.Common) {
                if (this.grayed && this._buttonController && this._buttonController.hasPage(GButton.DISABLED))
                    this.setState(GButton.DISABLED);
                else if (this._over)
                    this.setState(GButton.OVER);
                else
                    this.setState(GButton.UP);
            }
            else {
                if (!this._over
                    && this._buttonController != null
                    && (this._buttonController.selectedPage == GButton.OVER
                        || this._buttonController.selectedPage == GButton.SELECTED_OVER)) {
                    this.setCurrentState();
                }
            }
        }
    }

    private onClick_1(): void {
        if (this._sound) {
            var pi: PackageItem = UIPackage.getItemByURL(this._sound);
            if (pi) {
                var sound: AudioClip = <AudioClip>pi.owner.getItemAsset(pi);
                if (sound)
                    GRoot.inst.playOneShotSound(sound, this._soundVolumeScale);
            }
        }

        if (this._mode == ButtonMode.Check) {
            if (this._changeStateOnClick) {
                this.selected = !this._selected;
                this._node.emit(FUIEvent.STATUS_CHANGED, this);
            }
        }
        else if (this._mode == ButtonMode.Radio) {
            if (this._changeStateOnClick && !this._selected) {
                this.selected = true;
                this._node.emit(FUIEvent.STATUS_CHANGED, this);
            }
        }
        else {
            if (this._relatedController)
                this._relatedController.selectedPageId = this._relatedPageId;
        }
    }
}