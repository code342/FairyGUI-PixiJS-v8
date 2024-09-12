import { BitmapFont, Color, Font, HorizontalTextAlignment, Label, Node, Vec2, VerticalTextAlignment } from "cc";
import { Event as FUIEvent } from "./event/Event";
import { AutoSizeType, ObjectPropID } from "./FieldTypes";
import { GObject } from "./GObject";
import { PackageItem } from "./PackageItem";
import { UIConfig, getFontByName } from "./UIConfig";
import { UIPackage } from "./UIPackage";
import { ByteBuffer } from "./utils/ByteBuffer";
import { toGrayedColor } from "./utils/ToolSet";
import { defaultParser } from "./utils/UBBParser";

export class GTextField extends GObject {
    public _label: Label;

    protected _font: string;
    protected _realFont: string | Font;
    protected _fontSize: number = 0;
    protected _color: Color;
    protected _strokeColor?: Color;
    protected _shadowOffset?: Vec2;
    protected _shadowColor?: Color;
    protected _leading: number = 0;
    protected _text: string;
    protected _ubbEnabled: boolean;
    protected _templateVars?: { [index: string]: string };
    protected _autoSize: AutoSizeType;
    protected _updatingSize: boolean;
    protected _sizeDirty: boolean;

    public constructor() {
        super();

        this._node.name = "GTextField";
        this._touchDisabled = true;

        this._text = "";
        this._color = new Color(255, 255, 255, 255);

        this.createRenderer();

        this.fontSize = 12;
        this.leading = 3;
        this.singleLine = false;

        this._sizeDirty = false;

        this._node.on(Node.EventType.SIZE_CHANGED, this.onLabelSizeChanged, this);
    }

    protected createRenderer() {
        this._label = this._node.addComponent(Label);
        this._label.string = "";
        this.autoSize = AutoSizeType.Both;
    }

    public set text(value: string | null) {
        this._text = value;
        if (this._text == null)
            this._text = "";
        this.updateGear(6);

        this.markSizeChanged();
        this.updateText();
    }

    public get text(): string | null {
        return this._text;
    }

    public get font(): string | null {
        return this._font;
    }

    public set font(value: string | null) {
        if (this._font != value || !value) {
            this._font = value;

            this.markSizeChanged();

            let newFont: any = value ? value : UIConfig.defaultFont;

            if (newFont.startsWith("ui://")) {
                var pi: PackageItem = UIPackage.getItemByURL(newFont);
                if (pi)
                    newFont = <Font>pi.owner.getItemAsset(pi);
                else
                    newFont = UIConfig.defaultFont;
            }
            this._realFont = newFont;
            this.updateFont();
        }
    }

    public get fontSize(): number {
        return this._fontSize;
    }

    public set fontSize(value: number) {
        if (value < 0)
            return;

        if (this._fontSize != value) {
            this._fontSize = value;

            this.markSizeChanged();
            this.updateFontSize();
        }
    }

    public get color(): Color {
        return this._color;
    }

    public set color(value: Color) {
        this._color.set(value);
        this.updateGear(4);

        this.updateFontColor();
    }

    public get align(): HorizontalTextAlignment {
        return this._label ? this._label.horizontalAlign : 0;
    }

    public set align(value: HorizontalTextAlignment) {
        if (this._label) this._label.horizontalAlign = value;
    }

    public get verticalAlign(): VerticalTextAlignment {
        return this._label ? this._label.verticalAlign : 0;
    }

    public set verticalAlign(value: VerticalTextAlignment) {
        if (this._label) this._label.verticalAlign = value;
    }

    public get leading(): number {
        return this._leading;
    }

    public set leading(value: number) {
        if (this._leading != value) {
            this._leading = value;

            this.markSizeChanged();
            this.updateFontSize();
        }
    }

    public get letterSpacing(): number {
        return this._label ? this._label.spacingX : 0;
    }

    public set letterSpacing(value: number) {
        if (this._label && this._label.spacingX != value) {
            this.markSizeChanged();
            this._label.spacingX = value;
        }
    }

    public get underline(): boolean {
        return this._label ? this._label.isUnderline : false;
    }

    public set underline(value: boolean) {
        if (this._label) this._label.isUnderline = value;
    }

    public get bold(): boolean {
        return this._label ? this._label.isBold : false;
    }

    public set bold(value: boolean) {
        if (this._label) this._label.isBold = value;
    }

    public get italic(): boolean {
        return this._label ? this._label.isItalic : false;
    }

    public set italic(value: boolean) {
        if (this._label) this._label.isItalic = value;
    }

    public get singleLine(): boolean {
        return this._label ? !this._label.enableWrapText : false;
    }

    public set singleLine(value: boolean) {
        if (this._label) this._label.enableWrapText = !value;
    }

    public get stroke(): number {
        return this._label ? this._label.outlineWidth : 0;
    }

    public set stroke(value: number) {
        if (!this._label)
            return;

        this._label.outlineWidth = value;
        this._label.enableOutline = value > 0;
        if (value > 0)
            this.updateStrokeColor();
    }

    public get strokeColor(): Color {
        return this._strokeColor;
    }

    public set strokeColor(value: Color) {
        if (!this._strokeColor)
            this._strokeColor = new Color();
        this._strokeColor.set(value);
        this.updateGear(4);
        this.updateStrokeColor();
    }

    public get shadowOffset(): Vec2 {
        return this._shadowOffset;
    }

    public set shadowOffset(value: Vec2) {
        if (!this._shadowOffset)
            this._shadowOffset = new Vec2();
        this._shadowOffset.set(value);

        if (!this._label)
            return;
        this._label.shadowOffset = new Vec2(this._shadowOffset.x, -this._shadowOffset.y);
        this._label.enableShadow = value.x != 0 || value.y != 0;
        if (this._label.enableShadow)
            this.updateShadowColor();
    }

    public get shadowColor(): Color {
        return this._shadowColor;
    }

    public set shadowColor(value: Color) {
        if (!this._shadowColor)
            this._shadowColor = new Color();
        this._shadowColor.set(value);
        this.updateShadowColor();
    }

    public set ubbEnabled(value: boolean) {
        if (this._ubbEnabled != value) {
            this._ubbEnabled = value;

            this.markSizeChanged();
            this.updateText();
        }
    }

    public get ubbEnabled(): boolean {
        return this._ubbEnabled;
    }

    public set autoSize(value: AutoSizeType) {
        if (this._autoSize != value) {
            this._autoSize = value;

            this.markSizeChanged();
            this.updateOverflow();
        }
    }

    public get autoSize(): AutoSizeType {
        return this._autoSize;
    }

    protected parseTemplate(template: string): string {
        var pos1: number = 0, pos2: number, pos3: number;
        var tag: string;
        var value: string;
        var result: string = "";
        while ((pos2 = template.indexOf("{", pos1)) != -1) {
            if (pos2 > 0 && template.charCodeAt(pos2 - 1) == 92)//\
            {
                result += template.substring(pos1, pos2 - 1);
                result += "{";
                pos1 = pos2 + 1;
                continue;
            }

            result += template.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = template.indexOf("}", pos1);
            if (pos2 == -1)
                break;

            if (pos2 == pos1 + 1) {
                result += template.substring(pos1, pos1 + 2);
                pos1 = pos2 + 1;
                continue;
            }

            tag = template.substring(pos1 + 1, pos2);
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
                value = this._templateVars[tag.substring(0, pos3)];
                if (value == null)
                    result += tag.substring(pos3 + 1);
                else
                    result += value;
            }
            else {
                value = this._templateVars[tag];
                if (value != null)
                    result += value;
            }
            pos1 = pos2 + 1;
        }

        if (pos1 < template.length)
            result += template.substring(pos1);

        return result;
    }

    public get templateVars(): { [index: string]: string } {
        return this._templateVars;
    }

    public set templateVars(value: { [index: string]: string }) {
        if (this._templateVars == null && value == null)
            return;

        this._templateVars = value;
        this.flushVars();
    }

    public setVar(name: string, value: string): GTextField {
        if (!this._templateVars)
            this._templateVars = {};
        this._templateVars[name] = value;

        return this;
    }

    public flushVars(): void {
        this.markSizeChanged();
        this.updateText();
    }

    public get textWidth(): number {
        this.ensureSizeCorrect();

        return this._uiTrans.width;
    }

    public ensureSizeCorrect(): void {
        if (this._sizeDirty) {
            this._label.updateRenderData(true);
            this._sizeDirty = false;
        }
    }

    protected updateText(): void {
        var text2: string = this._text;
        if (this._templateVars)
            text2 = this.parseTemplate(text2);

        if (this._ubbEnabled) //不支持同一个文本不同样式
            text2 = defaultParser.parse(text2, true);

        this._label.string = text2;
    }

    protected assignFont(label: any, value: string | Font): void {
        if (value instanceof Font)
            label.font = value;
        else {
            let font = getFontByName(<string>value);
            if (!font) {
                label.fontFamily = <string>value;
                label.useSystemFont = true;
            }
            else
                label.font = font;
        }
    }

    protected assignFontColor(label: any, value: Color): void {
        let font: any = label.font;
        if ((font instanceof BitmapFont) && !(font.fntConfig.canTint))
            value = Color.WHITE;

        if (this._grayed)
            value = toGrayedColor(value);
        label.color = value;
    }

    protected updateFont() {
        this.assignFont(this._label, this._realFont);
    }

    protected updateFontColor() {
        this.assignFontColor(this._label, this._color);
    }

    protected updateStrokeColor() {
        if (!this._label || !this._label.enableOutline)
            return;
        if (!this._strokeColor)
            this._strokeColor = new Color();
        if (this._grayed)
            this._label.outlineColor = toGrayedColor(this._strokeColor);
        else
            this._label.outlineColor = this._strokeColor;
    }

    protected updateShadowColor() {
        if (!this._label || !this._label.enableShadow)
            return;
        if (!this._shadowColor)
            this._shadowColor = new Color();
        if (this._grayed)
            this._label.shadowColor = toGrayedColor(this._shadowColor);
        else
            this._label.shadowColor = this._shadowColor;
    }

    protected updateFontSize() {
        let font: any = this._label.font;
        if (font instanceof BitmapFont) {
            let fntConfig = font.fntConfig;
            if (fntConfig.resizable)
                this._label.fontSize = this._fontSize;
            else
                this._label.fontSize = fntConfig.fontSize;
            this._label.lineHeight = fntConfig.fontSize + (this._leading + 4) * fntConfig.fontSize / this._label.fontSize;
        }
        else {
            this._label.fontSize = this._fontSize;
            this._label.lineHeight = this._fontSize + this._leading;
        }
    }

    protected updateOverflow() {
        if (this._autoSize == AutoSizeType.Both)
            this._label.overflow = Label.Overflow.NONE;
        else if (this._autoSize == AutoSizeType.Height) {
            this._label.overflow = Label.Overflow.RESIZE_HEIGHT;
            this._uiTrans.width = this._width;
        }
        else if (this._autoSize == AutoSizeType.Shrink) {
            this._label.overflow = Label.Overflow.SHRINK;
            this._uiTrans.setContentSize(this._width, this._height);
        }
        else {
            this._label.overflow = Label.Overflow.CLAMP;
            this._uiTrans.setContentSize(this._width, this._height);
        }
    }

    protected markSizeChanged(): void {
        if (this._underConstruct)
            return;

        if (this._autoSize == AutoSizeType.Both || this._autoSize == AutoSizeType.Height) {
            if (!this._sizeDirty) {
                this._node.emit(FUIEvent.SIZE_DELAY_CHANGE);
                this._sizeDirty = true;
            }
        }
    }

    protected onLabelSizeChanged(): void {
        this._sizeDirty = false;

        if (this._underConstruct)
            return;

        if (this._autoSize == AutoSizeType.Both || this._autoSize == AutoSizeType.Height) {
            this._updatingSize = true;
            this.setSize(this._uiTrans.width, this._uiTrans.height);
            this._updatingSize = false;
        }
    }

    protected handleSizeChanged(): void {
        if (this._updatingSize)
            return;

        if (this._autoSize == AutoSizeType.None || this._autoSize == AutoSizeType.Shrink) {
            this._uiTrans.setContentSize(this._width, this._height);
        }
        else if (this._autoSize == AutoSizeType.Height)
            this._uiTrans.width = this._width;
    }

    protected handleGrayedChanged(): void {
        this.updateFontColor();
        this.updateStrokeColor();
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

    public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
        super.setup_beforeAdd(buffer, beginPos);

        buffer.seek(beginPos, 5);

        this.font = buffer.readS();
        this.fontSize = buffer.readShort();
        this.color = buffer.readColor();
        this.align = buffer.readByte();
        this.verticalAlign = buffer.readByte();
        this.leading = buffer.readShort();
        this.letterSpacing = buffer.readShort();
        this._ubbEnabled = buffer.readBool();
        this.autoSize = buffer.readByte();
        this.underline = buffer.readBool();
        this.italic = buffer.readBool();
        this.bold = buffer.readBool();
        this.singleLine = buffer.readBool();
        if (buffer.readBool()) {
            this.strokeColor = buffer.readColor();
            this.stroke = buffer.readFloat();
        }

        if (buffer.readBool()) {
            this.shadowColor = buffer.readColor();
            let f1 = buffer.readFloat();
            let f2 = buffer.readFloat();
            this.shadowOffset = new Vec2(f1, f2);
        }

        if (buffer.readBool())
            this._templateVars = {};
    }

    public setup_afterAdd(buffer: ByteBuffer, beginPos: number): void {
        super.setup_afterAdd(buffer, beginPos);

        buffer.seek(beginPos, 6);

        var str: string = buffer.readS();
        if (str != null) {
            this.text = str;
        }
        else {
            this.text = "";
        }
    }
}