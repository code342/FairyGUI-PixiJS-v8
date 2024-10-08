namespace fgui {
    var Classes: Array<typeof GearBase>;
    export function createGear(owner: GObject, index: number): GearBase {
        if (!Classes)
            Classes = [
                GearDisplay, GearXY, GearSize, GearLook, GearColor,
                GearAnimation, GearText, GearIcon, GearDisplay2, GearFontSize
            ];
        return new (Classes[index])(owner);
    }
}