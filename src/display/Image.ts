import { Material, Sprite, UITransform, Vec2 } from "cc";
import { FillMethod, FillOrigin, FlipType } from "../FieldTypes";

export class Image extends Sprite {
    private _flip: FlipType = FlipType.None;
    private _fillMethod: FillMethod = FillMethod.None;
    private _fillOrigin: FillOrigin = FillOrigin.Left;
    private _fillAmount: number = 0;
    private _fillClockwise: boolean;

    public constructor() {
        super();
    }

    public get flip(): FlipType {
        return this._flip;
    }

    public set flip(value: FlipType) {
        if (this._flip != value) {
            this._flip = value;

            let sx = 1, sy = 1;
            if (this._flip == FlipType.Horizontal || this._flip == FlipType.Both)
                sx = -1;
            if (this._flip == FlipType.Vertical || this._flip == FlipType.Both)
                sy = -1;

            if (sx != 1 || sy != 1) {
                let uiTrans = this.node.getComponent(UITransform)!;
                uiTrans.setAnchorPoint(0.5, 0.5);
            }
            this.node.setScale(sx, sy);
        }
    }

    public get fillMethod(): FillMethod {
        return this._fillMethod;
    }

    public set fillMethod(value: FillMethod) {
        if (this._fillMethod != value) {
            this._fillMethod = value;
            if (this._fillMethod != 0) {
                this.type = Sprite.Type.FILLED;
                if (this._fillMethod <= 3)
                    this.fillType = <number>this._fillMethod - 1;
                else
                    this.fillType = Sprite.FillType.RADIAL;
                this.fillCenter = new Vec2(0.5, 0.5);

                this.setupFill();
            }
            else {
                this.type = Sprite.Type.SIMPLE;
            }
        }
    }

    public get fillOrigin(): FillOrigin {
        return this._fillOrigin;
    }

    public set fillOrigin(value: FillOrigin) {
        if (this._fillOrigin != value) {
            this._fillOrigin = value;
            if (this._fillMethod != 0)
                this.setupFill();
        }
    }

    public get fillClockwise(): boolean {
        return this._fillClockwise;
    }

    public set fillClockwise(value: boolean) {
        if (this._fillClockwise != value) {
            this._fillClockwise = value;
            if (this._fillMethod != 0)
                this.setupFill();
        }
    }

    public get fillAmount(): number {
        return this._fillAmount;
    }

    public set fillAmount(value: number) {
        if (this._fillAmount != value) {
            this._fillAmount = value;
            if (this._fillMethod != 0) {
                if (this._fillClockwise)
                    this.fillRange = - this._fillAmount;
                else
                    this.fillRange = this._fillAmount;
            }
        }
    }

    private setupFill(): void {
        if (this._fillMethod == FillMethod.Horizontal) {
            this._fillClockwise = this._fillOrigin == FillOrigin.Right || this._fillOrigin == FillOrigin.Bottom;
            this.fillStart = this._fillClockwise ? 1 : 0;
        }
        else if (this._fillMethod == FillMethod.Vertical) {
            this._fillClockwise = this._fillOrigin == FillOrigin.Left || this._fillOrigin == FillOrigin.Top;
            this.fillStart = this._fillClockwise ? 1 : 0;
        }
        else {
            switch (this._fillOrigin) {
                case FillOrigin.Right:
                    this.fillOrigin = 0;
                    break;
                case FillOrigin.Top:
                    this.fillStart = 0.25;
                    break;
                case FillOrigin.Left:
                    this.fillStart = 0.5;
                    break;
                case FillOrigin.Bottom:
                    this.fillStart = 0.75;
                    break;
            }
        }
    }
}