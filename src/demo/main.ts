//import { Application } from "pixi.js";



export default class main {
  constructor() {
    console.log("hello demo!");
  }

  async int() {
    const app = new PIXI.Application();
    await app.init({ resizeTo: window });
    fgui.GRoot.inst.launch(app);
  }
}

new main();
