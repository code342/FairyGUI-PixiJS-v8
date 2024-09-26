import { IHitArea, Point } from "pixi.js";
import { GGraph } from "../../GGraph";

export class ChildHitArea implements IHitArea {

    private _child: GGraph;
    private _reversed: boolean;

    constructor(child: GGraph, reversed?: boolean) {

        this._child = child;
        this._reversed = reversed;

       /* if (this._reversed)
            this.unHit = (<Laya.HitArea>child.hitArea).hit;
        else
            this.hit = (<Laya.HitArea>child.hitArea).hit;*/
    }

    public contains(x: number, y: number): boolean {
        var tPos: Point = Point.shared.set(x,y);
        //TODO:x,y是鼠标的世界坐标，可能需要做一下坐标转换
        //tPos = this._child.toParentPoint(tPos);

        return this._child.graphics.containsPoint(tPos);
        /*
        if (this._reversed)
            return !_func(x - tPos.x, y - tPos.y, sp, this.unHit);
        else
            return _func(x - tPos.x, y - tPos.y, sp, this.hit);*/
    }
}