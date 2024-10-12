namespace fgui {

    export class LayaCompliant {

    }

    let win: any = window;
    let hasPointer = !!(win.PointerEvent || win.MSPointerEvent);
    let hasTouch = 'ontouchstart' in window && PIXI.isMobile.any;
    export class MouseEvents {
        public static Down: string = hasPointer ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
        public static Cancel: string = hasPointer ? "pointercancel" : hasTouch ? "touchcancel" : "mousecancel";
        public static Up: string = hasPointer ? "pointerup" : hasTouch ? "touchend" : "mouseup";
        public static Click: string = hasPointer ? "pointertap" : hasTouch ? "tap" : "click";
        public static UpOutside: string = hasPointer ? "pointerupoutside" : hasTouch ? "touchendoutside" : "mouseupoutside";
        public static Move: string = hasPointer ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
        public static Over: string = hasPointer ? "pointerover" : hasTouch ? null : "mouseover";
        public static Out: string = hasPointer ? "pointerout" : hasTouch ? null : "mouseout";
        //mouse only
        public static RightDown = "rightdown";
        public static RightUp = "rightup";
        public static RightClick = "rightclick";
        public static RightUpOutside = "rightupoutside";
        public static Wheel = "wheel";
    }

    export class Events {
        public static DISPLAY = "pixi_added";
        public static UNDISPLAY = "pixi_removed";

        public static DRAG_START = 'fui_drag_start';
        public static DRAG_END = 'fui_drag_end';
        public static DRAG_MOVE = 'fui_drag_move';
        public static DROP = 'fui_drop';

        public static STATE_CHANGED = "fui_state_changed";
        public static SIZE_CHANGED = "fui_size_changed";
        public static XY_CHANGED = "fui_xy_changed";

        public static CLICK_ITEM = "fui_click_item";

        public static SCROLL = "fui_scroll";
        public static SCROLL_END = "fui_scroll_end";

        public static PULL_DOWN_RELEASE = "fui_pull_down_release";
        public static PULL_UP_RELEASE = "fui_pull_up_release";
    }
}