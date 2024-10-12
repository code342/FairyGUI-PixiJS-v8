import { BasicDemo } from "./BasicsDemo";

export class MainMenu {
    private _view: fgui.GComponent;
    constructor(){
        fgui.UIPackage.loadPackage("resources/ui/MainMenu",this.onUILoaded.bind(this));
    }

    onUILoaded(){
        this._view = fgui.UIPackage.createObject("MainMenu", "Main").asCom;
       // this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._view.getChild("n1").onClick(this, () => {
            this.startDemo(BasicDemo);
        });
        
    }

    startDemo(demoClass: any): void {
        this._view.dispose();
        let demo: any = new demoClass();
        fgui.GRoot.inst.stage.emit("start_demo", demo);
    }

    destroy() {
        this._view.dispose();
    }
}