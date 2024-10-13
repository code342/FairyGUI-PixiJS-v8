declare namespace fgui {
    class AssetProxy {
        private static _inst;
        static get inst(): AssetProxy;
        getRes(url: string, type?: string): any;
        getItemRes(item: PackageItem): any;
        load(url: string | string[], type?: string, onProgress?: (progress: number) => void): Promise<any>;
        clearTextureRes(url: string): void;
    }
}
declare namespace fgui {
    class AsyncOperation {
        callback: (obj: GObject) => void;
        private _itemList;
        private _objectPool;
        private _index;
        constructor();
        createObject(pkgName: string, resName: string): void;
        createObjectFromURL(url: string): void;
        cancel(): void;
        private internalCreateObject;
        private collectComponentChildren;
        private collectListChildren;
        private run;
    }
}
declare namespace fgui {
    class Controller extends PIXI.EventEmitter {
        private _selectedIndex;
        private _previousIndex;
        private _pageIds;
        private _pageNames;
        private _actions?;
        name: string;
        parent: GComponent;
        autoRadioGroupDepth?: boolean;
        changing: boolean;
        constructor();
        dispose(): void;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        /**
         * 功能和设置selectedIndex一样，但不会触发事件
         */
        setSelectedIndex(value: number): void;
        get previsousIndex(): number;
        get selectedPage(): string;
        set selectedPage(val: string);
        /**
         * 功能和设置selectedPage一样，但不会触发事件
         */
        setSelectedPage(value: string): void;
        get previousPage(): string;
        get pageCount(): number;
        getPageName(index: number): string;
        addPage(name: string): void;
        addPageAt(name: string, index: number): void;
        removePage(name: string): void;
        removePageAt(index: number): void;
        clearPages(): void;
        hasPage(aName: string): boolean;
        getPageIndexById(aId: string): number;
        getPageIdByName(aName: string): string;
        getPageNameById(aId: string): string;
        getPageId(index: number): string;
        get selectedPageId(): string;
        set selectedPageId(val: string);
        set oppositePageId(val: string);
        get previousPageId(): string;
        runActions(): void;
        setup(buffer: ByteBuffer): void;
    }
}
declare namespace fgui {
    class DragDropManager {
        private _agent;
        private _sourceData;
        private static _inst;
        static get inst(): DragDropManager;
        constructor();
        get dragAgent(): GObject;
        get dragging(): boolean;
        startDrag(source: GObject, icon: string, sourceData?: any, touchID?: number): void;
        cancel(): void;
        private __dragEnd;
    }
}
declare namespace fgui {
    enum ButtonMode {
        Common = 0,
        Check = 1,
        Radio = 2
    }
    enum AutoSizeType {
        None = 0,
        Both = 1,
        Height = 2,
        Shrink = 3,
        Ellipsis = 4
    }
    enum AlignType {
        Left = 0,
        Center = 1,
        Right = 2
    }
    enum VertAlignType {
        Top = 0,
        Middle = 1,
        Bottom = 2
    }
    enum LoaderFillType {
        None = 0,
        Scale = 1,
        ScaleMatchHeight = 2,
        ScaleMatchWidth = 3,
        ScaleFree = 4,
        ScaleNoBorder = 5
    }
    enum ListLayoutType {
        SingleColumn = 0,
        SingleRow = 1,
        FlowHorizontal = 2,
        FlowVertical = 3,
        Pagination = 4
    }
    enum ListSelectionMode {
        Single = 0,
        Multiple = 1,
        Multiple_SingleClick = 2,
        None = 3
    }
    enum OverflowType {
        Visible = 0,
        Hidden = 1,
        Scroll = 2
    }
    enum PackageItemType {
        Image = 0,
        MovieClip = 1,
        Sound = 2,
        Component = 3,
        Atlas = 4,
        Font = 5,
        Swf = 6,
        Misc = 7,
        Unknown = 8,
        Spine = 9,
        DragonBones = 10
    }
    enum ObjectType {
        Image = 0,
        MovieClip = 1,
        Swf = 2,
        Graph = 3,
        Loader = 4,
        Group = 5,
        Text = 6,
        RichText = 7,
        InputText = 8,
        Component = 9,
        List = 10,
        Label = 11,
        Button = 12,
        ComboBox = 13,
        ProgressBar = 14,
        Slider = 15,
        ScrollBar = 16,
        Tree = 17,
        Loader3D = 18
    }
    enum ProgressTitleType {
        Percent = 0,
        ValueAndMax = 1,
        Value = 2,
        Max = 3
    }
    enum ScrollBarDisplayType {
        Default = 0,
        Visible = 1,
        Auto = 2,
        Hidden = 3
    }
    enum ScrollType {
        Horizontal = 0,
        Vertical = 1,
        Both = 2
    }
    enum FlipType {
        None = 0,
        Horizontal = 1,
        Vertical = 2,
        Both = 3
    }
    enum ChildrenRenderOrder {
        Ascent = 0,
        Descent = 1,
        Arch = 2
    }
    enum GroupLayoutType {
        None = 0,
        Horizontal = 1,
        Vertical = 2
    }
    enum PopupDirection {
        Auto = 0,
        Up = 1,
        Down = 2
    }
    enum RelationType {
        Left_Left = 0,
        Left_Center = 1,
        Left_Right = 2,
        Center_Center = 3,
        Right_Left = 4,
        Right_Center = 5,
        Right_Right = 6,
        Top_Top = 7,
        Top_Middle = 8,
        Top_Bottom = 9,
        Middle_Middle = 10,
        Bottom_Top = 11,
        Bottom_Middle = 12,
        Bottom_Bottom = 13,
        Width = 14,
        Height = 15,
        LeftExt_Left = 16,
        LeftExt_Right = 17,
        RightExt_Left = 18,
        RightExt_Right = 19,
        TopExt_Top = 20,
        TopExt_Bottom = 21,
        BottomExt_Top = 22,
        BottomExt_Bottom = 23,
        Size = 24
    }
    enum FillMethod {
        None = 0,
        Horizontal = 1,
        Vertical = 2,
        Radial90 = 3,
        Radial180 = 4,
        Radial360 = 5
    }
    enum FillOrigin {
        Top = 0,
        Bottom = 1,
        Left = 2,
        Right = 3,
        TopLeft = 0,
        TopRight = 1,
        BottomLeft = 2,
        BottomRight = 3
    }
    enum FillOrigin90 {
        TopLeft = 0,
        TopRight = 1,
        BottomLeft = 2,
        BottomRight = 3
    }
    enum ObjectPropID {
        Text = 0,
        Icon = 1,
        Color = 2,
        OutlineColor = 3,
        Playing = 4,
        Frame = 5,
        DeltaTime = 6,
        TimeScale = 7,
        FontSize = 8,
        Selected = 9
    }
}
declare namespace fgui {
    class GObject {
        data: any;
        packageItem: PackageItem;
        static draggingObject: GObject;
        private _x;
        private _y;
        private _alpha;
        private _rotation;
        private _visible;
        private _touchable;
        private _grayed;
        private _draggable?;
        private _scaleX;
        private _scaleY;
        private _skewX;
        private _skewY;
        private _pivotX;
        private _pivotY;
        private _pivotAsAnchor;
        private _pivotOffsetX;
        private _pivotOffsetY;
        private _sortingOrder;
        private _internalVisible;
        private _handlingController?;
        private _tooltips?;
        private _pixelSnapping?;
        private _relations;
        private _group?;
        private _gears;
        private _dragBounds?;
        private _dragTesting?;
        private _dragStartPos?;
        protected _displayObject: PIXI.Container;
        protected _yOffset: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        sourceWidth: number;
        sourceHeight: number;
        initWidth: number;
        initHeight: number;
        _parent: GComponent;
        _width: number;
        _height: number;
        _rawWidth: number;
        _rawHeight: number;
        _id: string;
        _name: string;
        _underConstruct: boolean;
        _gearLocked?: boolean;
        _sizePercentInGroup: number;
        _treeNode?: GTreeNode;
        constructor();
        get id(): string;
        get name(): string;
        set name(value: string);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        setXY(xv: number, yv: number): void;
        get xMin(): number;
        set xMin(value: number);
        get yMin(): number;
        set yMin(value: number);
        get pixelSnapping(): boolean;
        set pixelSnapping(value: boolean);
        center(restraint?: boolean): void;
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        setSize(wv: number, hv: number, ignorePivot?: boolean): void;
        ensureSizeCorrect(): void;
        makeFullScreen(): void;
        get actualWidth(): number;
        get actualHeight(): number;
        get scaleX(): number;
        set scaleX(value: number);
        get scaleY(): number;
        set scaleY(value: number);
        setScale(sx: number, sy: number): void;
        get skewX(): number;
        set skewX(value: number);
        get skewY(): number;
        set skewY(value: number);
        setSkew(sx: number, sy: number): void;
        get pivotX(): number;
        set pivotX(value: number);
        get pivotY(): number;
        set pivotY(value: number);
        setPivot(xv: number, yv?: number, asAnchor?: boolean): void;
        get pivotAsAnchor(): boolean;
        protected internalSetPivot(xv: number, yv: number, asAnchor: boolean): void;
        private updatePivotOffset;
        private applyPivot;
        get touchable(): boolean;
        set touchable(value: boolean);
        get grayed(): boolean;
        set grayed(value: boolean);
        get enabled(): boolean;
        set enabled(value: boolean);
        get rotation(): number;
        set rotation(value: number);
        get normalizeRotation(): number;
        get alpha(): number;
        set alpha(value: number);
        get visible(): boolean;
        set visible(value: boolean);
        get internalVisible(): boolean;
        get internalVisible2(): boolean;
        get internalVisible3(): boolean;
        get sortingOrder(): number;
        set sortingOrder(value: number);
        get focused(): boolean;
        requestFocus(): void;
        get tooltips(): string;
        set tooltips(value: string);
        private __rollOver;
        private __doShowTooltips;
        private __rollOut;
        get blendMode(): string;
        set blendMode(value: string);
        get filters(): PIXI.Filter | PIXI.Filter[];
        set filters(value: PIXI.Filter | PIXI.Filter[]);
        get inContainer(): boolean;
        get onStage(): boolean;
        get resourceURL(): string;
        set group(value: GGroup);
        get group(): GGroup;
        getGear(index: number): GearBase;
        protected updateGear(index: number): void;
        checkGearController(index: number, c: Controller): boolean;
        updateGearFromRelations(index: number, dx: number, dy: number): void;
        addDisplayLock(): number;
        releaseDisplayLock(token: number): void;
        private checkGearDisplay;
        get relations(): Relations;
        addRelation(target: GObject, relationType: number, usePercent?: boolean): void;
        removeRelation(target: GObject, relationType?: number): void;
        get displayObject(): PIXI.Container;
        get parent(): GComponent;
        set parent(val: GComponent);
        removeFromParent(): void;
        get root(): GRoot;
        get asCom(): GComponent;
        get asButton(): GButton;
        get asLabel(): GLabel;
        get asProgress(): GProgressBar;
        get asTextField(): GTextField;
        get asRichTextField(): GRichTextField;
        get asTextInput(): GTextInput;
        get asLoader(): GLoader;
        get asList(): GList;
        get asTree(): GTree;
        get asGraph(): GGraph;
        get asGroup(): GGroup;
        get asSlider(): GSlider;
        get asComboBox(): GComboBox;
        get asImage(): GImage;
        get asMovieClip(): GMovieClip;
        get text(): string;
        set text(value: string);
        get icon(): string;
        set icon(value: string);
        get treeNode(): GTreeNode;
        get isDisposed(): boolean;
        dispose(): void;
        onClick(thisObj: any, listener: (...args: any) => void, args?: any[]): void;
        offClick(thisObj: any, listener: (...args: any) => void): void;
        hasListener(type: string): boolean;
        on(type: string, listener: (...args: any) => void, thisObject: any, args?: any[]): void;
        off(type: string, listener: (...args: any) => void, thisObject: any): void;
        emit(type: string, ...args: any[]): void;
        get draggable(): boolean;
        set draggable(value: boolean);
        get dragBounds(): PIXI.Rectangle;
        set dragBounds(value: PIXI.Rectangle);
        startDrag(touchID?: number): void;
        stopDrag(): void;
        get dragging(): boolean;
        localToGlobal(ax?: number, ay?: number, result?: PIXI.Point, skipUpdate?: boolean): PIXI.Point;
        globalToLocal(ax?: number, ay?: number, result?: PIXI.Point, skipUpdate?: boolean): PIXI.Point;
        localToGlobalRect(ax?: number, ay?: number, aw?: number, ah?: number, result?: PIXI.Rectangle): PIXI.Rectangle;
        globalToLocalRect(ax?: number, ay?: number, aw?: number, ah?: number, result?: PIXI.Rectangle): PIXI.Rectangle;
        handleControllerChanged(c: Controller): void;
        protected createDisplayObject(): void;
        protected handleXYChanged(): void;
        protected handleSizeChanged(): void;
        protected handleScaleChanged(): void;
        protected handleGrayedChanged(): void;
        protected handleAlphaChanged(): void;
        handleVisibleChanged(): void;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        constructFromResource(): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
        private initDrag;
        private dragBegin;
        private dragEnd;
        private reset;
        private __begin;
        private __moving;
        private __end;
        static cast(sprite: PIXI.Container): GObject;
    }
    const BlendMode: {
        [key: number]: string;
    };
}
declare namespace fgui {
    class GComponent extends GObject {
        private _sortingChildCount;
        private _opaque;
        private _applyingController?;
        private _mask?;
        protected _margin: Margin;
        protected _trackBounds: boolean;
        protected _boundsChanged: boolean;
        protected _childrenRenderOrder: number;
        protected _apexIndex: number;
        _buildingDisplayList: boolean;
        _children: GObject[];
        _controllers: Controller[];
        _transitions: Transition[];
        _container: PIXI.Container;
        _scrollPane?: ScrollPane;
        _alignOffset: PIXI.Point;
        private _scrollRect;
        constructor();
        protected createDisplayObject(): void;
        dispose(): void;
        get displayListContainer(): PIXI.Container;
        addChild(child: GObject): GObject;
        addChildAt(child: GObject, index: number): GObject;
        private getInsertPosForSortingChild;
        removeChild(child: GObject, dispose?: boolean): GObject;
        removeChildAt(index: number, dispose?: boolean): GObject;
        removeChildren(beginIndex?: number, endIndex?: number, dispose?: boolean): void;
        getChildAt<T extends GObject>(index: number): T;
        getChild<T extends GObject>(name: string): T;
        getChildByPath<T extends GObject>(path: String): T;
        getVisibleChild(name: string): GObject;
        getChildInGroup(name: string, group: GGroup): GObject;
        getChildById(id: string): GObject;
        getChildIndex(child: GObject): number;
        setChildIndex(child: GObject, index: number): void;
        setChildIndexBefore(child: GObject, index: number): number;
        private _setChildIndex;
        swapChildren(child1: GObject, child2: GObject): void;
        swapChildrenAt(index1: number, index2: number): void;
        private get containerChildrenCount();
        get numChildren(): number;
        isAncestorOf(child: GObject): boolean;
        addController(controller: Controller): void;
        getControllerAt(index: number): Controller;
        getController(name: string): Controller;
        removeController(c: Controller): void;
        get controllers(): Controller[];
        childStateChanged(child: GObject): void;
        private buildNativeDisplayList;
        applyController(c: Controller): void;
        applyAllControllers(): void;
        adjustRadioGroupDepth(obj: GObject, c: Controller): void;
        getTransitionAt(index: number): Transition;
        getTransition(transName: string): Transition;
        isChildInView(child: GObject): boolean;
        getFirstChildInView(): number;
        get scrollPane(): ScrollPane;
        get opaque(): boolean;
        set opaque(value: boolean);
        get margin(): Margin;
        set margin(value: Margin);
        get childrenRenderOrder(): number;
        set childrenRenderOrder(value: number);
        get apexIndex(): number;
        set apexIndex(value: number);
        get mask(): PIXI.Container;
        set mask(value: PIXI.Container);
        /**
         * 设置遮罩
         * @param value
         * @param reversed
         * TODO:反向遮罩，遮罩点击测试区域hitArea
         */
        setMask(value: PIXI.Container, reversed: boolean): void;
        get baseUserData(): string;
        protected updateHitArea(): void;
        protected createScrollRect(): void;
        protected updateMask(): void;
        protected setupScroll(buffer: ByteBuffer): void;
        protected setupOverflow(overflow: number): void;
        protected handleSizeChanged(): void;
        protected handleGrayedChanged(): void;
        handleControllerChanged(c: Controller): void;
        setBoundsChangedFlag(): void;
        private __render;
        ensureBoundsCorrect(): void;
        protected updateBounds(): void;
        setBounds(ax: number, ay: number, aw: number, ah: number): void;
        get viewWidth(): number;
        set viewWidth(value: number);
        get viewHeight(): number;
        set viewHeight(value: number);
        getSnappingPosition(xValue: number, yValue: number, result?: PIXI.Point): PIXI.Point;
        /**
         * dir正数表示右移或者下移，负数表示左移或者上移
         */
        getSnappingPositionWithDir(xValue: number, yValue: number, xDir: number, yDir: number, result?: PIXI.Point): PIXI.Point;
        childSortingOrderChanged(child: GObject, oldValue: number, newValue: number): void;
        constructFromResource(): void;
        constructFromResource2(objectPool: GObject[], poolIndex: number): void;
        protected constructExtension(buffer: ByteBuffer): void;
        protected onConstruct(): void;
        protected constructFromXML(xml: Object): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
        private ___added;
        private ___removed;
    }
}
declare namespace fgui {
    class GButton extends GComponent {
        protected _titleObject: GObject;
        protected _iconObject: GObject;
        private _mode;
        private _selected;
        private _title;
        private _selectedTitle;
        private _icon;
        private _selectedIcon;
        private _sound;
        private _soundVolumeScale;
        private _buttonController;
        private _relatedController;
        private _relatedPageId;
        private _changeStateOnClick;
        private _linkedPopup?;
        private _downEffect;
        private _downEffectValue;
        private _downScaled?;
        private _down;
        private _over;
        static UP: string;
        static DOWN: string;
        static OVER: string;
        static SELECTED_OVER: string;
        static DISABLED: string;
        static SELECTED_DISABLED: string;
        constructor();
        get icon(): string;
        set icon(value: string);
        get selectedIcon(): string;
        set selectedIcon(value: string);
        get title(): string;
        set title(value: string);
        get text(): string;
        set text(value: string);
        get selectedTitle(): string;
        set selectedTitle(value: string);
        get titleColor(): string;
        set titleColor(value: string);
        get titleFontSize(): number;
        set titleFontSize(value: number);
        get sound(): string;
        set sound(val: string);
        get soundVolumeScale(): number;
        set soundVolumeScale(value: number);
        set selected(val: boolean);
        get selected(): boolean;
        get mode(): number;
        set mode(value: number);
        get relatedController(): Controller;
        set relatedController(val: Controller);
        get relatedPageId(): string;
        set relatedPageId(val: string);
        get changeStateOnClick(): boolean;
        set changeStateOnClick(value: boolean);
        get linkedPopup(): GObject;
        set linkedPopup(value: GObject);
        getTextField(): GTextField;
        fireClick(downEffect?: boolean): void;
        protected setState(val: string): void;
        protected handleSizeChanged(): void;
        protected updateHitArea(): void;
        handleControllerChanged(c: Controller): void;
        protected handleGrayedChanged(): void;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        protected constructExtension(buffer: ByteBuffer): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
        private __rollover;
        private __rollout;
        private __mousedown;
        private __mouseup;
        private __click;
    }
}
declare namespace fgui {
    class GComboBox extends GComponent {
        dropdown: GComponent;
        protected _titleObject: GObject;
        protected _iconObject: GObject;
        protected _list: GList;
        protected _items: string[];
        protected _icons?: string[];
        protected _values: string[];
        protected _popupDirection: PopupDirection;
        private _visibleItemCount;
        private _itemsUpdated;
        private _selectedIndex;
        private _buttonController;
        private _selectionController?;
        private _down;
        private _over;
        constructor();
        get text(): string;
        set text(value: string);
        get titleColor(): string;
        set titleColor(value: string);
        get titleFontSize(): number;
        set titleFontSize(value: number);
        get icon(): string;
        set icon(value: string);
        get visibleItemCount(): number;
        set visibleItemCount(value: number);
        get popupDirection(): number;
        set popupDirection(value: number);
        get items(): string[];
        set items(value: string[]);
        get icons(): string[];
        set icons(value: string[]);
        get values(): string[];
        set values(value: string[]);
        get selectedIndex(): number;
        set selectedIndex(val: number);
        get value(): string;
        set value(val: string);
        getTextField(): GTextField;
        protected setState(val: string): void;
        get selectionController(): Controller;
        set selectionController(value: Controller);
        handleControllerChanged(c: Controller): void;
        private updateSelectionController;
        dispose(): void;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        protected constructExtension(buffer: ByteBuffer): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
        protected showDropdown(): void;
        private __popupWinClosed;
        private __clickItem;
        private __clickItem2;
        private __rollover;
        private __rollout;
        private __mousedown;
        private __mouseup;
    }
}
declare namespace fgui {
    enum GGGraphType {
        Empty = 0,
        Rect = 1,
        Ellipse = 2,
        Polygon = 3,
        RegularPolygon = 4
    }
    class GGraph extends GObject {
        private _type;
        private _lineSize;
        private _lineColor;
        private _fillColor;
        private _cornerRadius?;
        private _sides?;
        private _startAngle?;
        private _polygonPoints?;
        private _distances?;
        graphics: PIXI.Graphics;
        constructor();
        get type(): GGGraphType;
        get polygonPoints(): number[];
        get fillColor(): string;
        set fillColor(v: string);
        get lineColor(): string;
        set lineColor(v: string);
        drawRect(lineSize: number, lineColor: string, fillColor: string, cornerRadius?: number[]): void;
        drawEllipse(lineSize: number, lineColor: string, fillColor: string): void;
        drawRegularPolygon(lineSize: number, lineColor: string, fillColor: string, sides: number, startAngle?: number, distances?: number[]): void;
        drawPolygon(lineSize: number, lineColor: string, fillColor: string, points: number[]): void;
        get distances(): number[];
        set distances(value: number[]);
        get color(): string;
        set color(value: string);
        private updateGraph;
        replaceMe(target: GObject): void;
        addBeforeMe(target: GObject): void;
        addAfterMe(target: GObject): void;
        setNativeObject(obj: PIXI.Container): void;
        protected createDisplayObject(): void;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        protected handleSizeChanged(): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GGroup extends GObject {
        private _layout;
        private _lineGap;
        private _columnGap;
        private _excludeInvisibles;
        private _autoSizeDisabled;
        private _mainGridIndex;
        private _mainGridMinSize;
        private _boundsChanged;
        private _percentReady;
        private _mainChildIndex;
        private _totalSize;
        private _numChildren;
        _updating: number;
        constructor();
        dispose(): void;
        get layout(): number;
        set layout(value: number);
        get lineGap(): number;
        set lineGap(value: number);
        get columnGap(): number;
        set columnGap(value: number);
        get excludeInvisibles(): boolean;
        set excludeInvisibles(value: boolean);
        get autoSizeDisabled(): boolean;
        set autoSizeDisabled(value: boolean);
        get mainGridMinSize(): number;
        set mainGridMinSize(value: number);
        get mainGridIndex(): number;
        set mainGridIndex(value: number);
        setBoundsChangedFlag(positionChangedOnly?: boolean): void;
        ensureSizeCorrect(): void;
        ensureBoundsCorrect(): void;
        private updateBounds;
        private handleLayout;
        moveChildren(dx: number, dy: number): void;
        resizeChildren(dw: number, dh: number): void;
        protected handleAlphaChanged(): void;
        handleVisibleChanged(): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GImage extends GObject {
        private _image;
        private _flip;
        private _contentItem;
        constructor();
        get image(): Image;
        get color(): string;
        set color(value: string);
        get flip(): number;
        set flip(value: number);
        private getScaleByFlip;
        protected handleScaleChanged(): void;
        get fillMethod(): number;
        get fillAmount(): number;
        set fillAmount(value: number);
        protected createDisplayObject(): void;
        constructFromResource(): void;
        protected handleXYChanged(): void;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GLabel extends GComponent {
        protected _titleObject: GObject;
        protected _iconObject: GObject;
        constructor();
        get icon(): string;
        set icon(value: string);
        get title(): string;
        set title(value: string);
        get text(): string;
        set text(value: string);
        get titleColor(): string;
        set titleColor(value: string);
        get titleFontSize(): number;
        set titleFontSize(value: number);
        get color(): string;
        set color(value: string);
        set editable(val: boolean);
        get editable(): boolean;
        getTextField(): GTextField;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        protected constructExtension(buffer: ByteBuffer): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GList extends GComponent {
        itemRenderer: (index: number, item: GObject) => void;
        itemProvider: (index: number) => string;
        scrollItemToViewOnClick: boolean;
        foldInvisibleItems: boolean;
        private _layout;
        private _lineCount;
        private _columnCount;
        private _lineGap;
        private _columnGap;
        private _defaultItem;
        private _autoResizeItem;
        private _selectionMode;
        private _align;
        private _verticalAlign;
        private _selectionController?;
        private _lastSelectedIndex;
        private _pool;
        private _virtual?;
        private _loop?;
        private _numItems;
        private _realNumItems;
        private _firstIndex;
        private _curLineItemCount;
        private _curLineItemCount2;
        private _itemSize?;
        private _virtualListChanged;
        private _virtualItems?;
        private _eventLocked?;
        private itemInfoVer;
        constructor();
        dispose(): void;
        get layout(): number;
        set layout(value: number);
        get lineCount(): number;
        set lineCount(value: number);
        get columnCount(): number;
        set columnCount(value: number);
        get lineGap(): number;
        set lineGap(value: number);
        get columnGap(): number;
        set columnGap(value: number);
        get align(): string;
        set align(value: string);
        get verticalAlign(): string;
        set verticalAlign(value: string);
        get virtualItemSize(): PIXI.Point;
        set virtualItemSize(value: PIXI.Point);
        get defaultItem(): string;
        set defaultItem(val: string);
        get autoResizeItem(): boolean;
        set autoResizeItem(value: boolean);
        get selectionMode(): number;
        set selectionMode(value: number);
        get selectionController(): Controller;
        set selectionController(value: Controller);
        get itemPool(): GObjectPool;
        getFromPool(url?: string): GObject;
        returnToPool(obj: GObject): void;
        addChildAt(child: GObject, index: number): GObject;
        addItem(url?: string): GObject;
        addItemFromPool(url?: string): GObject;
        removeChildAt(index: number, dispose?: boolean): GObject;
        removeChildToPoolAt(index: number): void;
        removeChildToPool(child: GObject): void;
        removeChildrenToPool(beginIndex?: number, endIndex?: number): void;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        getSelection(result?: number[]): number[];
        addSelection(index: number, scrollItToView?: boolean): void;
        removeSelection(index: number): void;
        clearSelection(): void;
        private clearSelectionExcept;
        selectAll(): void;
        selectNone(): void;
        selectReverse(): void;
        handleArrowKey(dir: number): void;
        private __clickItem;
        protected dispatchItemEvent(item: GObject, evt: PIXI.FederatedPointerEvent): void;
        private setSelectionOnEvent;
        resizeToFit(itemCount?: number, minSize?: number): void;
        getMaxItemWidth(): number;
        protected handleSizeChanged(): void;
        handleControllerChanged(c: Controller): void;
        private updateSelectionController;
        private shouldSnapToNext;
        getSnappingPositionWithDir(xValue: number, yValue: number, xDir: number, yDir: number, result?: PIXI.Point): PIXI.Point;
        scrollToView(index: number, ani?: boolean, setFirst?: boolean): void;
        getFirstChildInView(): number;
        childIndexToItemIndex(index: number): number;
        itemIndexToChildIndex(index: number): number;
        setVirtual(): void;
        /**
         * Set the list to be virtual list, and has loop behavior.
         */
        setVirtualAndLoop(): void;
        private _setVirtual;
        /**
         * Set the list item count.
         * If the list instanceof not virtual, specified number of items will be created.
         * If the list instanceof virtual, only items in view will be created.
         */
        get numItems(): number;
        set numItems(value: number);
        refreshVirtualList(): void;
        private checkVirtualList;
        private setVirtualListChangedFlag;
        private _refreshVirtualList;
        private __scrolled;
        private getIndexOnPos1;
        private getIndexOnPos2;
        private getIndexOnPos3;
        private handleScroll;
        private handleScroll1;
        private handleScroll2;
        private handleScroll3;
        private handleArchOrder1;
        private handleArchOrder2;
        private handleAlign;
        protected updateBounds(): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
        protected readItems(buffer: ByteBuffer): void;
        protected setupItem(buffer: ByteBuffer, obj: GObject): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GObjectPool {
        private _pool;
        private _count;
        constructor();
        clear(): void;
        get count(): number;
        getObject(url: string): GObject;
        returnObject(obj: GObject): void;
    }
}
declare namespace fgui {
    class GLoader extends GObject {
        private _url;
        private _align;
        private _valign;
        private _autoSize;
        private _fill;
        private _shrinkOnly;
        private _useResize;
        private _showErrorSign;
        private _contentItem;
        private _content;
        private _errorSign?;
        private _content2?;
        private _updatingLayout;
        private static _errorSignPool;
        constructor();
        protected createDisplayObject(): void;
        dispose(): void;
        get url(): string;
        set url(value: string);
        get icon(): string;
        set icon(value: string);
        get align(): string;
        set align(value: string);
        get verticalAlign(): string;
        set verticalAlign(value: string);
        get fill(): number;
        set fill(value: number);
        get shrinkOnly(): boolean;
        set shrinkOnly(value: boolean);
        get useResize(): boolean;
        set useResize(value: boolean);
        get autoSize(): boolean;
        set autoSize(value: boolean);
        get playing(): boolean;
        set playing(value: boolean);
        get frame(): number;
        set frame(value: number);
        get color(): string;
        set color(value: string);
        get fillMethod(): number;
        get fillAmount(): number;
        set fillAmount(value: number);
        get showErrorSign(): boolean;
        set showErrorSign(value: boolean);
        get content(): MovieClip;
        get component(): GComponent;
        protected loadContent(): void;
        protected loadFromPackage(itemURL: string): void;
        protected loadExternal(): void;
        protected freeExternal(texture: PIXI.Texture): void;
        protected onExternalLoadSuccess(texture: PIXI.Texture): void;
        protected onExternalLoadFailed(): void;
        private __getResCompleted;
        private setErrorState;
        private clearErrorState;
        updateLayout(): void;
        private clearContent;
        protected handleSizeChanged(): void;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GLoader3D extends GObject {
        private _url;
        private _align;
        private _verticalAlign;
        private _autoSize;
        private _fill;
        private _shrinkOnly;
        private _playing;
        private _frame;
        private _loop;
        private _animationName;
        private _skinName;
        private _color;
        private _contentItem;
        private _container;
        private _content;
        private _updatingLayout;
        constructor();
        protected createDisplayObject(): void;
        dispose(): void;
        get url(): string;
        set url(value: string);
        get icon(): string;
        set icon(value: string);
        get align(): AlignType;
        set align(value: AlignType);
        get verticalAlign(): VertAlignType;
        set verticalAlign(value: VertAlignType);
        get fill(): LoaderFillType;
        set fill(value: LoaderFillType);
        get shrinkOnly(): boolean;
        set shrinkOnly(value: boolean);
        get autoSize(): boolean;
        set autoSize(value: boolean);
        get playing(): boolean;
        set playing(value: boolean);
        get frame(): number;
        set frame(value: number);
        get animationName(): string;
        set animationName(value: string);
        get skinName(): string;
        set skinName(value: string);
        get loop(): boolean;
        set loop(value: boolean);
        get color(): string;
        set color(value: string);
        get content(): PIXI.Container;
        protected loadContent(): void;
        protected loadFromPackage(itemURL: string): void;
        private onLoaded;
        setSkeleton(skeleton: Skeleton | SpineSkeleton, anchor?: PIXI.Point): void;
        private onChange;
        protected loadExternal(): void;
        private updateLayout;
        private clearContent;
        protected handleSizeChanged(): void;
        protected handleGrayedChanged(): void;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GMovieClip extends GObject {
        private _movieClip;
        constructor();
        get color(): string;
        set color(value: string);
        protected createDisplayObject(): void;
        get playing(): boolean;
        set playing(value: boolean);
        get frame(): number;
        set frame(value: number);
        get timeScale(): number;
        set timeScale(value: number);
        rewind(): void;
        syncStatus(anotherMc: GMovieClip): void;
        advance(timeInMiniseconds: number): void;
        setPlaySettings(start?: number, end?: number, times?: number, endAt?: number, endHandler?: () => void): void;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        constructFromResource(): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GProgressBar extends GComponent {
        private _min;
        private _max;
        private _value;
        private _titleType;
        private _reverse;
        private _titleObject;
        private _aniObject;
        private _barObjectH;
        private _barObjectV;
        private _barMaxWidth;
        private _barMaxHeight;
        private _barMaxWidthDelta;
        private _barMaxHeightDelta;
        private _barStartX;
        private _barStartY;
        constructor();
        get titleType(): number;
        set titleType(value: number);
        get min(): number;
        set min(value: number);
        get max(): number;
        set max(value: number);
        get value(): number;
        set value(value: number);
        tweenValue(value: number, duration: number): GTweener;
        update(newValue: number): void;
        private setFillAmount;
        protected constructExtension(buffer: ByteBuffer): void;
        protected handleSizeChanged(): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GTextField extends GObject {
        protected _text: string;
        protected _autoSize: number;
        protected _widthAutoSize: boolean;
        protected _heightAutoSize: boolean;
        protected _color: string;
        protected _singleLine: boolean;
        protected _letterSpacing: number;
        private _ubbEnabled;
        private _strokeWidth;
        private _strokeColor;
        _displayObject: TextField;
        constructor();
        protected createDisplayObject(): void;
        get displayObject(): TextField;
        set text(value: string);
        get text(): string;
        get font(): string | string[];
        set font(value: string);
        get fontSize(): number;
        set fontSize(value: number);
        get color(): string;
        set color(value: string);
        get align(): string;
        set align(value: PIXI.TextStyleAlign);
        get valign(): string;
        set valign(value: string);
        get leading(): number;
        set leading(value: number);
        get letterSpacing(): number;
        set letterSpacing(value: number);
        get bold(): boolean;
        set bold(value: boolean);
        get italic(): boolean;
        set italic(value: boolean);
        get underline(): boolean;
        set underline(value: boolean);
        get singleLine(): boolean;
        set singleLine(value: boolean);
        private setStroke;
        set strokeColor(value: string);
        set ubbEnabled(value: boolean);
        get ubbEnabled(): boolean;
        get autoSize(): number;
        set autoSize(value: number);
        protected updateAutoSize(): void;
        get textWidth(): number;
        ensureSizeCorrect(): void;
        protected handleSizeChanged(): void;
        protected handleGrayedChanged(): void;
        getProp(index: number): any;
        setProp(index: number, value: any): void;
        setDropShadow(color: string, offsetX: number, offsetY: number, blur?: number): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GRichTextField extends GTextField {
        constructor();
    }
}
declare namespace fgui {
    class GRoot extends GComponent {
        static contentScaleLevel: number;
        private _modalLayer;
        private _popupStack;
        private _justClosedPopups;
        private _modalWaitPane;
        private _tooltipWin;
        private _defaultTooltipWin;
        private _checkPopups;
        app: PIXI.Application;
        stage: PIXI.Container;
        private static _inst;
        ScrollFrameRate: number;
        static get inst(): GRoot;
        constructor();
        launch(app: PIXI.Application): void;
        get mousePosition(): PIXI.Point;
        showWindow(win: Window): void;
        hideWindow(win: Window): void;
        hideWindowImmediately(win: Window): void;
        bringToFront(win: Window): void;
        showModalWait(msg?: string): void;
        closeModalWait(): void;
        closeAllExceptModals(): void;
        closeAllWindows(): void;
        getTopWindow(): Window;
        get modalLayer(): GGraph;
        get hasModalWindow(): boolean;
        get modalWaiting(): boolean;
        showPopup(popup: GObject, target?: GObject, dir?: PopupDirection | boolean): void;
        togglePopup(popup: GObject, target?: GObject, dir?: PopupDirection | boolean): void;
        hidePopup(popup?: GObject): void;
        get hasAnyPopup(): boolean;
        private closePopup;
        showTooltips(msg: string): void;
        showTooltipsWin(tooltipWin: GObject, position?: PIXI.Point): void;
        hideTooltips(): void;
        get focus(): GObject;
        set focus(value: GObject);
        private setFocus;
        get volumeScale(): number;
        set volumeScale(value: number);
        playOneShotSound(url: string, volumeScale?: number): void;
        private adjustModalLayer;
        private __addedToStage;
        checkPopups(clickTarget: PIXI.Container): void;
        private __stageMouseDown;
        private __stageMouseUp;
        private __winResize;
        private updateContentScaleLevel;
    }
}
declare namespace fgui {
    class GScrollBar extends GComponent {
        private _grip;
        private _arrowButton1;
        private _arrowButton2;
        private _bar;
        private _target;
        private _vertical;
        private _scrollPerc;
        private _fixedGripSize;
        private _dragOffset;
        private _gripDragging;
        constructor();
        setScrollPane(target: ScrollPane, vertical: boolean): void;
        setDisplayPerc(value: number): void;
        setScrollPerc(val: number): void;
        get minSize(): number;
        get gripDragging(): boolean;
        protected constructExtension(buffer: ByteBuffer): void;
        private __gripMouseDown;
        private __gripMouseMove;
        private __gripMouseUp;
        private __arrowButton1Click;
        private __arrowButton2Click;
        private __barMouseDown;
    }
}
declare namespace fgui {
    class GSlider extends GComponent {
        private _min;
        private _max;
        private _value;
        private _titleType;
        private _reverse;
        private _wholeNumbers;
        private _titleObject;
        private _barObjectH;
        private _barObjectV;
        private _barMaxWidth;
        private _barMaxHeight;
        private _barMaxWidthDelta;
        private _barMaxHeightDelta;
        private _gripObject;
        private _clickPos;
        private _clickPercent;
        private _barStartX;
        private _barStartY;
        changeOnClick: boolean;
        /**是否可拖动开关**/
        canDrag: boolean;
        constructor();
        get titleType(): number;
        set titleType(value: number);
        get wholeNumbers(): boolean;
        set wholeNumbers(value: boolean);
        get min(): number;
        set min(value: number);
        get max(): number;
        set max(value: number);
        get value(): number;
        set value(value: number);
        update(): void;
        private updateWithPercent;
        protected constructExtension(buffer: ByteBuffer): void;
        protected handleSizeChanged(): void;
        setup_afterAdd(buffer: ByteBuffer, beginPos: number): void;
        private __gripMouseDown;
        private __gripMouseMove;
        private __gripMouseUp;
        private __barMouseDown;
    }
}
declare namespace fgui {
    class GTextInput extends GTextField {
        _displayObject: Input;
        constructor();
        protected createDisplayObject(): void;
        get nativeInput(): Input;
        get password(): boolean;
        set password(value: boolean);
        get keyboardType(): string;
        set keyboardType(value: string);
        set editable(value: boolean);
        get editable(): boolean;
        set maxLength(value: number);
        get maxLength(): number;
        set promptText(value: string);
        get promptText(): string;
        set restrict(value: string);
        get restrict(): string;
        requestFocus(): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
    }
}
declare namespace fgui {
    class GTree extends GList {
        treeNodeRender: (node: GTreeNode, obj: GComponent) => void;
        treeNodeWillExpand: (node: GTreeNode, expanded: boolean) => void;
        private _indent;
        private _clickToExpand;
        private _rootNode;
        private _expandedStatusInEvt;
        constructor();
        get rootNode(): GTreeNode;
        get indent(): number;
        set indent(value: number);
        get clickToExpand(): number;
        set clickToExpand(value: number);
        getSelectedNode(): GTreeNode;
        getSelectedNodes(result?: Array<GTreeNode>): Array<GTreeNode>;
        selectNode(node: GTreeNode, scrollItToView?: boolean): void;
        unselectNode(node: GTreeNode): void;
        expandAll(folderNode?: GTreeNode): void;
        collapseAll(folderNode?: GTreeNode): void;
        private createCell;
        _afterInserted(node: GTreeNode): void;
        private getInsertIndexForNode;
        _afterRemoved(node: GTreeNode): void;
        _afterExpanded(node: GTreeNode): void;
        _afterCollapsed(node: GTreeNode): void;
        _afterMoved(node: GTreeNode): void;
        private getFolderEndIndex;
        private checkChildren;
        private hideFolderNode;
        private removeNode;
        private __cellMouseDown;
        private __expandedStateChanged;
        protected dispatchItemEvent(item: GObject, evt: PIXI.FederatedPointerEvent): void;
        setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void;
        protected readItems(buffer: ByteBuffer): void;
    }
}
declare namespace fgui {
    class GTreeNode {
        data: any;
        private _parent;
        private _children;
        private _expanded;
        private _level;
        private _tree;
        _cell: GComponent;
        _resURL?: string;
        constructor(hasChild: boolean, resURL?: string);
        set expanded(value: boolean);
        get expanded(): boolean;
        get isFolder(): boolean;
        get parent(): GTreeNode;
        get text(): string;
        set text(value: string);
        get icon(): string;
        set icon(value: string);
        get cell(): GComponent;
        get level(): number;
        _setLevel(value: number): void;
        addChild(child: GTreeNode): GTreeNode;
        addChildAt(child: GTreeNode, index: number): GTreeNode;
        removeChild(child: GTreeNode): GTreeNode;
        removeChildAt(index: number): GTreeNode;
        removeChildren(beginIndex?: number, endIndex?: number): void;
        getChildAt(index: number): GTreeNode;
        getChildIndex(child: GTreeNode): number;
        getPrevSibling(): GTreeNode;
        getNextSibling(): GTreeNode;
        setChildIndex(child: GTreeNode, index: number): void;
        swapChildren(child1: GTreeNode, child2: GTreeNode): void;
        swapChildrenAt(index1: number, index2: number): void;
        get numChildren(): number;
        expandToRoot(): void;
        get tree(): GTree;
        _setTree(value: GTree): void;
    }
}
declare namespace fgui {
    interface IUISource {
        fileName: string;
        loaded: boolean;
        load(callback: Function, thisObj: any): void;
    }
}
declare namespace fgui {
    class Margin {
        left: number;
        right: number;
        top: number;
        bottom: number;
        copy(source: Margin): void;
    }
}
declare namespace fgui {
    class PackageItem {
        owner: UIPackage;
        type: number;
        objectType?: number;
        id: string;
        name: string;
        width: number;
        height: number;
        file: string;
        decoded?: boolean;
        loading?: Array<Function>;
        rawData?: ByteBuffer;
        highResolution?: Array<string>;
        branches?: Array<string>;
        scale9Grid?: PIXI.Rectangle;
        scaleByTile?: boolean;
        tileGridIndice?: number;
        smoothing?: boolean;
        texture?: PIXI.Texture;
        pixelHitTestData?: PixelHitTestData;
        interval?: number;
        repeatDelay?: number;
        swing?: boolean;
        frames?: Frame[];
        extensionType?: any;
        bitmapFont?: PIXI.BitmapFont;
        templet?: Templet | SpineTemplet;
        skeletonAnchor?: PIXI.Point;
        constructor();
        load(): any;
        getBranch(): PackageItem;
        getHighResolution(): PackageItem;
        toString(): string;
    }
}
declare namespace fgui {
    class PopupMenu {
        protected _contentPane: GComponent;
        protected _list: GList;
        constructor(resourceURL?: string);
        dispose(): void;
        addItem(caption: string, handler?: () => void): GButton;
        addItemAt(caption: string, index: number, handler?: () => void): GButton;
        addSeperator(): void;
        getItemName(index: number): string;
        setItemText(name: string, caption: string): void;
        setItemVisible(name: string, visible: boolean): void;
        setItemGrayed(name: string, grayed: boolean): void;
        setItemCheckable(name: string, checkable: boolean): void;
        setItemChecked(name: string, checked: boolean): void;
        isItemChecked(name: string): boolean;
        removeItem(name: string): boolean;
        clearItems(): void;
        get itemCount(): number;
        get contentPane(): GComponent;
        get list(): GList;
        show(target?: GObject, dir?: PopupDirection | boolean): void;
        private __clickItem;
        private __clickItem2;
        private __addedToStage;
    }
}
declare namespace fgui {
    class RelationItem {
        private _owner;
        private _target;
        private _defs;
        private _targetX;
        private _targetY;
        private _targetWidth;
        private _targetHeight;
        private _targetInitX;
        private _targetInitY;
        constructor(owner: GObject);
        get owner(): GObject;
        set target(value: GObject);
        get target(): GObject;
        add(relationType: number, usePercent: boolean): void;
        internalAdd(relationType: number, usePercent: boolean): void;
        remove(relationType: number): void;
        copyFrom(source: RelationItem): void;
        dispose(): void;
        get isEmpty(): boolean;
        applyOnSelfResized(dWidth: number, dHeight: number, applyPivot: boolean): void;
        private applyOnXYChanged;
        private applyOnSizeChanged;
        private addRefTarget;
        private releaseRefTarget;
        private __targetXYChanged;
        private __targetSizeChanged;
    }
}
declare namespace fgui {
    class Relations {
        private _owner;
        private _items;
        handling: GObject;
        constructor(owner: GObject);
        add(target: GObject, relationType: number, usePercent?: boolean): void;
        remove(target: GObject, relationType?: number): void;
        contains(target: GObject): boolean;
        clearFor(target: GObject): void;
        clearAll(): void;
        copyFrom(source: Relations): void;
        dispose(): void;
        onOwnerSizeChanged(dWidth: number, dHeight: number, applyPivot: boolean): void;
        ensureRelationsSizeCorrect(): void;
        get empty(): boolean;
        setup(buffer: ByteBuffer, parentToChild: boolean): void;
    }
}
declare namespace fgui {
    class ScrollPane {
        private _owner;
        private _container;
        private _maskContainer;
        private _scrollRect;
        private _alignContainer?;
        private _scrollType;
        private _scrollStep;
        private _mouseWheelStep;
        private _decelerationRate;
        private _scrollBarMargin;
        private _bouncebackEffect;
        private _touchEffect;
        private _scrollBarDisplayAuto?;
        private _vScrollNone;
        private _hScrollNone;
        private _needRefresh;
        private _refreshBarAxis;
        private _displayOnLeft?;
        private _snapToItem?;
        _displayInDemand?: boolean;
        private _mouseWheelEnabled?;
        private _pageMode?;
        private _inertiaDisabled?;
        private _floating?;
        private _dontClipMargin?;
        private _xPos;
        private _yPos;
        private _viewSize;
        private _contentSize;
        private _overlapSize;
        private _pageSize;
        private _containerPos;
        private _beginTouchPos;
        private _lastTouchPos;
        private _lastTouchGlobalPos;
        private _velocity;
        private _velocityScale;
        private _lastMoveTime;
        private _isHoldAreaDone;
        private _aniFlag;
        _loop: number;
        private _headerLockedSize;
        private _footerLockedSize;
        private _refreshEventDispatching;
        private _dragged;
        private _tweening;
        private _tweenTime;
        private _tweenDuration;
        private _tweenStart;
        private _tweenChange;
        private _pageController?;
        private _hzScrollBar?;
        private _vtScrollBar?;
        private _header?;
        private _footer?;
        static draggingPane: ScrollPane;
        constructor(owner: GComponent);
        setup(buffer: ByteBuffer): void;
        dispose(): void;
        get owner(): GComponent;
        get hzScrollBar(): GScrollBar;
        get vtScrollBar(): GScrollBar;
        get header(): GComponent;
        get footer(): GComponent;
        get bouncebackEffect(): boolean;
        set bouncebackEffect(sc: boolean);
        get touchEffect(): boolean;
        set touchEffect(sc: boolean);
        set scrollStep(val: number);
        get scrollStep(): number;
        get snapToItem(): boolean;
        set snapToItem(value: boolean);
        get mouseWheelEnabled(): boolean;
        set mouseWheelEnabled(value: boolean);
        get decelerationRate(): number;
        set decelerationRate(value: number);
        get isDragged(): boolean;
        get percX(): number;
        set percX(value: number);
        setPercX(value: number, ani?: boolean): void;
        get percY(): number;
        set percY(value: number);
        setPercY(value: number, ani?: boolean): void;
        get posX(): number;
        set posX(value: number);
        setPosX(value: number, ani?: boolean): void;
        get posY(): number;
        set posY(value: number);
        setPosY(value: number, ani?: boolean): void;
        get contentWidth(): number;
        get contentHeight(): number;
        get viewWidth(): number;
        set viewWidth(value: number);
        get viewHeight(): number;
        set viewHeight(value: number);
        get currentPageX(): number;
        set currentPageX(value: number);
        get currentPageY(): number;
        set currentPageY(value: number);
        setCurrentPageX(value: number, ani?: boolean): void;
        setCurrentPageY(value: number, ani?: boolean): void;
        get isBottomMost(): boolean;
        get isRightMost(): boolean;
        get pageController(): Controller;
        set pageController(value: Controller);
        get scrollingPosX(): number;
        get scrollingPosY(): number;
        scrollTop(ani?: boolean): void;
        scrollBottom(ani?: boolean): void;
        scrollUp(ratio?: number, ani?: boolean): void;
        scrollDown(ratio?: number, ani?: boolean): void;
        scrollLeft(ratio?: number, ani?: boolean): void;
        scrollRight(ratio?: number, ani?: boolean): void;
        scrollToView(target: PIXI.Rectangle | GObject, ani?: boolean, setFirst?: boolean): void;
        isChildInView(obj: GObject): boolean;
        cancelDragging(): void;
        lockHeader(size: number): void;
        lockFooter(size: number): void;
        onOwnerSizeChanged(): void;
        handleControllerChanged(c: Controller): void;
        private updatePageController;
        adjustMaskContainer(): void;
        setSize(aWidth: number, aHeight: number): void;
        setContentSize(aWidth: number, aHeight: number): void;
        changeContentSizeOnScrolling(deltaWidth: number, deltaHeight: number, deltaPosX: number, deltaPosY: number): void;
        private handleSizeChanged;
        private posChanged;
        private refresh;
        private refresh2;
        private __mouseDown;
        private __mouseMove;
        private __mouseUp;
        private __click;
        private __mouseWheel;
        private updateScrollBarPos;
        updateScrollBarVisible(): void;
        private updateScrollBarVisible2;
        private __barTweenComplete;
        private getLoopPartSize;
        private loopCheckingCurrent;
        private loopCheckingTarget;
        private loopCheckingTarget2;
        private loopCheckingNewPos;
        private alignPosition;
        private alignByPage;
        private updateTargetAndDuration;
        private updateTargetAndDuration2;
        private fixDuration;
        private startTween;
        private killTween;
        private checkRefreshBar;
        private tweenUpdate;
        private runTween;
    }
}
declare namespace fgui {
    class Transition {
        name: string;
        private _owner;
        private _ownerBaseX;
        private _ownerBaseY;
        private _items;
        private _totalTimes;
        private _totalTasks;
        private _playing;
        private _paused;
        private _onComplete;
        private _options;
        private _reversed;
        private _totalDuration;
        private _autoPlay;
        private _autoPlayTimes;
        private _autoPlayDelay;
        private _timeScale;
        private _startTime;
        private _endTime;
        constructor(owner: GComponent);
        play(onComplete?: () => void, times?: number, delay?: number, startTime?: number, endTime?: number): void;
        playReverse(onComplete?: () => void, times?: number, delay?: number, startTime?: number, endTime?: number): void;
        changePlayTimes(value: number): void;
        setAutoPlay(value: boolean, times?: number, delay?: number): void;
        private _play;
        stop(setToComplete?: boolean, processCallback?: boolean): void;
        private stopItem;
        setPaused(paused: boolean): void;
        dispose(): void;
        get playing(): boolean;
        get totalDuration(): number;
        setValue(label: string, ...args: any[]): void;
        setHook(label: string, callback: () => void): void;
        clearHooks(): void;
        setTarget(label: string, newTarget: GObject): void;
        setDuration(label: string, value: number): void;
        getLabelTime(label: string): number;
        get timeScale(): number;
        set timeScale(value: number);
        updateFromRelations(targetId: string, dx: number, dy: number): void;
        onOwnerAddedToStage(): void;
        onOwnerRemovedFromStage(): void;
        private onDelayedPlay;
        private internalPlay;
        private playItem;
        private skipAnimations;
        private onDelayedPlayItem;
        private onTweenStart;
        private onTweenUpdate;
        private onTweenComplete;
        private onPlayTransCompleted;
        private callHook;
        private checkAllComplete;
        private applyValue;
        setup(buffer: ByteBuffer): void;
        private decodeValue;
    }
}
declare namespace fgui {
    class TranslationHelper {
        static strings: Record<string, Record<string, string>>;
        constructor();
        static translateComponent(item: PackageItem): void;
    }
}
declare namespace fgui {
    class UIConfig {
        constructor();
        static get defaultFont(): string;
        static set defaultFont(value: string);
        static windowModalWaiting: string;
        static globalModalWaiting: string;
        static modalLayerColor: string;
        static buttonSound: string;
        static buttonSoundVolumeScale: number;
        static horizontalScrollBar: string;
        static verticalScrollBar: string;
        static defaultScrollStep: number;
        static defaultScrollDecelerationRate: number;
        static defaultScrollBarDisplay: number;
        static defaultScrollTouchEffect: boolean;
        static defaultScrollBounceEffect: boolean;
        /**
          * 当滚动容器设置为“贴近ITEM”时，判定贴近到哪一个ITEM的滚动距离阀值。
          */
        static defaultScrollSnappingThreshold: number;
        /**
          * 当滚动容器设置为“页面模式”时，判定翻到哪一页的滚动距离阀值。
          */
        static defaultScrollPagingThreshold: number;
        static popupMenu: string;
        static popupMenu_seperator: string;
        static loaderErrorSign: string;
        static tooltipsWin: string;
        static defaultComboBoxVisibleItemCount: number;
        static touchScrollSensitivity: number;
        static touchDragSensitivity: number;
        static clickDragSensitivity: number;
        static bringWindowToFrontOnClick: boolean;
        static frameTimeForAsyncUIConstruction: number;
        static textureLinearSampling: boolean;
        static packageFileExtension: string;
        static useLayaSkeleton: boolean;
    }
}
declare namespace fgui {
    class UIObjectFactory {
        static extensions: Record<string, new () => GComponent>;
        static loaderType: new () => GLoader;
        constructor();
        static setExtension(url: string, type: new () => GComponent): void;
        static setPackageItemExtension(url: string, type: new () => GComponent): void;
        static setLoaderExtension(type: new () => GLoader): void;
        static resolvePackageItemExtension(pi: PackageItem): void;
        static newObject(type: number | PackageItem, userClass?: new () => GObject): GObject;
    }
}
declare namespace fgui {
    class UIPackage {
        private _id;
        private _name;
        private _items;
        private _itemsById;
        private _itemsByName;
        private _resKey;
        private _customId;
        private _sprites;
        private _dependencies;
        private _branches;
        _branchIndex: number;
        static _constructing: number;
        private static _instById;
        private static _instByName;
        private static _branch;
        private static _vars;
        constructor();
        static get branch(): string;
        static set branch(value: string);
        static getVar(key: string): string;
        static setVar(key: string, value: string): void;
        static getById(id: string): UIPackage;
        static getByName(name: string): UIPackage;
        static addPackage(resKey: string, descData?: ArrayBuffer): UIPackage;
        /**
         * @param resKey resKey 或 [resKey1,resKey2,resKey3....]
         */
        static loadPackage(resKey: string | Array<string>, completeHandler: (pkgs: UIPackage[]) => void, progressHandler?: (progress: number) => void): void;
        static removePackage(packageIdOrName: string): void;
        static createObject(pkgName: string, resName: string, userClass?: new () => GObject): GObject;
        static createObjectFromURL(url: string, userClass?: new () => GObject): GObject;
        static getItemURL(pkgName: string, resName: string): string;
        static getItemByURL(url: string): PackageItem;
        static getItemAssetByURL(url: string): any;
        static normalizeURL(url: string): string;
        private loadPackage;
        loadAllAssets(): void;
        unloadAssets(): void;
        dispose(): void;
        get id(): string;
        get name(): string;
        get items(): PackageItem[];
        get customId(): string;
        set customId(value: string);
        createObject(resName: string, userClass?: new () => GObject): GObject;
        internalCreateObject(item: PackageItem, userClass?: new () => GObject): GObject;
        getItems(): ReadonlyArray<PackageItem>;
        getItemById(itemId: string): PackageItem;
        getItemByName(resName: string): PackageItem;
        getItemAssetByName(resName: string): any;
        getItemAsset(item: PackageItem): any;
        getItemAssetAsync(item: PackageItem, onComplete?: (err: any, item: PackageItem) => void): void;
        private loadMovieClip;
        private loadFont;
        createSubTexture(cacheId: string, mainTexture: PIXI.Texture, frame: PIXI.Rectangle, orig?: PIXI.Rectangle, offsetX?: number, offsetY?: number, rotate?: number): PIXI.Texture;
    }
}
declare namespace fgui {
    class Window extends GComponent {
        private _contentPane;
        private _modalWaitPane;
        private _closeButton;
        private _dragArea;
        private _contentArea;
        private _frame;
        private _modal;
        private _uiSources?;
        private _inited?;
        private _loading?;
        protected _requestingCmd: number;
        bringToFontOnClick: boolean;
        constructor();
        addUISource(source: IUISource): void;
        set contentPane(val: GComponent);
        get contentPane(): GComponent;
        get frame(): GComponent;
        get closeButton(): GObject;
        set closeButton(value: GObject);
        get dragArea(): GObject;
        set dragArea(value: GObject);
        get contentArea(): GObject;
        set contentArea(value: GObject);
        show(): void;
        showOn(root: GRoot): void;
        hide(): void;
        hideImmediately(): void;
        centerOn(r: GRoot, restraint?: boolean): void;
        toggleStatus(): void;
        get isShowing(): boolean;
        get isTop(): boolean;
        get modal(): boolean;
        set modal(val: boolean);
        bringToFront(): void;
        showModalWait(requestingCmd?: number): void;
        protected layoutModalWaitPane(): void;
        closeModalWait(requestingCmd?: number): boolean;
        get modalWaiting(): boolean;
        init(): void;
        protected onInit(): void;
        protected onShown(): void;
        protected onHide(): void;
        protected doShowAnimation(): void;
        protected doHideAnimation(): void;
        private __uiLoadComplete;
        private _init;
        dispose(): void;
        protected closeEventHandler(): void;
        private __onShown;
        private __onHidden;
        private __mouseDown;
        private __dragStart;
    }
}
declare namespace fgui {
    class ControllerAction {
        fromPage: string[];
        toPage: string[];
        static createAction(type: number): ControllerAction;
        constructor();
        run(controller: Controller, prevPage: string, curPage: string): void;
        protected enter(controller: Controller): void;
        protected leave(controller: Controller): void;
        setup(buffer: ByteBuffer): void;
    }
}
declare namespace fgui {
    class ChangePageAction extends ControllerAction {
        objectId: string;
        controllerName: string;
        targetPage: string;
        constructor();
        protected enter(controller: Controller): void;
        setup(buffer: ByteBuffer): void;
    }
}
declare namespace fgui {
    class PlayTransitionAction extends ControllerAction {
        transitionName: string;
        playTimes: number;
        delay: number;
        stopOnExit: boolean;
        private _currentTransition?;
        constructor();
        protected enter(controller: Controller): void;
        protected leave(controller: Controller): void;
        setup(buffer: ByteBuffer): void;
    }
}
declare namespace fgui {
    function fillImage(w: number, h: number, method: number, origin: number, clockwise: boolean, amount: number): number[];
}
declare namespace fgui {
    interface FillMaskOption {
        fillMethod?: number;
        fillAmount?: number;
        fillOrigin?: number;
        fillClockwise?: boolean;
    }
    interface FillTextureOption {
        texture?: PIXI.Texture;
        scale9Grid?: PIXI.Rectangle;
        scaleByTile?: boolean;
        tileGridIndice?: number;
        color?: string;
        tileScale?: {
            x: number;
            y: number;
        };
    }
    export class Image extends PIXI.Container {
        protected _source: PIXI.Texture;
        protected _scaleByTile?: boolean;
        protected _scale9Grid?: PIXI.Rectangle;
        protected _tileScale?: {
            x: number;
            y: number;
        };
        private _tileGridIndice;
        private _color;
        private _fillMethod;
        private _fillOrigin;
        private _fillAmount;
        private _fillClockwise?;
        private _width;
        private _height;
        private _view;
        constructor();
        set width(value: number);
        set height(value: number);
        setSize(value: number | PIXI.Optional<PIXI.Size, "height">, height?: number): void;
        get scaleByTile(): boolean;
        get color(): string;
        set color(value: string);
        get fillMethod(): number;
        get fillAmount(): number;
        set fillAmount(value: number);
        get texture(): PIXI.Texture;
        set texture(value: PIXI.Texture);
        set imgOption(options: FillTextureOption);
        set maskOption(options: FillMaskOption);
        private fillMask;
        private fillTexture;
    }
    export {};
}
declare namespace fgui {
    class TextField extends PIXI.Container {
        private _textView;
        private _halign;
        private _valign;
        private _width;
        private _height;
        constructor();
        get style(): PIXI.TextStyle;
        get view(): PIXI.Text;
        set text(value: string);
        get text(): string;
        get align(): string;
        set align(value: PIXI.TextStyleAlign);
        get valign(): string;
        set valign(value: string);
        setSize(value: number | PIXI.Optional<PIXI.Size, "height">, height?: number): void;
        private updateTextAlign;
    }
}
declare namespace fgui {
    class Input extends TextField {
        static TYPE_TEXT: string;
        /**
         * @en Password type for password input fields.
         * @zh password 类型用于密码域输入。
         */
        static TYPE_PASSWORD: string;
        /**
         * @en Email type for input fields that should contain an e-mail address.
         * @zh email 类型用于应该包含 e-mail 地址的输入域。
         */
        static TYPE_EMAIL: string;
        /**
         * @en URL type for input fields that should contain a URL address.
         * @zh url 类型用于应该包含 URL 地址的输入域。
         */
        static TYPE_URL: string;
        /**
         * @en Number type for input fields that should contain a numeric value.
         * @zh number 类型用于应该包含数值的输入域。
         */
        static TYPE_NUMBER: string;
        /**
         * @en Range type for input fields that should contain a numeric value within a certain range.
         * The range type is displayed as a slider.
         * You can also set limitations on the accepted numbers.
         * @zh range 类型用于应该包含一定范围内数字值的输入域。
         * range 类型显示为滑动条。
         * 您还能够设定对所接受的数字的限定。
         */
        static TYPE_RANGE: string;
        /**
         * @en Select day, month, and year.
         * @zh 选取日、月、年。
         */
        static TYPE_DATE: string;
        /**
         * @en Select month and year.
         * @zh month - 选取月、年。
         */
        static TYPE_MONTH: string;
        /**
         * @en Select week and year.
         * @zh week - 选取周和年。
         */
        static TYPE_WEEK: string;
        /**
         * @en Select time (hours and minutes).
         * @zh time - 选取时间（小时和分钟）。
         */
        static TYPE_TIME: string;
        /**
         * @en Select time, day, month, year (UTC time).
         * @zh datetime - 选取时间、日、月、年（UTC 时间）。
         */
        static TYPE_DATE_TIME: string;
        /**
         * @en Select time, day, month, year (local time).
         * @zh datetime-local - 选取时间、日、月、年（本地时间）。
         */
        static TYPE_DATE_TIME_LOCAL: string;
        /**
         * @en Search type for search fields, such as site search or Google search.
         * The search field is displayed as a regular text field.
         * @zh search 类型用于搜索域，比如站点搜索或 Google 搜索。
         * search 域显示为常规的文本域。
         */
        static TYPE_SEARCH: string;
        type: string;
        editable: boolean;
        maxChars: number;
        prompt: string;
        restrict: string;
        focus: boolean;
        promptColor: string;
    }
}
declare namespace fgui {
    interface Frame {
        addDelay: number;
        texture?: PIXI.Texture;
    }
    class MovieClip extends Image {
        interval: number;
        swing: boolean;
        repeatDelay: number;
        timeScale: number;
        private _playing;
        private _frameCount;
        private _frames;
        private _frame;
        private _start;
        private _end;
        private _times;
        private _endAt;
        private _status;
        private _endHandler?;
        private _frameElapsed;
        private _reversed;
        private _repeatedCount;
        constructor();
        get frames(): Frame[];
        set frames(value: Frame[]);
        get frameCount(): number;
        get frame(): number;
        set frame(value: number);
        get playing(): boolean;
        set playing(value: boolean);
        rewind(): void;
        syncStatus(anotherMc: MovieClip): void;
        advance(timeInMiniseconds: number): void;
        setPlaySettings(start?: number, end?: number, times?: number, endAt?: number, endHandler?: () => void): void;
        private update;
        private drawFrame;
        private checkTimer;
        private __addToStage;
        private __removeFromStage;
    }
}
declare namespace fgui {
    class ScrollRectComp {
        private _rect;
        private _mask;
        get rect(): PIXI.Rectangle;
        clip(target: PIXI.Container, value: PIXI.Rectangle): void;
    }
}
declare namespace fgui {
    class BMGlyph {
        x: number;
        y: number;
        offsetX: number;
        offsetY: number;
        width: number;
        height: number;
        advance: number;
        lineHeight: number;
        channel: number;
        texture: PIXI.Texture;
    }
}
declare namespace fgui {
    const loadBytes: {
        extension: {
            type: PIXI.ExtensionType.LoadParser;
            priority: PIXI.LoaderParserPriority;
            name: string;
        };
        name: string;
        test(url: string): boolean;
        load<T>(url: string): Promise<ArrayBuffer>;
        unload(buff: ArrayBuffer | ArrayBuffer[]): void;
    };
}
declare namespace fgui {
    class Skeleton extends PIXI.Container {
        play(nameOrIndex: any, loop: boolean, force?: boolean, start?: number, end?: number, freshSkin?: boolean, playAudio?: boolean): void;
        stop(): void;
        showSkinByName(name: string): void;
        showSkinByIndex(idx: number): void;
    }
}
declare namespace fgui {
    class SpineSkeleton extends PIXI.Container {
        templet: SpineTemplet;
        play(nameOrIndex: any, loop: boolean, force?: boolean, start?: number, end?: number, freshSkin?: boolean, playAudio?: boolean): void;
        stop(): void;
        showSkinByName(name: string): void;
        showSkinByIndex(idx: number): void;
    }
}
declare namespace fgui {
    class SpineTemplet extends PIXI.EventEmitter {
        destroy(): void;
    }
}
declare namespace fgui {
    class Templet extends PIXI.EventEmitter {
        buildArmature(idx: number): Skeleton;
        destroy(): void;
    }
}
declare namespace fgui {
    class GearBase {
        static disableAllTweenEffect: boolean;
        protected _owner: GObject;
        protected _controller: Controller;
        protected _tweenConfig?: GearTweenConfig;
        constructor(owner: GObject);
        dispose(): void;
        get controller(): Controller;
        set controller(val: Controller);
        get tweenConfig(): GearTweenConfig;
        setup(buffer: ByteBuffer): void;
        updateFromRelations(dx: number, dy: number): void;
        protected addStatus(pageId: string, buffer: ByteBuffer): void;
        protected init(): void;
        apply(): void;
        updateState(): void;
    }
    class GearTweenConfig {
        tween: boolean;
        easeType: number;
        duration: number;
        delay: number;
        _displayLockToken: number;
        _tweener: GTweener;
        constructor();
    }
}
declare namespace fgui {
    class GearAnimation extends GearBase {
        private _storage;
        private _default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, buffer: ByteBuffer): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearColor extends GearBase {
        private _storage;
        private _default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, buffer: ByteBuffer): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearDisplay extends GearBase {
        pages: string[];
        private _visible;
        private _displayLockToken;
        constructor(owner: GObject);
        protected init(): void;
        apply(): void;
        addLock(): number;
        releaseLock(token: number): void;
        get connected(): boolean;
    }
}
declare namespace fgui {
    class GearDisplay2 extends GearBase {
        pages: string[];
        condition: number;
        private _visible;
        constructor(owner: GObject);
        protected init(): void;
        apply(): void;
        evaluate(connected: boolean): boolean;
    }
}
declare namespace fgui {
    function createGear(owner: GObject, index: number): GearBase;
}
declare namespace fgui {
    class GearFontSize extends GearBase {
        private _storage;
        private _default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, buffer: ByteBuffer): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearIcon extends GearBase {
        private _storage;
        private _default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, buffer: ByteBuffer): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearLook extends GearBase {
        private _storage;
        private _default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, buffer: ByteBuffer): void;
        apply(): void;
        private __tweenUpdate;
        private __tweenComplete;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearSize extends GearBase {
        private _storage;
        private _default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, buffer: ByteBuffer): void;
        apply(): void;
        private __tweenUpdate;
        private __tweenComplete;
        updateState(): void;
        updateFromRelations(dx: number, dy: number): void;
    }
}
declare namespace fgui {
    class GearText extends GearBase {
        private _storage;
        private _default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, buffer: ByteBuffer): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearXY extends GearBase {
        positionsInPercent: boolean;
        private _storage;
        private _default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, buffer: ByteBuffer): void;
        addExtStatus(pageId: string, buffer: ByteBuffer): void;
        apply(): void;
        private __tweenUpdate;
        private __tweenComplete;
        updateState(): void;
        updateFromRelations(dx: number, dy: number): void;
    }
}
declare namespace fgui {
    function evaluateEase(easeType: number, time: number, duration: number, overshootOrAmplitude: number, period: number): number;
}
declare namespace fgui {
    class EaseType {
        static Linear: number;
        static SineIn: number;
        static SineOut: number;
        static SineInOut: number;
        static QuadIn: number;
        static QuadOut: number;
        static QuadInOut: number;
        static CubicIn: number;
        static CubicOut: number;
        static CubicInOut: number;
        static QuartIn: number;
        static QuartOut: number;
        static QuartInOut: number;
        static QuintIn: number;
        static QuintOut: number;
        static QuintInOut: number;
        static ExpoIn: number;
        static ExpoOut: number;
        static ExpoInOut: number;
        static CircIn: number;
        static CircOut: number;
        static CircInOut: number;
        static ElasticIn: number;
        static ElasticOut: number;
        static ElasticInOut: number;
        static BackIn: number;
        static BackOut: number;
        static BackInOut: number;
        static BounceIn: number;
        static BounceOut: number;
        static BounceInOut: number;
        static Custom: number;
    }
}
declare namespace fgui {
    class GPath {
        private _segments;
        private _points;
        private _fullLength;
        constructor();
        get length(): number;
        create(pt1: Array<GPathPoint> | GPathPoint, pt2?: GPathPoint, pt3?: GPathPoint, pt4?: GPathPoint): void;
        private createSplineSegment;
        clear(): void;
        getPointAt(t: number, result?: PIXI.Point): PIXI.Point;
        get segmentCount(): number;
        getAnchorsInSegment(segmentIndex: number, points?: Array<PIXI.Point>): Array<PIXI.Point>;
        getPointsInSegment(segmentIndex: number, t0: number, t1: number, points?: Array<PIXI.Point>, ts?: Array<number>, pointDensity?: number): Array<PIXI.Point>;
        getAllPoints(points?: Array<PIXI.Point>, ts?: Array<number>, pointDensity?: number): Array<PIXI.Point>;
        private onCRSplineCurve;
        private onBezierCurve;
    }
}
declare namespace fgui {
    enum CurveType {
        CRSpline = 0,
        Bezier = 1,
        CubicBezier = 2,
        Straight = 3
    }
    class GPathPoint {
        x: number;
        y: number;
        control1_x: number;
        control1_y: number;
        control2_x: number;
        control2_y: number;
        curveType: number;
        constructor();
        static newPoint(x?: number, y?: number, curveType?: number): GPathPoint;
        static newBezierPoint(x?: number, y?: number, control1_x?: number, control1_y?: number): GPathPoint;
        static newCubicBezierPoint(x?: number, y?: number, control1_x?: number, control1_y?: number, control2_x?: number, control2_y?: number): GPathPoint;
        clone(): GPathPoint;
    }
}
declare namespace fgui {
    class GTween {
        static catchCallbackExceptions: boolean;
        static to(start: number, end: number, duration: number): GTweener;
        static to2(start: number, start2: number, end: number, end2: number, duration: number): GTweener;
        static to3(start: number, start2: number, start3: number, end: number, end2: number, end3: number, duration: number): GTweener;
        static to4(start: number, start2: number, start3: number, start4: number, end: number, end2: number, end3: number, end4: number, duration: number): GTweener;
        static toColor(start: number, end: number, duration: number): GTweener;
        static delayedCall(delay: number): GTweener;
        static shake(startX: number, startY: number, amplitude: number, duration: number): GTweener;
        static isTweening(target: any, propType?: any): Boolean;
        static kill(target: any, complete?: boolean, propType?: any): void;
        static getTween(target: any, propType?: any): GTweener;
    }
}
declare namespace fgui {
    class GTweener {
        _target: any;
        _propType: any;
        _killed: boolean;
        _paused: boolean;
        private _delay;
        private _duration;
        private _breakpoint;
        private _easeType;
        private _easeOvershootOrAmplitude;
        private _easePeriod;
        private _repeat;
        private _yoyo;
        private _timeScale;
        private _snapping;
        private _userData;
        private _path;
        private _onUpdate;
        private _onStart;
        private _onComplete;
        private _onUpdateCaller;
        private _onStartCaller;
        private _onCompleteCaller;
        private _startValue;
        private _endValue;
        private _value;
        private _deltaValue;
        private _valueSize;
        private _started;
        private _ended;
        private _elapsedTime;
        private _normalizedTime;
        constructor();
        setDelay(value: number): GTweener;
        get delay(): number;
        setDuration(value: number): GTweener;
        get duration(): number;
        setBreakpoint(value: number): GTweener;
        setEase(value: number): GTweener;
        setEasePeriod(value: number): GTweener;
        setEaseOvershootOrAmplitude(value: number): GTweener;
        setRepeat(repeat: number, yoyo?: boolean): GTweener;
        get repeat(): number;
        setTimeScale(value: number): GTweener;
        setSnapping(value: boolean): GTweener;
        setTarget(value: any, propType?: any): GTweener;
        get target(): any;
        setPath(value: GPath): GTweener;
        setUserData(value: any): GTweener;
        get userData(): any;
        onUpdate(callback: Function, caller?: any): GTweener;
        onStart(callback: Function, caller?: any): GTweener;
        onComplete(callback: Function, caller?: any): GTweener;
        get startValue(): TweenValue;
        get endValue(): TweenValue;
        get value(): TweenValue;
        get deltaValue(): TweenValue;
        get normalizedTime(): number;
        get completed(): boolean;
        get allCompleted(): boolean;
        setPaused(paused: boolean): GTweener;
        /**
         * seek position of the tween, in seconds.
         */
        seek(time: number): void;
        kill(complete?: boolean): void;
        _to(start: number, end: number, duration: number): GTweener;
        _to2(start: number, start2: number, end: number, end2: number, duration: number): GTweener;
        _to3(start: number, start2: number, start3: number, end: number, end2: number, end3: number, duration: number): GTweener;
        _to4(start: number, start2: number, start3: number, start4: number, end: number, end2: number, end3: number, end4: number, duration: number): GTweener;
        _toColor(start: number, end: number, duration: number): GTweener;
        _shake(startX: number, startY: number, amplitude: number, duration: number): GTweener;
        _init(): void;
        _reset(): void;
        _update(dt: number): void;
        private update;
        private callStartCallback;
        private callUpdateCallback;
        private callCompleteCallback;
    }
}
declare namespace fgui {
    class TweenManager {
        static createTween(): GTweener;
        static isTweening(target: any, propType: any): boolean;
        static killTweens(target: any, completed: boolean, propType: any): boolean;
        static getTween(target: any, propType: any): GTweener;
        static update(): void;
    }
}
declare namespace fgui {
    class TweenValue {
        x: number;
        y: number;
        z: number;
        w: number;
        constructor();
        get color(): number;
        set color(value: number);
        getField(index: number): number;
        setField(index: number, value: number): void;
        setZero(): void;
    }
}
declare namespace fgui {
    class ByteBuffer {
        littleEndian: boolean;
        private _dataView;
        private _u8ByteArray;
        private _pos;
        length: number;
        stringTable: Array<string>;
        version: number;
        constructor(data: any, offset?: number, length?: number, isLittle?: boolean);
        get buffer(): ArrayBuffer;
        get pos(): number;
        set pos(value: number);
        get bytesAvailable(): number;
        clear(): void;
        readString(): string;
        readFloat32(): number;
        readInt32(): number;
        readUint32(): number;
        readInt16(): number;
        readUint16(): number;
        readUint8(): number;
        /**
         * @private
         * 读取指定长度的 UTF 型字符串。
         * @param	len 需要读取的长度。
         * @return 读取的字符串。
         */
        private _rUTF;
        readCustomString(len: number): string;
        readUTFString(): string;
        readUTFBytes(len?: number): string;
        readByte(): number;
        skip(count: number): void;
        readBool(): boolean;
        readS(): string;
        readSArray(cnt: number): Array<string>;
        writeS(value: string): void;
        readColor(hasAlpha?: boolean): number;
        readColorS(hasAlpha?: boolean): string;
        readChar(): string;
        readBuffer(): ByteBuffer;
        seek(indexTablePos: number, blockIndex: number): boolean;
    }
}
declare namespace fgui {
    class ColorMatrix {
        readonly matrix: Array<number>;
        constructor(p_brightness?: number, p_contrast?: number, p_saturation?: number, p_hue?: number);
        reset(): void;
        invert(): void;
        adjustColor(p_brightness: number, p_contrast: number, p_saturation: number, p_hue: number): void;
        adjustBrightness(p_val: number): void;
        adjustContrast(p_val: number): void;
        adjustSaturation(p_val: number): void;
        adjustHue(p_val: number): void;
        concat(p_matrix: Array<number>): void;
        clone(): ColorMatrix;
        protected copyMatrix(p_matrix: Array<number>): void;
        protected multiplyMatrix(p_matrix: Array<number>): void;
        protected cleanValue(p_val: number, p_limit: number): number;
    }
}
declare namespace fgui {
    class LayaCompliant {
    }
    class MouseEvents {
        static Down: string;
        static Cancel: string;
        static Up: string;
        static Click: string;
        static UpOutside: string;
        static Move: string;
        static Over: string;
        static Out: string;
        static RightDown: string;
        static RightUp: string;
        static RightClick: string;
        static RightUpOutside: string;
        static Wheel: string;
    }
    class Events {
        static DISPLAY: string;
        static UNDISPLAY: string;
        static DRAG_START: string;
        static DRAG_END: string;
        static DRAG_MOVE: string;
        static DROP: string;
        static STATE_CHANGED: string;
        static SIZE_CHANGED: string;
        static XY_CHANGED: string;
        static CLICK_ITEM: string;
        static SCROLL: string;
        static SCROLL_END: string;
        static PULL_DOWN_RELEASE: string;
        static PULL_UP_RELEASE: string;
    }
}
declare namespace fgui {
    export class Timer {
        private static _pool;
        static _mid: number;
        static _cid: number;
        /**
         * @en Scale of the clock hand.
         * @zh 时针的缩放比例。
         */
        scale: number;
        /**
         * @en The start time of the current frame.
         * @zh 当前帧的开始时间。
         */
        currTimer: number;
        /**
         * @en The current frame count.
         * @zh 当前的帧数。
         */
        currFrame: number;
        /**
         * @internal
         * @en The time interval between two frames, in milliseconds.
         * @zh 两帧之间的时间间隔，单位毫秒。
         */
        _delta: number;
        /**@internal */
        _lastTimer: number;
        /**@private */
        private _map;
        /**@private */
        private _handlers;
        /**@private */
        private _temp;
        /**@private */
        private _count;
        static _shared: Timer;
        /**
         * @en Constructor method
         * @zh 构造方法
         */
        constructor(autoActive?: boolean);
        /**
         * @en The time interval between two frames, in milliseconds.
         * @zh 两帧之间的时间间隔，单位毫秒。
         */
        get delta(): number;
        /**
         * @internal
         * @en The frame update handling function.
         * @zh 帧循环处理函数。
         */
        _update(): void;
        /** @private */
        private _clearHandlers;
        /** @private */
        private _recoverHandler;
        /**
         * @private
         * @en get now time data.
         * @returns reutrn time data.
         * @zh 立即获取时间数据
         * @returns 返回时间数据
         */
        _getNowData(): number;
        /** @internal */
        _create(useFrame: boolean, repeat: boolean, delay: number, caller: any, method: Function, args: any[], coverBefore: boolean): TimerHandler;
        /** @private */
        private _indexHandler;
        /**
         * Executes once after a delay.
         * @param delay The delay time in milliseconds.
         * @param caller The scope of the object (this).
         * @param method The callback function to be executed by the timer.
         * @param args The arguments to pass to the callback function.
         * @param coverBefore Whether to overwrite previous delayed execution, default is true.
         * @zh 定时执行一次。
         * @param delay 延迟时间(单位为毫秒)。
         * @param caller 执行域(this)。
         * @param method 定时器回调函数。
         * @param args 回调参数。
         * @param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
         */
        once(delay: number, caller: any, method: Function, args?: any[], coverBefore?: boolean): void;
        /**
         * Repeatedly executes at intervals.
         * @param delay The interval time in milliseconds.
         * @param caller The scope of the object (this).
         * @param method The callback function to be executed by the timer.
         * @param args The arguments to pass to the callback function.
         * @param coverBefore Whether to overwrite previous delayed execution, default is true.
         * @param jumpFrame Whether to jump frames. For time-based callbacks, if multiple callbacks can be executed within a given time interval, the engine defaults to executing once for performance reasons. Setting `jumpFrame` to true will allow multiple executions in quick succession.
         * @zh 定时重复执行。
         * @param delay 间隔时间(单位毫秒)。
         * @param caller 执行域(this)。
         * @param method 定时器回调函数。
         * @param args 回调参数。
         * @param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
         * @param jumpFrame 时钟是否跳帧。基于时间的循环回调，单位时间间隔内，如能执行多次回调，出于性能考虑，引擎默认只执行一次，设置jumpFrame=true后，则回调会连续执行多次。
         */
        loop(delay: number, caller: any, method: Function, args?: any[], coverBefore?: boolean, jumpFrame?: boolean): void;
        /**
         * Executes once after a delay in frames.
         * @param delay The delay time in frames.
         * @param caller The scope of the object (this).
         * @param method The callback function to be executed by the timer.
         * @param args The arguments to pass to the callback function.
         * @param coverBefore Whether to overwrite previous delayed execution, default is true.
         * @zh 定时执行一次（基于帧率）。
         * @param delay 延迟几帧（单位为帧）。
         * @param caller 执行域（this）。
         * @param method 定时器回调函数。
         * @param args 回调参数。
         * @param coverBefore 是否覆盖之前的延迟执行，默认为 true。
         */
        frameOnce(delay: number, caller: any, method: Function, args?: any[], coverBefore?: boolean): void;
        /**
         * Repeatedly executes at frame intervals.
         * @param delay The interval time in frames.
         * @param caller The scope of the object (this).
         * @param method The callback function to be executed by the timer.
         * @param args The arguments to pass to the callback function.
         * @param coverBefore Whether to overwrite previous delayed execution, default is true.
         * @zh 定时重复执行（基于帧率）。
         * @param delay 间隔几帧（单位为帧）。
         * @param caller 执行域（this）。
         * @param method 定时器回调函数。
         * @param args 回调参数。
         * @param coverBefore 是否覆盖之前的延迟执行，默认为 true。
         */
        frameLoop(delay: number, caller: any, method: Function, args?: any[], coverBefore?: boolean): void;
        /**
         * @en Return statistical information
         * @zh 返回统计信息
         */
        toString(): string;
        /**
         * @en Cleaning the timer.
         * @param caller The scope of the object (this).
         * @param method Timer callback function.
         * @zh 清理定时器。
         * @param caller 执行域（this）。
         * @param method 定时器回调函数。
         */
        clear(caller: any, method: Function): void;
        /**
         * @en Clears all timers associated with the object.
         * @param caller The scope of the object (this).
         * @zh 清理对象身上的所有定时器。
         * @param caller  执行域(this)。
         */
        clearAll(caller: any): void;
        /** @private */
        private _getHandler;
        /**
         * @en Delays the execution.
         * @param caller The scope of the object (this).
         * @param method The timer callback function.
         * @param args The callback arguments. Default is null.
         * @zh 延迟执行。
         * @param	caller 执行域(this)。
         * @param	method 定时器回调函数。
         * @param	args 回调参数。
         */
        callLater(caller: any, method: Function, args?: any[]): void;
        /**
         * @en Immediately executes the callLater.
         * @param caller The scope of the object (this).
         * @param method The callback function for the timer.
         * @zh 立即执行 callLater。
         * @param	caller 执行域(this)。
         * @param	method 定时器回调函数。
         */
        runCallLater(caller: any, method: Function): void;
        /**
         * @en Immediately advance the timer, execute it, and then remove it from the queue.
         * @param caller The scope of the object (this).
         * @param method Timer callback function.
         * @zh 立即提前执行定时器，执行后从队列中删除。
         * @param caller 执行域(this)。
         * @param method 定时器回调函数。
         */
        runTimer(caller: any, method: Function): void;
        /**
         * @en Pause the clock.
         * @zh 暂停时钟。
         */
        pause(): void;
        /**
         * @en Resume the clock.
         * @zh 恢复时钟。
         */
        resume(): void;
        /**
         * @en Destroy the timer, and clear all events on the timer.
         * @zh 删除定时器，同时清理定时器上的所有事件。
         */
        destroy(): void;
        static get shared(): Timer;
    }
    /** @private */
    class TimerHandler {
        /**
         * @en The key of the timer handler.
         * @zh 定时器处理程序的键。
         */
        key: string;
        /**
         * @en Whether the timer should repeat.
         * @zh 定时器是否应该重复。
         */
        repeat: boolean;
        /**
         * @en The delay between executions in milliseconds.
         * @zh 执行之间的延迟，以毫秒为单位。
         */
        delay: number;
        /**
         * @en Whether to use frame-based timing.
         * @zh 是否使用基于帧的计时。
         */
        userFrame: boolean;
        /**
         * @en The execution time of the timer.
         * @zh 定时器的执行时间。
         */
        exeTime: number;
        /**
         * @en The caller object for the timer method.
         * @zh 定时器方法的调用者对象。
         */
        caller: any;
        /**
         * @en The method to be executed by the timer.
         * @zh 定时器要执行的方法。
         */
        method: Function;
        /**
         * @en The arguments to be passed to the timer method.
         * @zh 要传递给定时器方法的参数。
         */
        args: any[];
        /**
         * @en Whether to jump frames.
         * @zh 是否跳帧。
         */
        jumpFrame: boolean;
        /**
         * @en Clear the timer handler by setting its properties to null.
         * @zh 通过将其属性设置为 null 来清除定时器处理程序。
         */
        clear(): void;
        /**
         * @en Run the timer handler method.
         * @param withClear Whether to clear the handler after execution.
         * @zh 运行定时器处理程序方法。
         * @param withClear 是否在执行后清除处理程序。
         */
        run(withClear: boolean): void;
    }
    export {};
}
declare namespace fgui {
    class ToolSet {
        static startsWith(source: string, str: string, ignoreCase?: boolean): boolean;
        static endsWith(source: string, str: string, ignoreCase?: boolean): boolean;
        static trimRight(targetString: string): string;
        static convertToHtmlColor(argb: number, hasAlpha?: boolean): string;
        static convertFromHtmlColor(str: string, hasAlpha?: boolean): number;
        static encodeHTML(str: string): string;
        static clamp(value: number, min: number, max: number): number;
        static clamp01(value: number): number;
        static lerp(start: number, end: number, percent: number): number;
        static repeat(t: number, length: number): number;
        static distance(x1: number, y1: number, x2: number, y2: number): number;
        static setColorFilter(obj: PIXI.Container, color?: string | number[] | boolean): void;
        static toHexColor(color: number): string;
    }
}
declare namespace fgui {
    interface ITagHandler {
        (tagName: string, end: boolean, attr: string): string;
    }
    /**
     * @en The `UBBParser` class is responsible for parsing UBB formatted text and converting it to HTML.
     * @zh `UBBParser` 类负责解析 UBB 格式的文本，并将其转换为 HTML。
     */
    class UBBParser {
        /**
         * @en The default instance of the UBBParser class.
         * @zh UBBParser 类的默认实例。
         */
        static defaultParser: UBBParser;
        private _text;
        private _readPos;
        protected _handlers: Record<string, ITagHandler>;
        /**
         * @en The default width for image tags.
         * @zh 图像标签的默认宽度。
         */
        defaultImgWidth: number;
        /**
         * @en The default height for image tags.
         * @zh 图像标签的默认高度。
         */
        defaultImgHeight: number;
        /**
         * @en The last color parsed in the text.
         * @zh 文本中解析的最后颜色。
         */
        lastColor: string;
        /**
         * @en The last size parsed in the text.
         * @zh 文本中解析的最后大小。
         */
        lastSize: string;
        /**
         * @ignore
         * @en Creates an instance of the `UBBParser` class.
         * @zh 创建 `UBBParser` 类的实例。
         */
        constructor();
        protected onTag_URL(tagName: string, end: boolean, attr: string): string;
        protected onTag_IMG(tagName: string, end: boolean, attr: string): string;
        protected onTag_B(tagName: string, end: boolean, attr: string): string;
        protected onTag_I(tagName: string, end: boolean, attr: string): string;
        protected onTag_U(tagName: string, end: boolean, attr: string): string;
        protected onTag_Simple(tagName: string, end: boolean, attr: string): string;
        protected onTag_COLOR(tagName: string, end: boolean, attr: string): string;
        protected onTag_FONT(tagName: string, end: boolean, attr: string): string;
        protected onTag_SIZE(tagName: string, end: boolean, attr: string): string;
        protected getTagText(remove?: boolean): string;
        /**
         * @en Parses the UBB formatted text and returns the corresponding HTML string.
         * @param text The UBB formatted text to parse.
         * @param remove Whether to remove UBB tags or convert them to HTML.
         * @returns The resulting HTML string.
         * @zh 解析 UBB 格式的文本，并返回相应的 HTML 字符串。
         * @param text 要解析的 UBB 格式文本。
         * @param remove 是否移除 UBB 标签或将其转换为 HTML。
         * @returns 生成的 HTML 字符串。
         */
        parse(text: string, remove?: boolean): string;
    }
}
declare namespace fgui {
    class ChildHitArea implements PIXI.IHitArea {
        private _child;
        private _reversed;
        constructor(child: GGraph, reversed?: boolean);
        contains(x: number, y: number): boolean;
    }
}
declare namespace fgui {
    class PixelHitTest implements PIXI.IHitArea {
        private _data;
        offsetX: number;
        offsetY: number;
        scaleX: number;
        scaleY: number;
        constructor(data: PixelHitTestData, offsetX: number, offsetY: number);
        contains(x: number, y: number): boolean;
    }
    class PixelHitTestData {
        pixelWidth: number;
        scale: number;
        pixels: number[];
        constructor();
        load(ba: ByteBuffer): void;
    }
}
import fairygui = fgui;