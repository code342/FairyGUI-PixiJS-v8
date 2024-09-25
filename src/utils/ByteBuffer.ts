export class ByteBuffer {
    public littleEndian: boolean = false;
    private _allocated: number = 8;
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


    set length(value: number) {
        if (this._allocated < value) this._resizeBuffer(this._allocated = Math.floor(Math.max(value, this._allocated * 2)));
        else if (this._allocated > value) this._resizeBuffer(this._allocated = value);
        this._length = value;
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
        this.length = 0;
    }    

    /**@private */
    private _resizeBuffer(len: number): void {
        try {
            var newByteView: any = new Uint8Array(len);
            if (this._u8ByteArray != null) {
                if (this._u8ByteArray.length <= len) newByteView.set(this._u8ByteArray);
                else newByteView.set(this._u8ByteArray.subarray(0, len));
            }
            this._u8ByteArray = newByteView;
            this._dataView = new DataView(newByteView.buffer);
        } catch (err) {
            throw "Invalid typed array length:" + len;
        }
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


    /**
     * @internal
     * @en Ensures that the available length of this byte stream is at least the value specified by the lengthToEnsure parameter.
     * @param lengthToEnsure The length to ensure is available in the byte stream.
     */
    _ensureWrite(lengthToEnsure: number): void {
        if (this._length < lengthToEnsure) this._length = lengthToEnsure;
        if (this._allocated < lengthToEnsure) this.length = lengthToEnsure;
    }


    writeByte(value: number): void {
        this._ensureWrite(this._pos + 1);
        this._dataView.setInt8(this._pos, value);
        this._pos += 1;
    }


   writeUint16(value: number): void {
        this._ensureWrite(this._pos + 2);
        this._dataView.setUint16(this._pos, value, this.littleEndian);
        this._pos += 2;
    }

    writeInt16(value: number): void {
        this._ensureWrite(this._pos + 2);
        this._dataView.setInt16(this._pos, value, this.littleEndian);
        this._pos += 2;
    }

    writeInt32(value: number): void {
        this._ensureWrite(this._pos + 4);
        this._dataView.setInt32(this._pos, value, this.littleEndian);
        this._pos += 4;
    }

    writeUint32(value: number): void {
        this._ensureWrite(this._pos + 4);
        this._dataView.setUint32(this._pos, value, this.littleEndian);
        this._pos += 4;
    }

    writeUint8(value: number): void {
        this._ensureWrite(this._pos + 1);
        this._dataView.setUint8(this._pos, value);
        this._pos++;
    }

    writeFloat32(value: number): void {
        this._ensureWrite(this._pos + 4);
        this._dataView.setFloat32(this._pos, value, this.littleEndian);
        this._pos += 4;
    }

    writeFloat64(value: number): void {
        this._ensureWrite(this._pos + 8);
        this._dataView.setFloat64(this._pos, value, this.littleEndian);
        this._pos += 8;
    }

    /**
     * @en Writes a UTF-8 string to the byte stream. Similar to the writeUTF() method, but writeUTFBytes() does not prefix the string with a 16-bit length word.
     * The corresponding reading method is getUTFBytes.
     * @param value The string to write.
     * @zh 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的字节为字符串添加前缀。
     * 对应的读取方法为： getUTFBytes 。
     * @param value 要写入的字符串。
     */
    writeUTFBytes(value: string): void {
        // utf8-decode
        value = value + "";
        for (var i: number = 0, sz: number = value.length; i < sz; i++) {
            var c: number = value.charCodeAt(i);

            if (c <= 0x7F) {
                this.writeByte(c);
            } else if (c <= 0x7FF) {
                //优化为直接写入多个字节，而不必重复调用writeByte，免去额外的调用和逻辑开销。
                this._ensureWrite(this._pos + 2);
                this._u8ByteArray.set([0xC0 | (c >> 6), 0x80 | (c & 0x3F)], this._pos);
                this._pos += 2;
            } else if (c >= 0xD800 && c <= 0xDBFF) {
                i++;
                const c2 = value.charCodeAt(i);
                if (!Number.isNaN(c2) && c2 >= 0xDC00 && c2 <= 0xDFFF) {
                    const _p1 = (c & 0x3FF) + 0x40;
                    const _p2 = c2 & 0x3FF;

                    const _b1 = 0xF0 | ((_p1 >> 8) & 0x3F);
                    const _b2 = 0x80 | ((_p1 >> 2) & 0x3F);
                    const _b3 = 0x80 | ((_p1 & 0x3) << 4) | ((_p2 >> 6) & 0xF);
                    const _b4 = 0x80 | (_p2 & 0x3F);

                    this._ensureWrite(this._pos + 4);
                    this._u8ByteArray.set([_b1, _b2, _b3, _b4], this._pos);
                    this._pos += 4;
                }
            } else if (c <= 0xFFFF) {
                this._ensureWrite(this._pos + 3);
                this._u8ByteArray.set([0xE0 | (c >> 12), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F)], this._pos);
                this._pos += 3;
            } else {
                this._ensureWrite(this._pos + 4);
                this._u8ByteArray.set([0xF0 | (c >> 18), 0x80 | ((c >> 12) & 0x3F), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F)], this._pos);
                this._pos += 4;
            }
        }
    }

    /**
     * @en Writes a UTF-8 string to the byte stream. First, the length of the UTF-8 string in bytes is written (as a 16-bit integer), followed by the bytes representing the string characters.
     * The corresponding reading method is getUTFString.
     * @param value The string value to write.
     * @zh 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节。
     * 对应的读取方法为： getUTFString 。
     * @param value 要写入的字符串值。
     */
    writeUTFString(value: string): void {
        var tPos: number = this.pos;
        this.writeUint16(1);
        this.writeUTFBytes(value);
        var dPos: number = this.pos - tPos - 2;
        this._dataView.setUint16(tPos, dPos, this.littleEndian);
    }

    /**
     * @en Writes a UTF-8 string to the byte stream. First, the length of the UTF-8 string in bytes is written (as a 32-bit integer), followed by the bytes representing the string characters.
     * @param value The string value to write.
     * @zh 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 32 位整数），然后写入表示字符串字符的字节。
     * @param value 要写入的字符串值。
     */
    writeUTFString32(value: string): void {
        var tPos = this.pos;
        this.writeUint32(1);
        this.writeUTFBytes(value);
        var dPos = this.pos - tPos - 4;
        this._dataView.setUint32(tPos, dPos, this.littleEndian);
    }

    writeArrayBuffer(arraybuffer: any, offset: number = 0, length: number = 0): void {
        if (offset < 0 || length < 0) throw "writeArrayBuffer error - Out of bounds";
        if (length == 0) length = arraybuffer.byteLength - offset;
        this._ensureWrite(this._pos + length);
        var uint8array: any = new Uint8Array(arraybuffer);
        this._u8ByteArray.set(uint8array.subarray(offset, offset + length), this._pos);
        this._pos += length;
    }
}

