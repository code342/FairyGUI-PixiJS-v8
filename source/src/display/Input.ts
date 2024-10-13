/// <reference path="./TextField.ts" />
namespace fgui {
    export class Input extends TextField {
        static TYPE_TEXT: string = "text";
        /**
         * @en Password type for password input fields.
         * @zh password 类型用于密码域输入。
         */
        static TYPE_PASSWORD: string = "password";
        /**
         * @en Email type for input fields that should contain an e-mail address.
         * @zh email 类型用于应该包含 e-mail 地址的输入域。
         */
        static TYPE_EMAIL: string = "email";
        /**
         * @en URL type for input fields that should contain a URL address.
         * @zh url 类型用于应该包含 URL 地址的输入域。
         */
        static TYPE_URL: string = "url";
        /**
         * @en Number type for input fields that should contain a numeric value.
         * @zh number 类型用于应该包含数值的输入域。
         */
        static TYPE_NUMBER: string = "number";
        /**
         * @en Range type for input fields that should contain a numeric value within a certain range.
         * The range type is displayed as a slider.
         * You can also set limitations on the accepted numbers.
         * @zh range 类型用于应该包含一定范围内数字值的输入域。
         * range 类型显示为滑动条。
         * 您还能够设定对所接受的数字的限定。
         */
        static TYPE_RANGE: string = "range";
        /**
         * @en Select day, month, and year.
         * @zh 选取日、月、年。
         */
        static TYPE_DATE: string = "date";
        /**
         * @en Select month and year.
         * @zh month - 选取月、年。
         */
        static TYPE_MONTH: string = "month";
        /**
         * @en Select week and year.
         * @zh week - 选取周和年。
         */
        static TYPE_WEEK: string = "week";
        /**
         * @en Select time (hours and minutes).
         * @zh time - 选取时间（小时和分钟）。
         */
        static TYPE_TIME: string = "time";
        /**
         * @en Select time, day, month, year (UTC time).
         * @zh datetime - 选取时间、日、月、年（UTC 时间）。
         */
        static TYPE_DATE_TIME: string = "datetime";
        /**
         * @en Select time, day, month, year (local time).
         * @zh datetime-local - 选取时间、日、月、年（本地时间）。
         */
        static TYPE_DATE_TIME_LOCAL: string = "datetime-local";
        /**
         * @en Search type for search fields, such as site search or Google search.
         * The search field is displayed as a regular text field.
         * @zh search 类型用于搜索域，比如站点搜索或 Google 搜索。
         * search 域显示为常规的文本域。
         */
        static TYPE_SEARCH: string = "search";

        type: string;
        editable: boolean;
        maxChars: number;
        prompt: string;
        restrict: string;
        focus: boolean;
        promptColor: string;
    }
}