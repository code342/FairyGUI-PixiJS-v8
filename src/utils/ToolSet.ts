namespace fgui {

    export class ToolSet {
        public static startsWith(source: string, str: string, ignoreCase?: boolean): boolean {
            if (!source)
                return false;
            else if (source.length < str.length)
                return false;
            else {
                source = source.substring(0, str.length);
                if (!ignoreCase)
                    return source == str;
                else
                    return source.toLowerCase() == str.toLowerCase();
            }
        }

        public static endsWith(source: string, str: string, ignoreCase?: boolean): boolean {
            if (!source)
                return false;
            else if (source.length < str.length)
                return false;
            else {
                source = source.substring(source.length - str.length);
                if (!ignoreCase)
                    return source == str;
                else
                    return source.toLowerCase() == str.toLowerCase();
            }
        }

        public static trimRight(targetString: string): string {
            var tempChar: string = "";
            for (var i: number = targetString.length - 1; i >= 0; i--) {
                tempChar = targetString.charAt(i);
                if (tempChar != " " && tempChar != "\n" && tempChar != "\r") {
                    break;
                }
            }
            return targetString.substring(0, i + 1);
        }

        public static convertToHtmlColor(argb: number, hasAlpha?: boolean): string {
            var alpha: string;
            if (hasAlpha)
                alpha = (argb >> 24 & 0xFF).toString(16);
            else
                alpha = "";
            var red: string = (argb >> 16 & 0xFF).toString(16);
            var green: string = (argb >> 8 & 0xFF).toString(16);
            var blue: string = (argb & 0xFF).toString(16);
            if (alpha.length == 1)
                alpha = "0" + alpha;
            if (red.length == 1)
                red = "0" + red;
            if (green.length == 1)
                green = "0" + green;
            if (blue.length == 1)
                blue = "0" + blue;
            return "#" + alpha + red + green + blue;
        }

        public static convertFromHtmlColor(str: string, hasAlpha?: boolean): number {
            if (str.length < 1)
                return 0;

            if (str.charAt(0) == "#")
                str = str.substring(1);

            if (str.length == 8)
                return (parseInt(str.substring(0, 2), 16) << 24) + parseInt(str.substring(2), 16);
            else if (hasAlpha)
                return 0xFF000000 + parseInt(str, 16);
            else
                return parseInt(str, 16);
        }

        public static encodeHTML(str: string): string {
            if (!str)
                return "";
            else
                return str.replace(/&/g, "&amp;").replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
        }

        public static clamp(value: number, min: number, max: number): number {
            if (value < min)
                value = min;
            else if (value > max)
                value = max;
            return value;
        }

        public static clamp01(value: number): number {
            if (isNaN(value))
                value = 0;
            else if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;
            return value;
        }

        public static lerp(start: number, end: number, percent: number): number {
            return (start + percent * (end - start));
        }

        public static repeat(t: number, length: number): number {
            return t - Math.floor(t / length) * length;
        }

        public static distance(x1: number, y1: number, x2: number, y2: number): number {
            return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        }

        public static setColorFilter(obj: Container, color?: string | number[] | boolean): void {
            if (obj.filters == null) obj.filters = [];
            let filters = obj.filters as Filter[];
            let colorFilter: ColorMatrixFilter;
            for (let filter of filters) {
                if (filter instanceof ColorMatrixFilter) {
                    colorFilter = filter;
                    break;
                }
            }
            if (colorFilter == null) {
                colorFilter = new ColorMatrixFilter();
                filters.push(colorFilter);
            }

            let colorType = typeof (color)
            if (colorType == "boolean") {
                //set gray
                colorFilter.greyscale(0.3, true);
                return;
            } else if (colorType == "string") {
                //trans color string to color array
                let colorArray = new Color(color as string).toArray();
                colorFilter.matrix = [
                    colorArray[0], 0, 0, 0, 0,
                    0, colorArray[1], 0, 0, 0,
                    0, 0, colorArray[2], 0, 0,
                    0, 0, 0, 1, 0
                ]
            } else {
                let co = color as number[];
                colorFilter.brightness(co[0], false);
                colorFilter.contrast(co[1], false);
                colorFilter.saturate(co[2]);
                colorFilter.hue(co[3], false);
            }
        }

        static toHexColor(color: number): string {
            if (color < 0 || isNaN(color)) return null;
            var str: string = color.toString(16);
            while (str.length < 6) str = "0" + str;
            return "#" + str;
        }
    }
}