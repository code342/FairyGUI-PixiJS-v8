namespace fgui {

    export class ByteBuffer {
        public littleEndian: boolean = false;
        private _dataView: DataView;
        private _u8ByteArray: Uint8Array;
        private _pos: number = 0;
        public length: number = 0;
        public stringTable: Array<string>;
        public version: number;
        constructor(data: any, offset?: number, length?: number, isLittle: boolean = false) {
            offset = offset || 0;
            if (length == null || length == -1)
                length = data.byteLength - offset;

            this._u8ByteArray = new Uint8Array(data, offset, length);
            this._dataView = new DataView(this._u8ByteArray.buffer, offset, length);
            this.length = length;

            this.littleEndian = isLittle;
        }


        get buffer(): ArrayBuffer {
            var rstBuffer: ArrayBuffer = this._dataView.buffer;
            if (rstBuffer.byteLength === this.length) return rstBuffer;
            return rstBuffer.slice(0, this.length);
        }


        get pos(): number {
            return this._pos;
        }

        set pos(value: number) {
            this._pos = value;
        }

        get bytesAvailable(): number {
            return this.length - this._pos;
        }

        clear(): void {
            this._pos = 0;
            this.length = 0;
        }

        readString(): string {
            return this._rUTF(this.readUint16());
        }


        readFloat32(): number {
            if (this._pos + 4 > this.length) throw "getFloat32 error - Out of bounds";
            var v: number = this._dataView.getFloat32(this._pos, this.littleEndian);
            this._pos += 4;
            return v;
        }


        readInt32(): number {
            if (this._pos + 4 > this.length) throw "getInt32 error - Out of bounds";
            var float: number = this._dataView.getInt32(this._pos, this.littleEndian);
            this._pos += 4;
            return float;
        }

        readUint32(): number {
            if (this._pos + 4 > this.length) throw "getUint32 error - Out of bounds";
            var v: number = this._dataView.getUint32(this._pos, this.littleEndian);
            this._pos += 4;
            return v;
        }

        readInt16(): number {
            if (this._pos + 2 > this.length) throw "getInt16 error - Out of bounds";
            var us: number = this._dataView.getInt16(this._pos, this.littleEndian);
            this._pos += 2;
            return us;
        }

        readUint16(): number {
            if (this._pos + 2 > this.length) throw "getUint16 error - Out of bounds";
            var us: number = this._dataView.getUint16(this._pos, this.littleEndian);
            this._pos += 2;
            return us;
        }


        readUint8(): number {
            if (this._pos + 1 > this.length) throw "getUint8 error - Out of bounds";
            return this._u8ByteArray[this._pos++];
        }


        /**
         * @private
         * 读取指定长度的 UTF 型字符串。
         * @param	len 需要读取的长度。
         * @return 读取的字符串。
         */
        private _rUTF(len: number): string {
            var max: number = this._pos + len, c: number, c2: number, c3: number, f: Function = String.fromCharCode;
            var u: any = this._u8ByteArray, i: number = 0;
            var strs: any[] = [];
            var n: number = 0;
            strs.length = 1000;
            while (this._pos < max) {
                c = u[this._pos++];
                if (c < 0x80) {
                    if (c != 0)
                        strs[n++] = f(c);
                } else if (c < 0xE0) {
                    strs[n++] = f(((c & 0x3F) << 6) | (u[this._pos++] & 0x7F));
                } else if (c < 0xF0) {
                    c2 = u[this._pos++];
                    strs[n++] = f(((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (u[this._pos++] & 0x7F));
                } else {
                    c2 = u[this._pos++];
                    c3 = u[this._pos++];
                    const _code = ((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 & 0x7F) << 6) | (u[this._pos++] & 0x7F);
                    if (_code >= 0x10000) {
                        const _offset = _code - 0x10000;
                        const _lead = 0xd800 | (_offset >> 10);
                        const _trail = 0xdc00 | (_offset & 0x3ff);
                        strs[n++] = f(_lead);
                        strs[n++] = f(_trail);
                    }
                    else {
                        strs[n++] = f(_code);
                    }
                }
                i++;
            }
            strs.length = n;
            return strs.join('');
        }

        readCustomString(len: number): string {
            var v: string = "", ulen: number = 0, c: number, c2: number, f: Function = String.fromCharCode;
            var u: any = this._u8ByteArray;
            while (len > 0) {
                c = u[this._pos];
                if (c < 0x80) {
                    v += f(c);
                    this._pos++;
                    len--;
                } else {
                    ulen = c - 0x80;
                    this._pos++;
                    len -= ulen;
                    while (ulen > 0) {
                        c = u[this._pos++];
                        c2 = u[this._pos++];
                        v += f((c2 << 8) | c);
                        ulen--;
                    }
                }
            }

            return v;
        }


        readUTFString(): string {
            return this.readUTFBytes(this.readUint16());
        }


        readUTFBytes(len: number = -1): string {
            if (len === 0) return "";
            var lastBytes: number = this.bytesAvailable;
            if (len > lastBytes) throw "readUTFBytes error - Out of bounds";
            len = len > 0 ? len : lastBytes;
            return this._rUTF(len);
        }


        readByte(): number {
            if (this._pos + 1 > this.length) throw "readByte error - Out of bounds";
            return this._dataView.getInt8(this._pos++);
        }


        public skip(count: number): void {
            this.pos += count;
        }

        public readBool(): boolean {
            return this.readUint8() == 1;
        }

        public readS(): string {
            var index: number = this.readUint16();
            if (index == 65534) //null
                return null;
            else if (index == 65533)
                return ""
            else
                return this.stringTable[index];
        }

        public readSArray(cnt: number): Array<string> {
            var ret: Array<string> = new Array<string>(cnt);
            for (var i: number = 0; i < cnt; i++)
                ret[i] = this.readS();

            return ret;
        }

        public writeS(value: string): void {
            var index: number = this.readUint16();
            if (index != 65534 && index != 65533)
                this.stringTable[index] = value;
        }

        public readColor(hasAlpha?: boolean): number {
            var r: number = this.readUint8();
            var g: number = this.readUint8();
            var b: number = this.readUint8();
            var a: number = this.readUint8();

            return (hasAlpha ? (a << 24) : 0) + (r << 16) + (g << 8) + b;
        }

        public readColorS(hasAlpha?: boolean): string {
            var r: number = this.readUint8();
            var g: number = this.readUint8();
            var b: number = this.readUint8();
            var a: number = this.readUint8();

            if (hasAlpha && a != 255)
                return "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
            else {
                var sr: string = r.toString(16);
                var sg: string = g.toString(16);
                var sb: string = b.toString(16);
                if (sr.length == 1)
                    sr = "0" + sr;
                if (sg.length == 1)
                    sg = "0" + sg;
                if (sb.length == 1)
                    sb = "0" + sb;
                return "#" + sr + sg + sb;
            }
        }

        public readChar(): string {
            var i: number = this.readUint16();
            return String.fromCharCode(i);
        }

        public readBuffer(): ByteBuffer {
            var count: number = this.readUint32();
            var ba: ByteBuffer = new ByteBuffer(this.buffer, this._pos, count);
            this.pos += count;
            ba.stringTable = this.stringTable;
            ba.version = this.version;
            return ba;
        }

        public seek(indexTablePos: number, blockIndex: number): boolean {
            var tmp: number = this._pos;
            this.pos = indexTablePos;
            var segCount: number = this.readUint8();
            if (blockIndex < segCount) {
                var useShort: boolean = this.readUint8() == 1;
                var newPos: number;
                if (useShort) {
                    this.pos += 2 * blockIndex;
                    newPos = this.readUint16();
                }
                else {
                    this.pos += 4 * blockIndex;
                    newPos = this.readUint32();
                }

                if (newPos > 0) {
                    this.pos = indexTablePos + newPos;
                    return true;
                }
                else {
                    this.pos = tmp;
                    return false;
                }
            }
            else {
                this.pos = tmp;
                return false;
            }
        }
    }

}