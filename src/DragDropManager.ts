namespace fgui {

    export class DragDropManager {

        private _agent: GLoader;
        private _sourceData: any;

        private static _inst: DragDropManager;
        public static get inst(): DragDropManager {
            if (!DragDropManager._inst)
                DragDropManager._inst = new DragDropManager();
            return DragDropManager._inst;
        }

        constructor() {
            this._agent = new GLoader();
            this._agent.draggable = true;
            this._agent.touchable = false;////important
            this._agent.setSize(100, 100);
            this._agent.setPivot(0.5, 0.5, true);
            this._agent.align = "center";
            this._agent.verticalAlign = "middle";
            this._agent.sortingOrder = 1000000;
            this._agent.on(DisplayEvent.DragEnd, this.__dragEnd, this);
        }

        public get dragAgent(): GObject {
            return this._agent;
        }

        public get dragging(): boolean {
            return this._agent.parent != null;
        }

        public startDrag(source: GObject, icon: string, sourceData?: any, touchID?: number): void {
            if (this._agent.parent)
                return;

            this._sourceData = sourceData;
            this._agent.url = icon;
            GRoot.inst.addChild(this._agent);
            let mousePoint: Point = GRoot.inst.mousePosition;
            var pt: Point = GRoot.inst.globalToLocal(mousePoint.x, mousePoint.y);
            this._agent.setXY(pt.x, pt.y);
            this._agent.startDrag(touchID);
        }

        public cancel(): void {
            if (this._agent.parent) {
                this._agent.stopDrag();
                GRoot.inst.removeChild(this._agent);
                this._sourceData = null;
            }
        }

        private __dragEnd(evt: FederatedEvent): void {
            if (!this._agent.parent) //cancelled
                return;

            GRoot.inst.removeChild(this._agent);

            var sourceData: any = this._sourceData;
            this._sourceData = null;

            var obj: GObject = GObject.cast(evt.target);
            while (obj) {
                if (obj.hasListener(DisplayEvent.DragDrop)) {
                    obj.requestFocus();
                    obj.emit(DisplayEvent.DragDrop, [sourceData, evt]);
                    return;
                }

                obj = obj.parent;
            }
        }
    }
}