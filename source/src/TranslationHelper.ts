namespace fgui {

    export class TranslationHelper {
        public static strings: Record<string, Record<string, string>>;

        constructor() {
        }

        public static translateComponent(item: PackageItem): void {
            if (TranslationHelper.strings == null)
                return;

            let compStrings = TranslationHelper.strings[item.owner.id + item.id];
            if (compStrings == null)
                return;

            let elementId: string, value: string;
            let buffer: ByteBuffer = item.rawData;
            let nextPos: number;
            let itemCount: number;
            let dataLen: number;
            let curPos: number;
            let valueCnt: number;
            let page: string;

            buffer.seek(0, 2);

            let childCount: number = buffer.readInt16();
            for (let i = 0; i < childCount; i++) {
                dataLen = buffer.readInt16();
                curPos = buffer.pos;

                buffer.seek(curPos, 0);

                let baseType: number = buffer.readByte();
                let type: number = baseType;
                buffer.skip(4);
                elementId = buffer.readS();

                if (type == ObjectType.Component) {
                    if (buffer.seek(curPos, 6))
                        type = buffer.readByte();
                }

                buffer.seek(curPos, 1);

                if ((value = compStrings[elementId + "-tips"]) != null)
                    buffer.writeS(value);

                buffer.seek(curPos, 2);

                let gearCnt: number = buffer.readInt16();
                for (let j = 0; j < gearCnt; j++) {
                    nextPos = buffer.readInt16();
                    nextPos += buffer.pos;

                    if (buffer.readByte() == 6) //gearText
                    {
                        buffer.skip(2);//controller
                        valueCnt = buffer.readInt16();
                        for (let k = 0; k < valueCnt; k++) {
                            page = buffer.readS();
                            if (page != null) {
                                if ((value = compStrings[elementId + "-texts_" + k]) != null)
                                    buffer.writeS(value);
                                else
                                    buffer.skip(2);
                            }
                        }

                        if (buffer.readBool() && (value = compStrings[elementId + "-texts_def"]) != null)
                            buffer.writeS(value);
                    }

                    buffer.pos = nextPos;
                }

                if (baseType == ObjectType.Component && buffer.version >= 2) {
                    buffer.seek(curPos, 4);

                    buffer.skip(2); //pageController

                    buffer.skip(4 * buffer.readUint16());

                    let cpCount: number = buffer.readUint16();
                    for (let k: number = 0; k < cpCount; k++) {
                        let target: string = buffer.readS();
                        let propertyId: number = buffer.readUint16();
                        if (propertyId == 0 && (value = compStrings[elementId + "-cp-" + target]) != null)
                            buffer.writeS(value);
                        else
                            buffer.skip(2);
                    }
                }

                switch (type) {
                    case ObjectType.Text:
                    case ObjectType.RichText:
                    case ObjectType.InputText:
                        {
                            if ((value = compStrings[elementId]) != null) {
                                buffer.seek(curPos, 6);
                                buffer.writeS(value);
                            }
                            if ((value = compStrings[elementId + "-prompt"]) != null) {
                                buffer.seek(curPos, 4);
                                buffer.writeS(value);
                            }
                            break;
                        }

                    case ObjectType.List:
                    case ObjectType.Tree:
                        {
                            buffer.seek(curPos, 8);
                            buffer.skip(2);
                            itemCount = buffer.readUint16();
                            for (let j = 0; j < itemCount; j++) {
                                nextPos = buffer.readUint16();
                                nextPos += buffer.pos;

                                buffer.skip(2); //url
                                if (type == ObjectType.Tree)
                                    buffer.skip(2);

                                //title
                                if ((value = compStrings[elementId + "-" + j]) != null)
                                    buffer.writeS(value);
                                else
                                    buffer.skip(2);

                                //selected title
                                if ((value = compStrings[elementId + "-" + j + "-0"]) != null)
                                    buffer.writeS(value);
                                else
                                    buffer.skip(2);

                                if (buffer.version >= 2) {
                                    buffer.skip(6);
                                    buffer.skip(buffer.readUint16() * 4);//controllers

                                    let cpCount: number = buffer.readUint16();
                                    for (let k: number = 0; k < cpCount; k++) {
                                        let target: string = buffer.readS();
                                        let propertyId: number = buffer.readUint16();
                                        if (propertyId == 0 && (value = compStrings[elementId + "-" + j + "-" + target]) != null)
                                            buffer.writeS(value);
                                        else
                                            buffer.skip(2);
                                    }
                                }

                                buffer.pos = nextPos;
                            }
                            break;
                        }

                    case ObjectType.Label:
                        {
                            if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                                if ((value = compStrings[elementId]) != null)
                                    buffer.writeS(value);
                                else
                                    buffer.skip(2);

                                buffer.skip(2);
                                if (buffer.readBool())
                                    buffer.skip(4);
                                buffer.skip(4);
                                if (buffer.readBool() && (value = compStrings[elementId + "-prompt"]) != null)
                                    buffer.writeS(value);
                            }
                            break;
                        }

                    case ObjectType.Button:
                        {
                            if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                                if ((value = compStrings[elementId]) != null)
                                    buffer.writeS(value);
                                else
                                    buffer.skip(2);
                                if ((value = compStrings[elementId + "-0"]) != null)
                                    buffer.writeS(value);
                            }
                            break;
                        }

                    case ObjectType.ComboBox:
                        {
                            if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                                itemCount = buffer.readInt16();
                                for (let j = 0; j < itemCount; j++) {
                                    nextPos = buffer.readInt16();
                                    nextPos += buffer.pos;

                                    if ((value = compStrings[elementId + "-" + j]) != null)
                                        buffer.writeS(value);

                                    buffer.pos = nextPos;
                                }

                                if ((value = compStrings[elementId]) != null)
                                    buffer.writeS(value);
                            }

                            break;
                        }
                }

                buffer.pos = curPos + dataLen;
            }
        }
    }
}