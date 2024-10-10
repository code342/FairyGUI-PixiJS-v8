export class MainMenu {
    private _view: fgui.GComponent;
    constructor(){
        fgui.UIPackage.loadPackage("assets/resources/ui/MainMenu",this.onUILoaded.bind(this));
    }

    onUILoaded(){
        this._view = fgui.UIPackage.createObject("MainMenu", "Main").asCom;
       // this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
    }
}