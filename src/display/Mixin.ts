import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { GObject } from "../GObject";

type Constructor = new (...args: any[]) => {};
type GConstructor<T = {}> = new (...args: any[]) => T;
type ContainerExt = GConstructor<{ 
    set mask(value: number | Container | null);
    get mask(): number | Container | null;
    addChild(child: Container): Container;
}>;

export function MixScrollRect<TBase extends ContainerExt>(Base: TBase) {
    return class extends Base {

        private _scrollRect: Rectangle = new Rectangle(20,30, 100, 100);
        private _scrollMask: Graphics;
        public get scrollRect(): Rectangle {
            return this._scrollRect;
        }
    
        public set scrollRect(value: Rectangle) {
           // if(value && value.equals(this._scrollRect))
           //     return;
    
            this._scrollRect = value;
    
            //无效的scrollRect, 清理遮罩
            if(!value || value.width == 0 || value.height == 0) {
                if(this._scrollMask) {
                    this._scrollMask.removeFromParent();
                    if(this.mask == this._scrollMask) {
                        this.mask = null;
                    }
                }
                return;
            }
    
            //设置遮罩
            if(!this._scrollMask) {
                this._scrollMask = new Graphics();
                this._scrollMask.eventMode = "none";
            }
            this.addChild(this._scrollMask);
            this.mask = this._scrollMask;
            this._scrollMask.clear().rect(value.x, value.y, value.width, value.height).fill();
        }
    }
}

export function MixOwner<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public owner:GObject;
    }
}

export class ContainerEx extends MixOwner(MixScrollRect(Container)){};
export class SpriteEx extends MixOwner(MixScrollRect(Sprite)){};



