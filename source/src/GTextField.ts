namespace fgui {
    export class GTextField extends GObject {
        protected _text: string;
        protected _autoSize: number;
        protected _widthAutoSize: boolean;
        protected _heightAutoSize: boolean;
        protected _color: string;
        protected _singleLine: boolean;
        protected _letterSpacing: number = 0;
        private _ubbEnabled: boolean;
        private _strokeWidth: number;
        private _strokeColor: string;
        declare _displayObject: TextField;
        constructor() {
            super();

            this._text = "";
            this._color = "#000000";
        }

        protected createDisplayObject(): void {
            this._displayObject = new TextField();
            (this._displayObject as any).$owner = this;
            this._displayObject.style.padding = labelPadding[0];
            this._displayObject.eventMode = "none";
            this._autoSize = AutoSizeType.Both;
            this._widthAutoSize = this._heightAutoSize = true;
            //(<Text>this._displayObject)._onPostLayout = () => this.updateSize();
        }

        public get displayObject(): TextField {
            return this._displayObject;
        }

        public set text(value: string) {

            this._displayObject.text = value;
            //this._displayObject.updateTextAlign();
        }

        public get text(): string {
            return this._displayObject.text;
        }

        public get font(): string | string[] {
            return this._displayObject.style.fontFamily;
        }

        public set font(value: string) {
            if(value == null){
                value = "Arial";
                console.warn("font can't be null");
            }
            if (ToolSet.startsWith(value, "ui://"))
                UIPackage.getItemAssetByURL(value);
            this._displayObject.style.fontFamily = value;
        }

        public get fontSize(): number {
            return this._displayObject.style.fontSize;
        }

        public set fontSize(value: number) {
            this._displayObject.style.fontSize = value;
        }

        public get color(): string {
            return this._color;
        }

        public set color(value: string) {
            if (this._color != value) {
                this._color = value;
                this.updateGear(4);

                if (this.grayed)
                    this._displayObject.style.fill = "#AAAAAA";
                else
                    this._displayObject.style.fill = this._color;
            }
        }

        public get align(): string {
            return this._displayObject.align;
        }

        public set align(value: PIXI.TextStyleAlign) {
            this._displayObject.align = value;
        }

        public get valign(): string {
            return this._displayObject.valign;
        }

        public set valign(value: string) {
            this._displayObject.valign = value;
        }

        public get leading(): number {
            return this._displayObject.style.leading;
        }

        public set leading(value: number) {
            this._displayObject.style.leading = value;
        }

        public get letterSpacing(): number {
            return this._displayObject.style.letterSpacing;
        }

        public set letterSpacing(value: number) {
            this._displayObject.style.letterSpacing = value;
        }

        public get bold(): boolean {
            return this._displayObject.style.fontWeight == "bold";
        }

        public set bold(value: boolean) {
            if (value)
                this._displayObject.style.fontWeight = "bold";
            else if (this._displayObject.style.fontWeight == "bold") {
                this._displayObject.style.fontWeight = "normal";
            }
        }

        public get italic(): boolean {
            return this._displayObject.style.fontStyle == "italic";
        }

        public set italic(value: boolean) {
            if (value)
                this._displayObject.style.fontStyle = "italic";
            else if (this._displayObject.style.fontStyle == "italic")
                this._displayObject.style.fontStyle = "normal";
        }

        public get underline(): boolean {
            return false;
        }

        public set underline(value: boolean) {
            console.log('dont support underline!!!');
        }

        public get singleLine(): boolean {
            return this._singleLine;
        }

        public set singleLine(value: boolean) {
            this._singleLine = value;
            this._displayObject.style.wordWrap 
            let multiline = !this._widthAutoSize && !this._singleLine;
            this._displayObject.style.breakWords = multiline;
            this._displayObject.style.wordWrap = multiline;
            this._displayObject.style.wordWrapWidth = this.width;
        }


        private setStroke() {
            this._displayObject.style.stroke = {
                width: this._strokeWidth,
                color: this._strokeColor
            }
        }

        public set strokeColor(value: string) {
            if (this._strokeColor != value) {
                this._strokeColor = value;
                this.setStroke();
                this.updateGear(4);
            }
        }

        public set ubbEnabled(value: boolean) {
            this._ubbEnabled = value;
        }

        public get ubbEnabled(): boolean {
            return this._ubbEnabled;
        }

        public get autoSize(): number {
            return this._autoSize;
        }

        public set autoSize(value: number) {
            if (this._autoSize != value) {
                this._autoSize = value;
                this._widthAutoSize = this._autoSize == AutoSizeType.Both;
                this._heightAutoSize = this._autoSize == AutoSizeType.Both || this._autoSize == AutoSizeType.Height;

                this.updateAutoSize();
            }
        }

        protected updateAutoSize(): void {
            this._displayObject.style.wordWrap = !this._widthAutoSize && !this._singleLine;
            //this._displayObject.style.overflow = this._autoSize == AutoSizeType.Shrink ? "shrink" : (this._autoSize == AutoSizeType.Ellipsis ? "ellipsis" : "visible");
            if (!this._underConstruct) {
                /*if (!this._heightAutoSize)
                    this._displayObject.setSize(this.width, this.height);
                else if (!this._widthAutoSize)
                    this._displayObject.width = this.width;*/
            }
        }

        public get textWidth(): number {
            return this._displayObject.width;
        }

        /*public get templateVars(): Record<string, any> {
            return this._displayObject.templateVars;
        }
    
        public set templateVars(value: Record<string, any>) {
            this._displayObject.templateVars = value;
        }
    
        public setVar(name: string, value: any): GTextField {
            this._displayObject.setVar(name, value);
    
            return this;
        }
    
        public flushVars(): void {
            //nothing here. auto flush
        }*/

        public ensureSizeCorrect(): void {
            /* if (!this._underConstruct)
                 this._displayObject.typeset();*/
        }

        /* private updateSize(): void {
             if (this._widthAutoSize)
                 this.setSize(this._displayObject.width, this._displayObject.height);
             else if (this._heightAutoSize)
                 this.height = this._displayObject.height;
         }*/

        //pixi中设置Text的宽高会导致文本被缩放
        protected handleSizeChanged(): void {
            console.log("GTextField handleSizeChanged", this._width, this._height);
           // this._displayObject.updateTextAlign();
            this._displayObject.setSize(this._width, this._height);
        }

        /*private updateTextAlign(): void {
            if (!this._displayObject) return;

            const align = this.align;
            const valign = this.valign; 
            const textWidth = this._displayObject.width;
            const textHeight = this._displayObject.height;

            // Horizontal alignment
            switch (align) {
                case 'left':
                    this.x = 0;
                    break;
                case 'center':
                    this.x = (this._width - textWidth) / 2;
                    break;
                case 'right':
                    this.x = this._width - textWidth;
                    break;
            }

            // Vertical alignment
            switch (valign) {
                case 'top':
                    this.y = 0;
                    break;
                case 'middle':
                    this.y = (this._height - textHeight) / 2;
                    break;
                case 'bottom':
                    this.y = this._height - textHeight;
                    break;
            }
        }*/

        protected handleGrayedChanged(): void {
            super.handleGrayedChanged();

            if (this.grayed)
                this._displayObject.style.fill = "#AAAAAA";
            else
                this._displayObject.style.fill = this._color;
        }

        public getProp(index: number): any {
            switch (index) {
                case ObjectPropID.Color:
                    return this.color;
                case ObjectPropID.OutlineColor:
                    return this.strokeColor;
                case ObjectPropID.FontSize:
                    return this.fontSize;
                default:
                    return super.getProp(index);
            }
        }

        public setProp(index: number, value: any): void {
            switch (index) {
                case ObjectPropID.Color:
                    this.color = value;
                    break;
                case ObjectPropID.OutlineColor:
                    this.strokeColor = value;
                    break;
                case ObjectPropID.FontSize:
                    this.fontSize = value;
                    break;
                default:
                    super.setProp(index, value);
                    break;
            }
        }

        public setDropShadow(color:string,offsetX:number,offsetY:number,blur:number=0){
            let angle = Math.atan2(offsetY, offsetX);
            let distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
            // Round to two decimal places for precision
            angle = Math.round(angle * 100) / 100 ;
            distance = Math.round(distance * 100) / 100;

            this._displayObject.style.dropShadow = {
                color: color,
                alpha: 1,
                angle: angle,
                blur: blur,
                distance: distance
            }
        }

        public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
            super.setup_beforeAdd(buffer, beginPos);

            buffer.seek(beginPos, 5);

            var iv: number;

            this.font = buffer.readS();
            this.fontSize = buffer.readInt16();
            this.color = buffer.readColorS();
            iv = buffer.readByte();
            this.align = iv == 0 ? "left" : (iv == 1 ? "center" : "right");
            iv = buffer.readByte();
            this.valign = iv == 0 ? "top" : (iv == 1 ? "middle" : "bottom");
            this.leading = buffer.readInt16();
            this.letterSpacing = buffer.readInt16();
            this._ubbEnabled = buffer.readBool();
            this.autoSize = buffer.readByte();
            this.underline = buffer.readBool();
            this.italic = buffer.readBool();
            this.bold = buffer.readBool();
            this.singleLine = buffer.readBool();
            if (buffer.readBool()) {
                this._strokeColor = buffer.readColorS();
                this._strokeWidth = buffer.readFloat32() + 1;
                this.setStroke();
            }

            if (buffer.readBool()) //shadow
            {
                let color = buffer.readColorS();
                let offsetx = buffer.readFloat32();
                let offsety = buffer.readFloat32();
                this.setDropShadow(color, offsetx, offsety);
            }

            if (buffer.readBool()) {
                //this._displayObject.templateVars = {};
            }
        }

        public setup_afterAdd(buffer: ByteBuffer, beginPos: number): void {
            super.setup_afterAdd(buffer, beginPos);

            buffer.seek(beginPos, 6);

            var str: string = buffer.readS();
            if (str != null)
                this.text = str;
        }
    }

    const labelPadding = [2, 2, 2, 2];
}