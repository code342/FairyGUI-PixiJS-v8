
import "../FairyGui";

import { MainMenu } from "./MainMenu";

const app = new PIXI.Application();
await app.init({ resizeTo: window });
fgui.GRoot.inst.launch(app);

let mainMenu = new MainMenu();
