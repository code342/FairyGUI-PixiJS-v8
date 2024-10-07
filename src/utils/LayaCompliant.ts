namespace fgui {

    export class LayaCompliant {

    }

    let win: any = window;
    let hasPointer = !!(win.PointerEvent || win.MSPointerEvent);
    let hasTouch = 'ontouchstart' in window && isMobile.any;
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

    export class DisplayEvent {
        public static Added = "added";
        public static Removed = "removed";
        public static DragStart = 'DragStart';
        public static DragEnd = 'DragEnd';
        public static DragMove = 'DragMove';
        public static DragDrop = 'DragDrop';

        public static StateChanged = "stateChanged";
        public static SizeChanged = "sizeChanged";
        public static PositionChanged = "positionChanged";

        public static ClickItem = "clickItem";

        public static Scroll = "scroll";
        public static ScrollEnd = "scrollEnd";
        public static PullDownRelease = "pullDownRelease";
        public static PullUpRelease = "pullUpRelease";
    }
}