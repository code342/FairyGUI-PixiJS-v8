import { GObject } from "../GObject";
import { GearAnimation } from "./GearAnimation";
import { GearBase } from "./GearBase";
import { GearColor } from "./GearColor";
import { GearDisplay } from "./GearDisplay";
import { GearDisplay2 } from "./GearDisplay2";
import { GearFontSize } from "./GearFontSize";
import { GearIcon } from "./GearIcon";
import { GearLook } from "./GearLook";
import { GearSize } from "./GearSize";
import { GearText } from "./GearText";
import { GearXY } from "./GearXY";
var Classes: Array<typeof GearBase>;
export function createGear(owner: GObject, index: number): GearBase {
    if (!Classes)
        Classes = [
            GearDisplay, GearXY, GearSize, GearLook, GearColor,
            GearAnimation, GearText, GearIcon, GearDisplay2, GearFontSize
        ];
    return new (Classes[index])(owner);
}