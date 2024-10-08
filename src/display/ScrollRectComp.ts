import { Container, Graphics, Rectangle } from "pixi.js";

export class ScrollRectComp{
    private _rect: Rectangle;
    private _mask: Graphics;
    get rect(): Rectangle {
        return this._rect;
    }

    clip(target:Container, value: Rectangle) {
       // if(value && value.equals(this._scrollRect))
       //     return;

        //无效的scrollRect, 清理遮罩
        if(!value || value.width == 0 || value.height == 0) {
            if(this._mask) {
                this._mask.removeFromParent();
                if(target.mask == this._mask) {
                    target.mask = null;
                }
            }
            this._rect = null;
            return;
        }

        this._rect = value;
        //设置遮罩
        if(!this._mask) {
            this._mask = new Graphics();
            this._mask.eventMode = "none";
        }
        target.addChild(this._mask);
        target.mask = this._mask;
        this._mask.clear().rect(value.x, value.y, value.width, value.height).fill();
    }
}