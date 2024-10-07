import { Application } from "pixi.js";
import * as fgui from "../FairyGui";
export default class main {
  constructor() {
    console.log("hello demo!");
  }

  async int() {
    const app = new Application();
    await app.init({ resizeTo: window });
    fgui.GRoot.inst.launch(app);
  }
}

new main();
