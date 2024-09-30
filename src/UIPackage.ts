import { BitmapFont, BitmapFontManager, Point, Rectangle, Texture } from "pixi.js";
import { GObject } from "./GObject";
import { PackageItem } from "./PackageItem";
import { UIConfig } from "./UIConfig";
import { ByteBuffer } from "./utils/ByteBuffer";
import { ObjectType, PackageItemType } from "./FieldTypes";
import { UIObjectFactory } from "./UIObjectFactory";
import { AssetProxy } from "./AssetProxy";
import { Frame } from "./display/MovieClip";
import { PixelHitTestData } from "./utils/hittest/PixelHitTest";
import { BMGlyph } from "./extension/BMGlyph";

type PackageDependency = { id: string, name: string };

export class UIPackage {
    private _id: string;
    private _name: string;
    private _items: PackageItem[];
    private _itemsById: Record<string, PackageItem>;
    private _itemsByName: Record<string, PackageItem>;
    private _resKey: string;
    private _customId: string;
    private _sprites: Record<string, AtlasSprite>;
    private _dependencies: Array<PackageDependency>;
    private _branches: Array<string>;
    public _branchIndex: number;

    public static _constructing: number = 0;

    private static _instById: Record<string, UIPackage> = {};
    private static _instByName: Record<string, UIPackage> = {};
    private static _branch: string = "";
    private static _vars: Record<string, string> = {};

    constructor() {
        this._items = [];
        this._itemsById = {};
        this._itemsByName = {};
        this._sprites = {};
        this._dependencies = [];
        this._branches = [];
        this._branchIndex = -1;
    }

    public static get branch(): string {
        return UIPackage._branch;
    }

    public static set branch(value: string) {
        UIPackage._branch = value;
        for (var pkgId in UIPackage._instById) {
            var pkg: UIPackage = UIPackage._instById[pkgId];
            if (pkg._branches) {
                pkg._branchIndex = pkg._branches.indexOf(value);
            }
        }
    }

    public static getVar(key: string): string {
        return UIPackage._vars[key];
    }

    public static setVar(key: string, value: string) {
        UIPackage._vars[key] = value;
    }

    public static getById(id: string): UIPackage {
        return UIPackage._instById[id];
    }

    public static getByName(name: string): UIPackage {
        return UIPackage._instByName[name];
    }

    public static addPackage(resKey: string, descData?: ArrayBuffer): UIPackage {
        if (!descData) {
            descData = AssetProxy.inst.getRes(resKey + "." + UIConfig.packageFileExtension);
            if (!descData || descData.byteLength == 0)
                throw new Error("resource '" + resKey + "' not found");
        }

        var buffer: ByteBuffer = new ByteBuffer(descData);

        var pkg: UIPackage = new UIPackage();
        pkg._resKey = resKey;
        pkg.loadPackage(buffer);
        UIPackage._instById[pkg.id] = pkg;
        UIPackage._instByName[pkg.name] = pkg;
        UIPackage._instById[resKey] = pkg;
        return pkg;
    }
    /**
     * @param resKey resKey 或 [resKey1,resKey2,resKey3....]
     */
    public static loadPackage(resKey: string | Array<string>, completeHandler: (pkgs: UIPackage[]) => void, progressHandler?: (progress: number) => void): void {
        let loadKeyArr = [];
        let keys: Array<string> = [];
        let i: number;
        if (Array.isArray(resKey)) {
            for (i = 0; i < resKey.length; i++) {
                loadKeyArr.push(resKey[i] + "." + UIConfig.packageFileExtension);
                keys.push(resKey[i]);
            }
        }
        else {
            loadKeyArr = [resKey + "." + UIConfig.packageFileExtension];
            keys = [resKey];
        }

        let pkgArr: Array<UIPackage> = [];
        let pkg: UIPackage;
        for (i = 0; i < loadKeyArr.length; i++) {
            pkg = UIPackage._instById[keys[i]];
            if (pkg) {
                pkgArr.push(pkg);
                loadKeyArr.splice(i, 1);
                keys.splice(i, 1);
                i--;
            }
        }
        if (loadKeyArr.length == 0 && completeHandler) {
            completeHandler(pkgArr);
            return;
        }

        AssetProxy.inst.load(loadKeyArr).then((resArr: Array<ByteBuffer>) => {
            let pkg: UIPackage;
            let urls = [];
            for (i = 0; i < loadKeyArr.length; i++) {
                let asset = resArr[i];
                if (asset) {
                    pkg = new UIPackage();
                    pkgArr.push(pkg);
                    pkg._resKey = keys[i];
                    pkg.loadPackage(new ByteBuffer(asset));
                    let cnt: number = pkg._items.length;
                    for (let j: number = 0; j < cnt; j++) {
                        let pi: PackageItem = pkg._items[j];
                        if (pi.type == PackageItemType.Atlas) {
                            urls.push(pi.file);
                        }
                        else if (pi.type == PackageItemType.Sound) {
                            urls.push(pi.file);
                        }
                    }
                }
            }
            if (urls.length > 0) {
                AssetProxy.inst.load(urls, null, (progress: number) => {
                    if (progressHandler)
                        progressHandler(progress);
                }).then(() => {
                    for (i = 0; i < pkgArr.length; i++) {
                        pkg = pkgArr[i];
                        if (!UIPackage._instById[pkg.id]) {
                            UIPackage._instById[pkg.id] = pkg;
                            UIPackage._instByName[pkg.name] = pkg;
                            UIPackage._instById[pkg._resKey] = pkg;
                        }
                    }
                     completeHandler(pkgArr);
                });
            }
            else {
                for (i = 0; i < pkgArr.length; i++) {
                    pkg = pkgArr[i];
                    if (!UIPackage._instById[pkg.id]) {
                        UIPackage._instById[pkg.id] = pkg;
                        UIPackage._instByName[pkg.name] = pkg;
                        UIPackage._instById[pkg._resKey] = pkg;
                    }
                }
                completeHandler(pkgArr);
            }
        });
    }

    public static removePackage(packageIdOrName: string): void {
        var pkg: UIPackage = UIPackage._instById[packageIdOrName];
        if (!pkg)
            pkg = UIPackage._instByName[packageIdOrName];
        if (!pkg)
            throw new Error("unknown package: " + packageIdOrName);

        pkg.dispose();
        delete UIPackage._instById[pkg.id];
        delete UIPackage._instByName[pkg.name];
        delete UIPackage._instById[pkg._resKey];
        if (pkg._customId)
            delete UIPackage._instById[pkg._customId];
    }

    public static createObject(pkgName: string, resName: string, userClass?: new () => GObject): GObject {
        var pkg: UIPackage = UIPackage.getByName(pkgName);
        if (pkg)
            return pkg.createObject(resName, userClass);
        else
            return null;
    }

    public static createObjectFromURL(url: string, userClass?: new () => GObject): GObject {
        var pi: PackageItem = UIPackage.getItemByURL(url);
        if (pi)
            return pi.owner.internalCreateObject(pi, userClass);
        else
            return null;
    }

    public static getItemURL(pkgName: string, resName: string): string {
        var pkg: UIPackage = UIPackage.getByName(pkgName);
        if (!pkg)
            return null;

        var pi: PackageItem = pkg._itemsByName[resName];
        if (!pi)
            return null;

        return "ui://" + pkg.id + pi.id;
    }

    public static getItemByURL(url: string): PackageItem {
        var pos1: number = url.indexOf("//");
        if (pos1 == -1)
            return null;

        var pos2: number = url.indexOf("/", pos1 + 2);
        if (pos2 == -1) {
            if (url.length > 13) {
                var pkgId: string = url.substring(5, 13);
                var pkg: UIPackage = UIPackage.getById(pkgId);
                if (pkg) {
                    var srcId: string = url.substring(13);
                    return pkg.getItemById(srcId);
                }
            }
        }
        else {
            var pkgName: string = url.substring(pos1 + 2, pos2);
            pkg = UIPackage.getByName(pkgName);
            if (pkg) {
                var srcName: string = url.substring(pos2 + 1);
                return pkg.getItemByName(srcName);
            }
        }

        return null;
    }

    public static getItemAssetByURL(url: string): any {
        var item: PackageItem = UIPackage.getItemByURL(url);
        if (item == null)
            return null;

        return item.owner.getItemAsset(item);
    }

    public static normalizeURL(url: string): string {
        if (url == null)
            return null;

        var pos1: number = url.indexOf("//");
        if (pos1 == -1)
            return null;

        var pos2: number = url.indexOf("/", pos1 + 2);
        if (pos2 == -1)
            return url;

        var pkgName: string = url.substring(pos1 + 2, pos2);
        var srcName: string = url.substring(pos2 + 1);
        return UIPackage.getItemURL(pkgName, srcName);
    }

    private loadPackage(buffer: ByteBuffer): void {
        if (buffer.readUint32() != 0x46475549)
            throw new Error("FairyGUI: old package format found in '" + this._resKey + "'");

        buffer.version = buffer.readInt32();
        var compressed: boolean = buffer.readBool();
        this._id = buffer.readUTFString();
        this._name = buffer.readUTFString();
        buffer.skip(20);

        if (compressed) {
            var buf: Uint8Array = new Uint8Array(buffer.buffer, buffer.pos, buffer.length - buffer.pos);
            var inflater = new Zlib.RawInflate(buf);
            buf = inflater.decompress();

            let buffer2: ByteBuffer = new ByteBuffer(buf);
            buffer2.version = buffer.version;
            buffer = buffer2;
        }

        var ver2: boolean = buffer.version >= 2;
        var indexTablePos: number = buffer.pos;
        var cnt: number;
        var i: number;
        var j: number;
        var nextPos: number;
        var str: string;
        var branchIncluded: boolean;

        buffer.seek(indexTablePos, 4);

        cnt = buffer.readInt32();
        var stringTable: string[] = [];
        for (i = 0; i < cnt; i++)
            stringTable[i] = buffer.readUTFString();
        buffer.stringTable = stringTable;

        if (buffer.seek(indexTablePos, 5)) {
            cnt = buffer.readInt32();
            for (let i = 0; i < cnt; i++) {
                let index = buffer.readUint16();
                let len = buffer.readInt32();
                stringTable[index] = buffer.readCustomString(len);
            }
        }

        buffer.seek(indexTablePos, 0);
        cnt = buffer.readInt16();
        for (i = 0; i < cnt; i++)
            this._dependencies.push({ id: buffer.readS(), name: buffer.readS() });

        if (ver2) {
            cnt = buffer.readInt16();
            if (cnt > 0) {
                this._branches = buffer.readSArray(cnt);
                if (UIPackage._branch)
                    this._branchIndex = this._branches.indexOf(UIPackage._branch);
            }

            branchIncluded = cnt > 0;
        }

        buffer.seek(indexTablePos, 1);

        var pi: PackageItem;
        var path: string = this._resKey;
        let pos = path.lastIndexOf('/');
        let shortPath = pos == -1 ? "" : path.substring(0, pos + 1);
        path = path + "_";

        cnt = buffer.readUint16();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readInt32();
            nextPos += buffer.pos;

            pi = new PackageItem();
            pi.owner = this;
            pi.type = buffer.readByte();
            pi.id = buffer.readS();
            pi.name = buffer.readS();
            buffer.readS(); //path
            str = buffer.readS();
            if (str)
                pi.file = str;
            buffer.readBool();//exported
            pi.width = buffer.readInt32();
            pi.height = buffer.readInt32();

            switch (pi.type) {
                case PackageItemType.Image:
                    {
                        pi.objectType = ObjectType.Image;
                        var scaleOption: number = buffer.readByte();
                        if (scaleOption == 1) {
                            pi.scale9Grid = new Rectangle();
                            pi.scale9Grid.x = buffer.readInt32();
                            pi.scale9Grid.y = buffer.readInt32();
                            pi.scale9Grid.width = buffer.readInt32();
                            pi.scale9Grid.height = buffer.readInt32();

                            pi.tileGridIndice = buffer.readInt32();
                        }
                        else if (scaleOption == 2)
                            pi.scaleByTile = true;

                        pi.smoothing = buffer.readBool();
                        break;
                    }

                case PackageItemType.MovieClip:
                    {
                        pi.smoothing = buffer.readBool();
                        pi.objectType = ObjectType.MovieClip;
                        pi.rawData = buffer.readBuffer();
                        break;
                    }

                case PackageItemType.Font:
                    {
                        pi.rawData = buffer.readBuffer();
                        break;
                    }

                case PackageItemType.Component:
                    {
                        var extension: number = buffer.readByte();
                        if (extension > 0)
                            pi.objectType = extension;
                        else
                            pi.objectType = ObjectType.Component;
                        pi.rawData = buffer.readBuffer();

                        UIObjectFactory.resolvePackageItemExtension(pi);
                        break;
                    }

                case PackageItemType.Atlas:
                case PackageItemType.Sound:
                case PackageItemType.Misc:
                    {
                        pi.file = path + pi.file;
                        break;
                    }

                case PackageItemType.Spine:
                case PackageItemType.DragonBones:
                    {
                        pi.file = shortPath + pi.file;
                        pi.skeletonAnchor = new Point();
                        pi.skeletonAnchor.x = buffer.readFloat32();
                        pi.skeletonAnchor.y = buffer.readFloat32();
                        break;
                    }
            }

            if (ver2) {
                str = buffer.readS();//branch
                if (str)
                    pi.name = str + "/" + pi.name;

                var branchCnt: number = buffer.readUint8();
                if (branchCnt > 0) {
                    if (branchIncluded)
                        pi.branches = buffer.readSArray(branchCnt);
                    else
                        this._itemsById[buffer.readS()] = pi;
                }

                var highResCnt: number = buffer.readUint8();
                if (highResCnt > 0)
                    pi.highResolution = buffer.readSArray(highResCnt);
            }

            this._items.push(pi);
            this._itemsById[pi.id] = pi;
            if (pi.name != null)
                this._itemsByName[pi.name] = pi;

            buffer.pos = nextPos;
        }

        buffer.seek(indexTablePos, 2);

        cnt = buffer.readUint16();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readUint16();
            nextPos += buffer.pos;

            var itemId: string = buffer.readS();
            pi = this._itemsById[buffer.readS()];

            let sprite: AtlasSprite = { atlas: pi, rect: new Rectangle(), offset: new Point(), originalSize: new Point() };
            sprite.atlas = pi;
            sprite.rect.x = buffer.readInt32();
            sprite.rect.y = buffer.readInt32();
            sprite.rect.width = buffer.readInt32();
            sprite.rect.height = buffer.readInt32();
            sprite.rotated = buffer.readBool();
            if (ver2 && buffer.readBool()) {
                sprite.offset.x = buffer.readInt32();
                sprite.offset.y = buffer.readInt32();
                sprite.originalSize.x = buffer.readInt32();
                sprite.originalSize.y = buffer.readInt32();
            }
            else {
                sprite.originalSize.x = sprite.rect.width;
                sprite.originalSize.y = sprite.rect.height;
            }
            this._sprites[itemId] = sprite;

            buffer.pos = nextPos;
        }

        if (buffer.seek(indexTablePos, 3)) {
            cnt = buffer.readUint16();
            for (i = 0; i < cnt; i++) {
                nextPos = buffer.readInt32();
                nextPos += buffer.pos;

                pi = this._itemsById[buffer.readS()];
                if (pi && pi.type == PackageItemType.Image) {
                    pi.pixelHitTestData = new PixelHitTestData();
                    pi.pixelHitTestData.load(buffer);
                }

                buffer.pos = nextPos;
            }
        }
    }

    public loadAllAssets(): void {
        var cnt: number = this._items.length;
        for (var i: number = 0; i < cnt; i++) {
            var pi: PackageItem = this._items[i];
            this.getItemAsset(pi);
        }
    }

    public unloadAssets(): void {
        var cnt: number = this._items.length;
        for (var i: number = 0; i < cnt; i++) {
            var pi: PackageItem = this._items[i];
            if (pi.type == PackageItemType.Atlas) {
                if (pi.texture)
                    //TODO:test
                    AssetProxy.inst.clearTextureRes(pi.file)
            }
        }
    }

    public dispose(): void {
        var cnt: number = this._items.length;
        for (var i: number = 0; i < cnt; i++) {
            var pi: PackageItem = this._items[i];
            if (pi.type == PackageItemType.Atlas) {
                if (pi.texture) {
                    pi.texture.destroy();
                    pi.texture = null;
                }
            }
            else if (pi.type == PackageItemType.Sound) {//TODO:support destroy sound
                
            }
            else if (pi.templet)
                pi.templet.destroy();
        }
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get items(): PackageItem[] {
        return this._items;
    }

    public get customId(): string {
        return this._customId;
    }

    public set customId(value: string) {
        if (this._customId)
            delete UIPackage._instById[this._customId];
        this._customId = value;
        if (this._customId)
            UIPackage._instById[this._customId] = this;
    }

    public createObject(resName: string, userClass?: new () => GObject): GObject {
        var pi: PackageItem = this._itemsByName[resName];
        if (pi)
            return this.internalCreateObject(pi, userClass);
        else
            return null;
    }

    public internalCreateObject(item: PackageItem, userClass?: new () => GObject): GObject {
        var g: GObject = UIObjectFactory.newObject(item, userClass);

        if (g == null)
            return null;

        UIPackage._constructing++;
        g.constructFromResource();
        UIPackage._constructing--;
        return g;
    }

    public getItems(): ReadonlyArray<PackageItem> {
        return this._items;
    }

    public getItemById(itemId: string): PackageItem {
        return this._itemsById[itemId];
    }

    public getItemByName(resName: string): PackageItem {
        return this._itemsByName[resName];
    }

    public getItemAssetByName(resName: string): any {
        var pi: PackageItem = this._itemsByName[resName];
        if (pi == null) {
            throw "Resource not found -" + resName;
        }

        return this.getItemAsset(pi);
    }

    public getItemAsset(item: PackageItem): any {
        switch (item.type) {
            case PackageItemType.Image:
                if (!item.decoded) {
                    item.decoded = true;
                    var sprite: AtlasSprite = this._sprites[item.id];
                    if (sprite) {
                        var atlasTexture: Texture = <Texture>(this.getItemAsset(sprite.atlas));
                        if (atlasTexture) {
                            item.texture = Texture.create(atlasTexture,
                                sprite.rect.x, sprite.rect.y, sprite.rect.width, sprite.rect.height,
                                sprite.offset.x, sprite.offset.y,
                                sprite.originalSize.x, sprite.originalSize.y);
                        } else {
                            item.texture = null;
                        }
                    }
                    else
                        item.texture = null;
                }
                return item.texture;

            case PackageItemType.Atlas:
                if (!item.decoded) {
                    item.decoded = true;
                    item.texture = AssetProxy.inst.getItemRes(item);
                    //if(!fgui.UIConfig.textureLinearSampling)
                    //item.texture.isLinearSampling = false;
                }
                return item.texture;

            case PackageItemType.Font:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadFont(item);
                }
                return item.bitmapFont;

            case PackageItemType.MovieClip:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadMovieClip(item);
                }
                return item.frames;

            case PackageItemType.Component:
                return item.rawData;

            case PackageItemType.Misc:
                if (item.file)
                    return AssetProxy.inst.getItemRes(item);
                else
                    return null;

            default:
                return null;
        }
    }

    public getItemAssetAsync(item: PackageItem, onComplete?: (err: any, item: PackageItem) => void): void {
        if (item.decoded) {
            onComplete(null, item);
            return;
        }

        if (item.loading) {
            item.loading.push(onComplete);
            return;
        }

        switch (item.type) {
            case PackageItemType.Spine:
            case PackageItemType.DragonBones:
                item.loading = [onComplete];
                let url: string;
                if (UIConfig.useLayaSkeleton) {
                    let pos = item.file.lastIndexOf('.');
                    url = item.file.substring(0, pos + 1).replace("_ske", "") + "sk";
                }
                else
                    url = item.file;
                AssetProxy.inst.load(url).then(templet => {
                    let arr = item.loading;
                    delete item.loading;
                    item.templet = templet;
                    arr.forEach(e => e(item ? null : "load error", item));
                });
                break;

            default:
                this.getItemAsset(item);
                onComplete(null, item);
                break;
        }
    }

    private loadMovieClip(item: PackageItem): void {
        var buffer: ByteBuffer = item.rawData;

        buffer.seek(0, 0);

        item.interval = buffer.readInt32();
        item.swing = buffer.readBool();
        item.repeatDelay = buffer.readInt32();

        buffer.seek(0, 1);

        var frameCount: number = buffer.readInt16();
        item.frames = [];

        var spriteId: string;
        var sprite: AtlasSprite;
        var fx: number;
        var fy: number;

        for (var i: number = 0; i < frameCount; i++) {
            var nextPos: number = buffer.readInt16();
            nextPos += buffer.pos;

            fx = buffer.readInt32();
            fy = buffer.readInt32();
            buffer.readInt32(); //width
            buffer.readInt32(); //height
            let frame: Frame = { addDelay: buffer.readInt32() };
            spriteId = buffer.readS();

            if (spriteId != null && (sprite = this._sprites[spriteId]) != null) {
                var atlasTexture: Texture = <Texture>(this.getItemAsset(sprite.atlas));
                frame.texture = Texture.create(atlasTexture,
                    sprite.rect.x, sprite.rect.y, sprite.rect.width, sprite.rect.height,
                    fx, fy, item.width, item.height);
            }
            item.frames[i] = frame;

            buffer.pos = nextPos;
        }
    }


    //TODO:待完善
    private loadFont(item: PackageItem): void {
        item = item.getBranch();
        //let font = new BitmapFont(null);
        //item.bitmapFont = font;
        

        let buffer = item.rawData;

        buffer.seek(0, 0);

        let ttf = buffer.readBool();
        let tint = buffer.readBool();
        let autoScaleSize = buffer.readBool();
        buffer.readBool(); //has channel
        let fontSize = Math.max(buffer.readInt32(), 1);
        let xadvance = buffer.readInt32();
        let lineHeight = buffer.readInt32();
        //lineHeight = Math.max(lineHeight, font.fontSize);

        let mainTexture: Texture = null;
        let mainSprite = this._sprites[item.id];
        if (mainSprite)
            mainTexture = <Texture>(this.getItemAsset(mainSprite.atlas));

        buffer.seek(0, 1);

        let dict:{[key: number]:BMGlyph} = {};//font.dict;
        var cnt: number = buffer.readInt32();
        for (let i = 0; i < cnt; i++) {
            let nextPos = buffer.readInt16();
            nextPos += buffer.pos;

            let ch = buffer.readUint16();
            let bg: BMGlyph = new BMGlyph();
            dict[ch] = bg;

            let img: string = buffer.readS();
            let bx: number = buffer.readInt32();
            let by: number = buffer.readInt32();
            bg.x = buffer.readInt32();
            bg.y = buffer.readInt32();
            bg.width = buffer.readInt32();
            bg.height = buffer.readInt32();
            bg.advance = buffer.readInt32();
            buffer.readByte(); //channel

            if (ttf) {
                bg.texture = Texture.create(mainTexture,
                    bx + mainSprite.rect.x, by + mainSprite.rect.y, bg.width, bg.height);
            }
            else {
                let charImg = this._itemsById[img];
                if (charImg) {
                    charImg = charImg.getBranch();
                    bg.width = charImg.width;
                    bg.height = charImg.height;
                    charImg = charImg.getHighResolution();
                    this.getItemAsset(charImg);
                    bg.texture = charImg.texture;
                }

                if (bg.advance == 0) {
                    if (xadvance == 0)
                        bg.advance = bg.x + bg.width;
                    else
                        bg.advance = xadvance;
                }
            }

            buffer.pos = nextPos;
        }
    }
}

interface AtlasSprite {
    atlas: PackageItem;
    rect: Rectangle;
    offset: Point;
    originalSize: Point;
    rotated?: boolean;
}
