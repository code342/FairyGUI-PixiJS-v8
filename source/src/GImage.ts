namespace fgui {
    export class GImage extends GObject {
        private _image: Image;
        private _flip: number = 0;
        private _contentItem: PackageItem;

        constructor() {
            super();
        }

        public get image(): Image {
            return this._image;
        }

        public get color(): string {
            return this._image.color;
        }

        public set color(value: string) {
            if (this._image.color != value) {
                this._image.color = value;
                this.updateGear(4);
            }
        }

        public get flip(): number {
            return this._flip;
        }

        //TODO:如果是ScaleByTile，则需要在Image的TilingSprite做flip
        public set flip(value: number) {
            if (this._flip != value) {
                this._flip = value;
                let scale = this.getScaleByFlip(value);
                this.setScale(scale.x, scale.y);
                this.handleXYChanged();
            }
        }

        private getScaleByFlip(flip:number): { x: number, y: number } {
            var sx: number = 1, sy: number = 1;
            if (flip == FlipType.Horizontal || flip == FlipType.Both) sx = -1;
            if (flip == FlipType.Vertical || flip == FlipType.Both) sy = -1;
            return { x: sx, y: sy };
        }

        protected override handleScaleChanged(): void {
            if(this.image.scaleByTile) return;
            super.handleScaleChanged();
        }

        public get fillMethod(): number {
            return this._image.fillMethod;
        }

        public get fillAmount(): number {
            return this._image.fillAmount;
        }

        public set fillAmount(value: number) {
            this._image.fillAmount = value;
        }

        protected createDisplayObject(): void {
            this._displayObject = this._image = new Image();
            this._image.eventMode = 'none';
            (this._displayObject as any).$owner = this;
        }

        public constructFromResource(): void {
            console.log("GImage constructFromResource", this.name);
            this._contentItem = this.packageItem.getBranch();

            this.sourceWidth = this._contentItem.width;
            this.sourceHeight = this._contentItem.height;
            this.initWidth = this.sourceWidth;
            this.initHeight = this.sourceHeight;

            this._contentItem = this._contentItem.getHighResolution();
            this._contentItem.load();


            this.setSize(this.sourceWidth, this.sourceHeight);
        }

        protected handleXYChanged(): void {
            super.handleXYChanged();

            if(!this._image.scaleByTile){
                if (this._flip != FlipType.None) {
                    if (this.scaleX == -1)
                    this._image.x += this.width;
                if (this.scaleY == -1)
                    this._image.y += this.height;
                }
            }
        }

        public getProp(index: number): any {
            if (index == ObjectPropID.Color)
                return this.color;
            else
                return super.getProp(index);
        }

        public setProp(index: number, value: any): void {
            if (index == ObjectPropID.Color)
                this.color = value;
            else
                super.setProp(index, value);
        }

        public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
            console.log("GImage setup_beforeAdd", this.name);
            super.setup_beforeAdd(buffer, beginPos);

            buffer.seek(beginPos, 5);

            if (buffer.readBool())
                this.color = buffer.readColorS();
            let flip = buffer.readByte();
            let fillMethod = buffer.readByte();
            if (fillMethod != 0) {
                let fillOrigin = buffer.readByte();
                let fillClockwise = buffer.readBool();
                let fillAmount = buffer.readFloat32();
                this._image.maskOption = { fillMethod: fillMethod, fillOrigin: fillOrigin, fillClockwise: fillClockwise, fillAmount: fillAmount }
            }else{
                let scaleByTile = this._contentItem.scaleByTile;
                let tileScale = this.getScaleByFlip(flip);
                this._image.imgOption = {
                    scale9Grid: this._contentItem.scale9Grid,
                    scaleByTile: scaleByTile,
                    tileGridIndice: this._contentItem.tileGridIndice,
                    texture: this._contentItem.texture,
                    tileScale: tileScale
                }
            }
            this.flip = flip;
        }
    }
}