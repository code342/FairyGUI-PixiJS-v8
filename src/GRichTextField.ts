/// <reference path="./GTextField.ts" />

namespace fgui {

    export class GRichTextField extends GTextField {

        constructor() {
            super();

            //this._displayObject.html = true;
            this._displayObject.eventMode = "static";
        }
    }


}