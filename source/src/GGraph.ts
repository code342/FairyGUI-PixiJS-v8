namespace fgui {

    export enum GGGraphType {
        Empty = 0,
        Rect = 1,
        Ellipse = 2,
        Polygon = 3,
        RegularPolygon = 4,
    }

    export class GGraph extends GObject {
        private _type: number;
        private _lineSize: number;
        private _lineColor: PIXI.Color;
        private _fillColor: PIXI.Color;
        private _cornerRadius?: number[];
        private _sides?: number;
        private _startAngle?: number;
        private _polygonPoints?: number[];
        private _distances?: number[];

        public graphics: PIXI.Graphics;
        constructor() {
            super();

            this._type = GGGraphType.Empty;
            this._lineSize = 1;
            this._lineColor = new PIXI.Color("#000000");
            this._fillColor = new PIXI.Color("#FFFFFF");
        }

        get type(): GGGraphType { return this._type; }
        get polygonPoints(): number[] { return this._polygonPoints; }


        public get fillColor(): string { return this._fillColor.value as string; }
        public set fillColor(v: string) {
            if (v === this._fillColor.value) return;
            this._fillColor.value = v;
            this.updateGraph();
        }


        public get lineColor(): string {
            return this._lineColor.value as string;
        }

        public set lineColor(v: string) {
            if (v === this._fillColor.value) return;
            this._lineColor.value = v;
            this.updateGraph();
        }

        public drawRect(lineSize: number, lineColor: string, fillColor: string, cornerRadius?: number[]): void {
            this._type = GGGraphType.Rect;
            this._lineSize = lineSize;
            this._lineColor.value = lineColor || "#000000";
            this._fillColor.value = fillColor || "#FFFFFF";
            this._cornerRadius = cornerRadius;
            this.updateGraph();
        }

        public drawEllipse(lineSize: number, lineColor: string, fillColor: string): void {
            this._type = GGGraphType.Ellipse;
            this._lineSize = lineSize;
            this._lineColor.value = lineColor;
            this._fillColor.value = fillColor;
            this.updateGraph();
        }

        public drawRegularPolygon(lineSize: number, lineColor: string, fillColor: string, sides: number, startAngle?: number, distances?: number[]): void {
            this._type = GGGraphType.RegularPolygon;
            this._lineSize = lineSize;
            this._lineColor.value = lineColor;
            this._fillColor.value = fillColor;
            this._sides = sides;
            this._startAngle = startAngle || 0;
            this._distances = distances;
            this.updateGraph();
        }

        public drawPolygon(lineSize: number, lineColor: string, fillColor: string, points: number[]): void {
            this._type = GGGraphType.Polygon;
            this._lineSize = lineSize;
            this._lineColor.value = lineColor;
            this._fillColor.value = fillColor;
            this._polygonPoints = points;
            this.updateGraph();
        }

        public get distances(): number[] {
            return this._distances;
        }

        public set distances(value: number[]) {
            this._distances = value;
            if (this._type == 3)
                this.updateGraph();
        }

        public get color(): string {
            return this._fillColor.value as string;
        }

        public set color(value: string) {
            this._fillColor.value = value;
            this.updateGear(4);
            if (this._type != 0)
                this.updateGraph();
        }

        private updateGraph(): void {
            console.log("updateGraph",this.name);
            this._displayObject.eventMode = this.touchable ? "static" : "none";
            var gr: PIXI.Graphics = this.graphics;
            gr.clear();

            var w: number = this.width;
            var h: number = this.height;
            if (w == 0 || h == 0)
                return;

            if (this._type == 1) {
                if (this._cornerRadius) {
                    gr.moveTo(this._cornerRadius[0], 0)
                        .lineTo(w - this._cornerRadius[1], 0)
                        .arcTo(w, 0, w, this._cornerRadius[1], this._cornerRadius[1])
                        .lineTo(w, h - this._cornerRadius[3])
                        .arcTo(w, h, w - this._cornerRadius[3], h, this._cornerRadius[3])
                        .lineTo(this._cornerRadius[2], h)
                        .arcTo(0, h, 0, h - this._cornerRadius[2], this._cornerRadius[2])
                        .lineTo(0, this._cornerRadius[0])
                        .arcTo(0, 0, this._cornerRadius[0], 0, this._cornerRadius[0])
                        .closePath();
                }
                else {
                    gr.rect(0, 0, w, h);
                }
            } else if (this._type == 2) {
                let hw = w / 2, hh = h / 2;
                if (w == h) gr.circle(hw, hw, hw);
                else gr.ellipse(hw, hh, hw, hh);
            }
            else if (this._type == 3) {
                gr.poly(this._polygonPoints);
            }
            else if (this._type == 4) {
                let radius: number = Math.min(this._width, this._height) / 2;
                let angle = PIXI.DEG_TO_RAD * this._startAngle;
                //let isRegular = false;//this._distances == null || this._distances.every(value => value === this._distances[0]);

                ///if (isRegular) { //正多边形，所有边一样长，角度一样大
                //    gr.regularPoly(w/2, h/2, radius, this._sides, angle);
                //} else {
                    if (!this._polygonPoints)
                        this._polygonPoints = [];
                    this._polygonPoints.length = 0;
                    var deltaAngle: number = 2 * Math.PI / this._sides;
                    let dist: number = 0;
                    for (var i: number = 0; i < this._sides; i++) {
                        if (this._distances) {
                            dist = this._distances[i];
                            if (isNaN(dist))
                                dist = 1;
                        }
                        else
                            dist = 1;

                        var xv: number = radius + radius * dist * Math.cos(angle);
                        var yv: number = radius + radius * dist * Math.sin(angle);
                        this._polygonPoints.push(xv, yv);

                        angle += deltaAngle;
                    }
                    gr.poly(this._polygonPoints);
                //}
            }
            if (this._fillColor.alpha > 0)
                gr.fill(this._fillColor);
            if (this._lineSize > 0)
                gr.stroke({ width: this._lineSize, color: this._lineColor });
        }

        public replaceMe(target: GObject): void {
            if (!this._parent)
                throw "parent not set";

            target.name = this.name;
            target.alpha = this.alpha;
            target.rotation = this.rotation;
            target.visible = this.visible;
            target.touchable = this.touchable;
            target.grayed = this.grayed;
            target.setXY(this.x, this.y);
            target.setSize(this.width, this.height);

            var index: number = this._parent.getChildIndex(this);
            this._parent.addChildAt(target, index);
            target.relations.copyFrom(this.relations);

            this._parent.removeChild(this, true);
        }

        public addBeforeMe(target: GObject): void {
            if (!this._parent)
                throw "parent not set";

            var index: number = this._parent.getChildIndex(this);
            this._parent.addChildAt(target, index);
        }

        public addAfterMe(target: GObject): void {
            if (!this._parent)
                throw "parent not set";

            var index: number = this._parent.getChildIndex(this);
            index++;
            this._parent.addChildAt(target, index);
        }

        public setNativeObject(obj: PIXI.Container): void {
            this._type = 0;
            this._displayObject.eventMode = this.touchable ? "static" : "none";
            this.graphics.clear();
            this._displayObject.removeChildren();
            this._displayObject.addChild(obj);
        }

        protected createDisplayObject(): void {
            this._displayObject = this.graphics = new PIXI.Graphics(); //在pixijs里Graphics就是独立的displayobject
            (this._displayObject as any).$owner = this;
            this._displayObject.eventMode = 'none';
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

        protected handleSizeChanged(): void {
            super.handleSizeChanged();

            if (this._type != 0)
                this.updateGraph();
        }

        public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
            super.setup_beforeAdd(buffer, beginPos);

            buffer.seek(beginPos, 5);

            this._type = buffer.readByte();
            if (this._type != 0) {
                var i: number;
                var cnt: number;

                this._lineSize = buffer.readInt32();
                this._lineColor.value = buffer.readColorS(true);
                this._fillColor.value = buffer.readColorS(true);
                if (buffer.readBool()) {
                    this._cornerRadius = [];
                    for (i = 0; i < 4; i++)
                        this._cornerRadius[i] = buffer.readFloat32();
                }

                if (this._type == 3) {
                    cnt = buffer.readInt16();
                    this._polygonPoints = [];
                    this._polygonPoints.length = cnt;
                    for (i = 0; i < cnt; i++)
                        this._polygonPoints[i] = buffer.readFloat32();
                }
                else if (this._type == 4) {
                    this._sides = buffer.readInt16();
                    this._startAngle = buffer.readFloat32();
                    cnt = buffer.readInt16();
                    if (cnt > 0) {
                        this._distances = [];
                        for (i = 0; i < cnt; i++)
                            this._distances[i] = buffer.readFloat32();
                    }
                }

                this.updateGraph();
            }
        }
    }
}