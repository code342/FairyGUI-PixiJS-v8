
//import { Application } from "pixi.js";
import { MainMenu } from "./MainMenu";

const app = new PIXI.Application();
await app.init({ resizeTo: window });
document.body.appendChild(app.canvas);
fgui.GRoot.inst.launch(app);

//let mainMenu = new MainMenu();
fgui.UIPackage.loadPackage("assets/resources/ui/Test",()=>{
    let view = fgui.UIPackage.createObject("Test", "Component1").asCom;
    fgui.GRoot.inst.addChild(view);
   // view.getChild("n3").asTextField.text = "Pixi.js 中文测试";
});
/*PIXI.Assets.load("assets/1.png").then((texture)=>{
    let sprite = new PIXI.Sprite(texture);
    app.stage.addChild(sprite);
});*/
