namespace fgui {

    export class GScrollBar extends GComponent {
        private _grip: GObject;
        private _arrowButton1: GObject;
        private _arrowButton2: GObject;
        private _bar: GObject;
        private _target: ScrollPane;

        private _vertical: boolean;
        private _scrollPerc: number;
        private _fixedGripSize: boolean;

        private _dragOffset: PIXI.Point;
        private _gripDragging: boolean;

        constructor() {
            super();
            this._dragOffset = new PIXI.Point();
            this._scrollPerc = 0;
        }

        public setScrollPane(target: ScrollPane, vertical: boolean): void {
            this._target = target;
            this._vertical = vertical;
        }

        public setDisplayPerc(value: number) {
            if (this._vertical) {
                if (!this._fixedGripSize)
                    this._grip.height = Math.floor(value * this._bar.height);
                this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;

            }
            else {
                if (!this._fixedGripSize)
                    this._grip.width = Math.floor(value * this._bar.width);
                this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
            }
            this._grip.visible = value != 0 && value != 1;
        }

        public setScrollPerc(val: number) {
            this._scrollPerc = val;
            if (this._vertical)
                this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;
            else
                this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
        }

        public get minSize(): number {
            if (this._vertical)
                return (this._arrowButton1 ? this._arrowButton1.height : 0) + (this._arrowButton2 ? this._arrowButton2.height : 0);
            else
                return (this._arrowButton1 ? this._arrowButton1.width : 0) + (this._arrowButton2 ? this._arrowButton2.width : 0);
        }

        public get gripDragging(): boolean {
            return this._gripDragging;
        }

        protected constructExtension(buffer: ByteBuffer): void {
            buffer.seek(0, 6);

            this._fixedGripSize = buffer.readBool();

            this._grip = this.getChild("grip");
            if (!this._grip) {
                console.log("需要定义grip");
                return;
            }

            this._bar = this.getChild("bar");
            if (!this._bar) {
                console.log("需要定义bar");
                return;
            }

            this._arrowButton1 = this.getChild("arrow1");
            this._arrowButton2 = this.getChild("arrow2");

            this._grip.on(MouseEvents.Down, this.__gripMouseDown, this);

            if (this._arrowButton1)
                this._arrowButton1.on(MouseEvents.Down, this.__arrowButton1Click, this);
            if (this._arrowButton2)
                this._arrowButton2.on(MouseEvents.Down, this.__arrowButton2Click, this);

            this.on(MouseEvents.Down, this.__barMouseDown, this);
        }

        private __gripMouseDown(evt: PIXI.FederatedPointerEvent): void {
            evt.stopPropagation();

            this._gripDragging = true;
            this._target.updateScrollBarVisible();

            GRoot.inst.stage.on(MouseEvents.Move, this.__gripMouseMove, this);
            GRoot.inst.stage.on(MouseEvents.Up, this.__gripMouseUp, this);

            let mousePoint: PIXI.Point = GRoot.inst.mousePosition;
            this.globalToLocal(mousePoint.x, mousePoint.y, this._dragOffset);
            this._dragOffset.x -= this._grip.x;
            this._dragOffset.y -= this._grip.y;
        }

        private __gripMouseMove(): void {
            if (!this.onStage)
                return;

            let mousePoint: PIXI.Point = GRoot.inst.mousePosition;
            var pt: PIXI.Point = this.globalToLocal(mousePoint.x, mousePoint.y, s_vec2);
            if (this._vertical) {
                var curY: number = pt.y - this._dragOffset.y;
                this._target.setPercY((curY - this._bar.y) / (this._bar.height - this._grip.height), false);
            }
            else {
                var curX: number = pt.x - this._dragOffset.x;
                this._target.setPercX((curX - this._bar.x) / (this._bar.width - this._grip.width), false);
            }
        }

        private __gripMouseUp(evt: PIXI.FederatedPointerEvent): void {
            if (!this.onStage)
                return;

            GRoot.inst.stage.off(MouseEvents.Move, this.__gripMouseMove, this);
            GRoot.inst.stage.off(MouseEvents.Up, this.__gripMouseUp, this);

            this._gripDragging = false;
            this._target.updateScrollBarVisible();
        }

        private __arrowButton1Click(evt: PIXI.FederatedPointerEvent): void {
            evt.stopPropagation();

            if (this._vertical)
                this._target.scrollUp();
            else
                this._target.scrollLeft();
        }

        private __arrowButton2Click(evt: PIXI.FederatedPointerEvent): void {
            evt.stopPropagation();

            if (this._vertical)
                this._target.scrollDown();
            else
                this._target.scrollRight();
        }

        private __barMouseDown(evt: PIXI.FederatedPointerEvent): void {
            let mousePoint: PIXI.Point = GRoot.inst.mousePosition;
            var pt: PIXI.Point = this._grip.globalToLocal(mousePoint.x, mousePoint.y, s_vec2);
            if (this._vertical) {
                if (pt.y < 0)
                    this._target.scrollUp(4);
                else
                    this._target.scrollDown(4);
            }
            else {
                if (pt.x < 0)
                    this._target.scrollLeft(4);
                else
                    this._target.scrollRight(4);
            }
        }
    }

    var s_vec2: PIXI.Point = new PIXI.Point();
}