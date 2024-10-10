namespace fgui {

    interface FillMaskOption {
        fillMethod?: number;
        fillAmount?: number;
        fillOrigin?: number;
        fillClockwise?: boolean;
    }

    interface FillTextureOption {
        texture?: PIXI.Texture;
        scale9Grid?: PIXI.Rectangle;
        scaleByTile?: boolean;
        tileGridIndice?: number;
        color?: string;
    }

    export class Image extends PIXI.Container {
        protected _source: PIXI.Texture;
        protected _scaleByTile?: boolean;
        protected _scale9Grid?: PIXI.Rectangle;
        //画九宫格的时候是否重复填充（0：不重复填充，1：重复填充）。
        private _tileGridIndice: number = 0;
        private _color: string;

        private _fillMethod: number = 0;
        private _fillOrigin: number = 0;
        private _fillAmount: number = 0;
        private _fillClockwise?: boolean;

        private _width:number = 0;
        private _height:number = 0;

        private _view: PIXI.Sprite | PIXI.TilingSprite | PIXI.NineSliceSprite | PIXI.Graphics;

        constructor() {
            super();

            this.eventMode = "none";
            this._color = "#FFFFFF";
        }

        set width(value:number){
            this._width = value;
        }

        set height(value:number){
            this._height = value;
        }

        public get color(): string {
            return this._color;
        }

        public set color(value: string) {
            if (this._color != value) {
                this._color = value;
                this.fillImage();
            }
        }

        public get fillMethod(): number {
            return this._fillMethod;
        }

        public get fillAmount(): number {
            return this._fillAmount;
        }

        public set fillAmount(value: number) {
            if (this._fillAmount != value) {
                this._fillAmount = value;
                this.fillMask();
            }
        }

        public get texture(): PIXI.Texture {
            return this._source;
        }

        public set texture(value: PIXI.Texture) {
            if (this._source != value) {
                this._source = value;
                if (this._source){
                    if(this._width == 0 || this._height == 0){
                        this._width = this._source.width;
                        this._height = this._source.height;
                    }
                }

                this.fillImage();
            }
        }

        public set imgOption(options: FillTextureOption) {
            let oldScale9Grid = this._scale9Grid;
            let oldScaleByTile = this._scaleByTile;
            if ("scale9Grid" in options) this._scale9Grid = options.scale9Grid
            if ("scaleByTile" in options) this._scaleByTile = options.scaleByTile
            if ("tileGridIndice" in options) this._tileGridIndice = options.tileGridIndice
            if ("color" in options) this._color = options.color;
            if ("texture" in options) {
                this._source = options.texture;
                if (this._source){
                    if(this._width == 0 || this._height == 0){
                        this._width = this._source.width;
                        this._height = this._source.height;
                    }
                }
            }

            let reNew = oldScaleByTile != this._scaleByTile || (oldScale9Grid == null && this._scale9Grid != null)
                || (oldScale9Grid != null && this._scale9Grid == null);

            this.fillImage(reNew);
        }

        public set maskOption(options: FillMaskOption) {
            if ("fillAmount" in options) this._fillAmount = options.fillAmount;
            if ("fillClockwise" in options) this._fillClockwise = options.fillClockwise;
            if ("fillOrigin" in options) this._fillOrigin = options.fillOrigin;
            if ("fillMethod" in options) this._fillMethod = options.fillMethod;


            if (this._fillMethod != 0) {
                this.fillMask();
            }
            else if (this.mask) {
                this.mask = null;
                if (this._view && this._view instanceof PIXI.Graphics)
                    this._view.clear();
            }
        }

        private fillMask(): void {
            if (!this._view) {
                this._view = new PIXI.Graphics();
                this._view.eventMode = "none";
            }
            let graphic = <PIXI.Graphics>this._view;
            this.mask = graphic as any;
            var w: number = this.width;
            var h: number = this.height;

            graphic.clear();

            if (w == 0 || h == 0)
                return;

            var points: any[] = fillImage(w, h, this._fillMethod, this._fillOrigin, this._fillClockwise, this._fillAmount);
            if (points == null) {
                return;
            }

            graphic.poly(points).fill("#FFFFFF");
        }


        //TODO:某个属性改变导致重复创建对象的问题；显示类型发生变化的问题
        private fillImage(reNew: boolean = false): void {
            var w: number = this._width;
            var h: number = this._height;
            var tex: PIXI.Texture = this._source;

            if (this._view) this._view.removeFromParent();

            if (tex == null || w == 0 || h == 0) {
                return;
            }

            if (this._scaleByTile) {
                if (this._view == null || reNew) {
                    this._view = new PIXI.TilingSprite({ texture: tex, width: w, height: h, tilePosition: { x: 0, y: 0 } });
                }
                else { //just update
                    this._view.texture = tex;
                    this._view.setSize(w, h);
                }
            }
            else if (this._scale9Grid) {
                var tw: number = tex.width;
                var th: number = tex.height;
                var left: number = this._scale9Grid.x;
                var right: number = Math.max(tw - this._scale9Grid.right, 0);
                var top: number = this._scale9Grid.y;
                var bottom: number = Math.max(th - this._scale9Grid.bottom, 0);
                //TODO：尚未支持重复填充，需要根据tileGridIndice来决定是否填充
                let opt: PIXI.NineSliceSpriteOptions = {
                    leftWidth: left, rightWidth: right, topHeight: top, bottomHeight: bottom,
                    texture: tex, tint: this._color, x: 0, y: 0, width: w, height: h
                };
                if (this._view == null || reNew) {
                    this._view = new PIXI.NineSliceSprite(opt)
                } else {
                    let view = <PIXI.NineSliceSprite>this._view;
                    view.texture = tex;
                    view.leftWidth = left;
                    view.rightWidth = right;
                    view.topHeight = top;
                    view.bottomHeight = bottom;
                    view.tint = this._color;
                    view.setSize(w, h);
                }
            }
            else {
                if (this._view == null || reNew) {
                    this._view = new PIXI.Sprite({ texture: tex, x: 0, y: 0, width: w, height: h, tint: this._color });
                } else {
                    this._view.tint = this._color;
                    this._view.texture = tex;
                    this._view.setSize(w, h);
                }
            }
            this.addChild(this._view);
        }
    }
}