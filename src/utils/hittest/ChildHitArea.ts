namespace fgui {

    export class ChildHitArea implements PIXI.IHitArea {

        private _child: GGraph;
        private _reversed: boolean;

        constructor(child: GGraph, reversed?: boolean) {

            this._child = child;
            this._reversed = reversed;
        }

        public contains(x: number, y: number): boolean {
            var tPos: PIXI.Point = PIXI.Point.shared.set(x, y);
            //TODO:x,y是鼠标的世界坐标，可能需要做一下坐标转换; unHit
            //如果不需要转换坐标那可以不需要这个类，直接就parent.hitArea = child.graphics
            //也可能不需要额外设置hitArea，引擎内部自己会检测
            //tPos = this._child.toParentPoint(tPos);

            return this._child.graphics.containsPoint(tPos);
        }
    }
}