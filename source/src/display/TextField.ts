
namespace fgui {
    export class TextField extends PIXI.Container {
        private _textView: PIXI.Text;
        private _halign:string;
        private _valign:string;
        private _width:number;
        private _height:number;
        constructor() {
            super();
            this._textView = new PIXI.Text();
            this.addChild(this._textView);
        }

        public get style(): PIXI.TextStyle {
            return this._textView.style;
        }

        public get view(): PIXI.Text {
            return this._textView;
        }

        public set text(value: string) {
            this._textView.text = value;
            this.updateTextAlign();
        }

        public get text(): string {
            return this._textView.text;
        }

        public get align(): string {
            return this._halign;
        }

        public set align(value: PIXI.TextStyleAlign) {
            this._halign = value;
        }

        public get valign(): string {
            return this._valign;
        }

        public set valign(value: string) {
            this._valign = value;
        }

        override setSize(value: number | PIXI.Optional<PIXI.Size, "height">, height?: number): void {
           // super.setSize(value, height);
           this._width = value as number;
           this._height = height;
            this.updateTextAlign();
        }

        private updateTextAlign(): void {
            const align = this.align;
            const valign = this.valign; 
            const textWidth = this._textView.width;
            const textHeight = this._textView.height;

            // Horizontal alignment
            switch (align) {
                case 'left':
                    this._textView.x = 0;
                    break;
                case 'center':
                    this._textView.x = (this._width - textWidth) / 2;
                    break;
                case 'right':
                    this._textView.x = this._width - textWidth;
                    break;
            }

            // Vertical alignment
            switch (valign) {
                case 'top':
                    this._textView.y = 0;
                    break;
                case 'middle':
                    this._textView.y = (this._height - textHeight) / 2;
                    break;
                case 'bottom':
                    this._textView.y = this._height - textHeight;
                    break;
            }
        }
    }
}