import { BitmapFont, Point, Rectangle, Texture } from "pixi.js";
import { ByteBuffer } from "./utils/ByteBuffer";
import { GRoot } from "./GRoot";
import { UIPackage } from "./UIPackage";
import { PixelHitTestData } from "./utils/hittest/PixelHitTest";
import { Frame } from "./display/MovieClip";
import SpineTemplet from "./extension/SpineTemplet";
import Templet from "./extension/Templet";

export class PackageItem {
    public owner: UIPackage;

    public type: number;
    public objectType?: number;

    public id: string;
    public name: string;
    public width: number = 0;
    public height: number = 0;
    public file: string;
    public decoded?: boolean;
    public loading?: Array<Function>;
    public rawData?: ByteBuffer;

    public highResolution?: Array<string>;
    public branches?: Array<string>;

    //image
    public scale9Grid?: Rectangle;
    public scaleByTile?: boolean;
    public tileGridIndice?: number;
    public smoothing?: boolean;
    public texture?: Texture;
    public pixelHitTestData?: PixelHitTestData;

    //movieclip
    public interval?: number;
    public repeatDelay?: number;
    public swing?: boolean;
    public frames?: Frame[];

    //componenet
    public extensionType?: any;

    //font 
    public bitmapFont?: BitmapFont;

    //skeleton
    public templet?: Templet | SpineTemplet;
    public skeletonAnchor?: Point;

    constructor() {
    }

    public load(): any {
        return this.owner.getItemAsset(this);
    }

    public getBranch(): PackageItem {
        if (this.branches && this.owner._branchIndex != -1) {
            var itemId: string = this.branches[this.owner._branchIndex];
            if (itemId)
                return this.owner.getItemById(itemId);
        }

        return this;
    }

    public getHighResolution(): PackageItem {
        if (this.highResolution && GRoot.contentScaleLevel > 0) {
            var itemId: string = this.highResolution[GRoot.contentScaleLevel - 1];
            if (itemId)
                return this.owner.getItemById(itemId);
        }

        return this;
    }

    public toString(): string {
        return this.name;
    }
}