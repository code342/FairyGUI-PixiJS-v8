
import { DemoEntry } from "./DemoEntry";

const app = new PIXI.Application();
await app.init({ width:1136,height:640 });
document.body.appendChild(app.canvas);
app.stage.eventMode = "static";
app.renderer.events.features.globalMove = false;
fgui.GRoot.inst.launch(app);

let demo = new DemoEntry();
/*fgui.UIPackage.loadPackage("resources/ui/Test",()=>{
    let view = fgui.UIPackage.createObject("Test", "Component1").asCom;
    fgui.GRoot.inst.addChild(view);
   // view.getChild("n3").asTextField.text = "Pixi.js 中文测试";
});*/

