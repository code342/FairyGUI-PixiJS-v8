export class ByteBuffer {
    public littleEndian: boolean = false;
    private _dataView: DataView;
    private _u8ByteArray: Uint8Array;
    private _pos: number = 0;
    private _length: number = 0;

    constructor(data: any, offset?: number, length?: number, isLittle:boolean=false) {
        offset = offset || 0;
        if (length == null || length == -1)
            length = data.byteLength - offset;

        this._u8ByteArray = new Uint8Array(data, offset, length);
        this._dataView = new DataView(this._u8ByteArray.buffer, offset, length);
        this._length = length;
        
        this.littleEndian = isLittle;
    }


    get buffer(): ArrayBuffer {
        var rstBuffer: ArrayBuffer = this._dataView.buffer;
        if (rstBuffer.byteLength === this._length) return rstBuffer;
        return rstBuffer.slice(0, this._length);
    }

    get length(): number {
        return this._length;
    }

    get pos(): number {
        return this._pos;
    }

    set pos(value: number) {
        this._pos = value;
    }

    get bytesAvailable(): number {
        return this._length - this._pos;
    }

    clear(): void {
        this._pos = 0;
        this._length = 0;
    }    

    //////////////////////////////////////////////////////////
    readString(): string {
        return this._rUTF(this.readUint16());
    }

    readFloat32Array(start: number, len: number): any {
        var end: number = start + len;
        end = (end > this._length) ? this._length : end;
        var v: any = new Float32Array(this._dataView.buffer.slice(start, end));
        this._pos = end;
        return v;
    }

    readUint8Array(start: number, len: number): Uint8Array {
        var end: number = start + len;
        end = (end > this._length) ? this._length : end;
        var v: any = new Uint8Array(this._dataView.buffer.slice(start, end));
        this._pos = end;
        return v;
    }

    readInt16Array(start: number, len: number): any {
        var end: number = start + len;
        end = (end > this._length) ? this._length : end;
        var v: any = new Int16Array(this._dataView.buffer.slice(start, end));
        this._pos = end;
        return v;
    }


    readFloat32(): number {
        if (this._pos + 4 > this._length) throw "getFloat32 error - Out of bounds";
        var v: number = this._dataView.getFloat32(this._pos, this.littleEndian);
        this._pos += 4;
        return v;
    }

    readFloat64(): number {
        if (this._pos + 8 > this._length) throw "getFloat64 error - Out of bounds";
        var v: number = this._dataView.getFloat64(this._pos, this.littleEndian);
        this._pos += 8;
        return v;
    }


    readInt32(): number {
        if (this._pos + 4 > this._length) throw "getInt32 error - Out of bounds";
        var float: number = this._dataView.getInt32(this._pos, this.littleEndian);
        this._pos += 4;
        return float;
    }

    readUint32(): number {
        if (this._pos + 4 > this._length) throw "getUint32 error - Out of bounds";
        var v: number = this._dataView.getUint32(this._pos, this.littleEndian);
        this._pos += 4;
        return v;
    }

    readInt16(): number {
        if (this._pos + 2 > this._length) throw "getInt16 error - Out of bounds";
        var us: number = this._dataView.getInt16(this._pos, this.littleEndian);
        this._pos += 2;
        return us;
    }

    readUint16(): number {
        if (this._pos + 2 > this._length) throw "getUint16 error - Out of bounds";
        var us: number = this._dataView.getUint16(this._pos, this.littleEndian);
        this._pos += 2;
        return us;
    }


    readUint8(): number {
        if (this._pos + 1 > this._length) throw "getUint8 error - Out of bounds";
        return this._u8ByteArray[this._pos++];
    }


    /**
     * @private
     * 读取指定长度的 UTF 型字符串。
     * @param	len 需要读取的长度。
     * @return 读取的字符串。
     */
    private _rUTF(len: number): string {
        var v: string = "", max: number = this._pos + len, c: number, c2: number, c3: number, f: Function = String.fromCharCode;
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
        var u: any = this._u8ByteArray, i: number = 0;
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


    readUTFString32(): string {
        return this.readUTFBytes(this.readUint32());
    }


    readArrayBuffer(length: number): ArrayBuffer {
        var rst: ArrayBuffer;
        rst = this._u8ByteArray.buffer.slice(this._pos, this._pos + length);
        this._pos = this._pos + length
        return rst;
    }


    readUTFBytes(len: number = -1): string {
        if (len === 0) return "";
        var lastBytes: number = this.bytesAvailable;
        if (len > lastBytes) throw "readUTFBytes error - Out of bounds";
        len = len > 0 ? len : lastBytes;
        return this._rUTF(len);
    }


    readByte(): number {
        if (this._pos + 1 > this._length) throw "readByte error - Out of bounds";
        return this._dataView.getInt8(this._pos++);
    }
}

