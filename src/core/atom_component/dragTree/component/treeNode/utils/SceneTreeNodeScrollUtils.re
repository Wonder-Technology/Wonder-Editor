let _isXAxisNeedScrollLeft =
    (sceneTreeNodeDomOffsetLeft, sceneTreeContainerScrollLeft) =>
  sceneTreeNodeDomOffsetLeft
  -.
  sceneTreeContainerScrollLeft <= SceneTreeNodeScrollDataUtils.getXAxisScrollLeftBoundary();

let _isXAxisNeedScrollRight =
    (
      sceneTreeNodeDomOffsetLeft,
      sceneTreeContainerScrollLeft,
      sceneTreeContainerOffsetWidth,
    ) =>
  sceneTreeNodeDomOffsetLeft >= sceneTreeContainerScrollLeft
  +. sceneTreeContainerOffsetWidth
  -. SceneTreeNodeScrollDataUtils.getXAxisScrollRightBoundary();

let _handleXAxisScrollLeft =
    (sceneTreeNodeDomOffsetLeft, sceneTreeContainerJsObj) => {
  let distance =
    sceneTreeNodeDomOffsetLeft
    <= SceneTreeNodeScrollDataUtils.getXAxisScrollLeftMinDistance() ?
      0.0 : sceneTreeNodeDomOffsetLeft /. 2.;

  sceneTreeContainerJsObj##scrollLeft#=distance;
};

let _handleXAxisScrollRight =
    (sceneTreeNodeDomOffsetLeft, sceneTreeContainerJsObj) => {
  let distance =
    sceneTreeNodeDomOffsetLeft
    -. SceneTreeNodeScrollDataUtils.getXAxisScrollOffsetLeft();

  sceneTreeContainerJsObj##scrollLeft#=distance;
};

let _setXAxisScrollLeft =
    (
      sceneTreeContainerJsObj,
      sceneTreeNodeDomOffsetLeft,
      (sceneTreeContainerScrollLeft, sceneTreeContainerOffsetWidth),
    ) =>
  _isXAxisNeedScrollLeft(
    sceneTreeNodeDomOffsetLeft,
    sceneTreeContainerScrollLeft,
  ) ?
    _handleXAxisScrollLeft(
      sceneTreeNodeDomOffsetLeft,
      sceneTreeContainerJsObj,
    ) :
    _isXAxisNeedScrollRight(
      sceneTreeNodeDomOffsetLeft,
      sceneTreeContainerScrollLeft,
      sceneTreeContainerOffsetWidth,
    ) ?
      _handleXAxisScrollRight(
        sceneTreeNodeDomOffsetLeft,
        sceneTreeContainerJsObj,
      ) :
      ();

let _isYAxisNeedScrollTop =
    (sceneTreeNodeDomOffsetTop, sceneTreeContainerScrollTop) =>
  sceneTreeNodeDomOffsetTop
  -.
  sceneTreeContainerScrollTop <= SceneTreeNodeScrollDataUtils.getYAxisScrollTopBoundary();

let _isYAxisNeedScrollBottom =
    (
      sceneTreeNodeDomOffsetTop,
      sceneTreeContainerScrollTop,
      sceneTreeContainerOffsetHeight,
    ) =>
  sceneTreeNodeDomOffsetTop >= sceneTreeContainerScrollTop
  +. sceneTreeContainerOffsetHeight
  -. SceneTreeNodeScrollDataUtils.getYAxisScrollBottomBoundary();

let _handleYAxisScrollTop =
    (sceneTreeNodeDomOffsetTop, sceneTreeContainerJsObj) => {
  let distance =
    sceneTreeNodeDomOffsetTop
    <= SceneTreeNodeScrollDataUtils.getYAxisScrollTopMinDistance() ?
      0.0 : sceneTreeNodeDomOffsetTop /. 2.;

  sceneTreeContainerJsObj##scrollTop#=distance;
};

let _handleYAxisScrollBottom =
    (sceneTreeNodeDomOffsetTop, sceneTreeContainerJsObj) => {
  let distance =
    sceneTreeNodeDomOffsetTop
    -. SceneTreeNodeScrollDataUtils.getXAxisScrollOffsetTop();

  sceneTreeContainerJsObj##scrollTop#=distance;
};

let _setYAxisScrollTop =
    (
      sceneTreeContainerJsObj,
      sceneTreeNodeDomOffsetTop,
      (sceneTreeContainerScrollTop, sceneTreeContainerOffsetHeight),
    ) =>
  _isYAxisNeedScrollTop(
    sceneTreeNodeDomOffsetTop,
    sceneTreeContainerScrollTop,
  ) ?
    _handleYAxisScrollTop(
      sceneTreeNodeDomOffsetTop,
      sceneTreeContainerJsObj,
    ) :
    _isYAxisNeedScrollBottom(
      sceneTreeNodeDomOffsetTop,
      sceneTreeContainerScrollTop,
      sceneTreeContainerOffsetHeight,
    ) ?
      _handleYAxisScrollBottom(
        sceneTreeNodeDomOffsetTop,
        sceneTreeContainerJsObj,
      ) :
      ();

let scrollCurrentSceneTreeNode =
    (sceneTreeContainerDomEle, sceneTreeNodeDomEle) => {
  let sceneTreeContainerJsObj =
    sceneTreeContainerDomEle |> DomHelperType.convertDomElementToJsObj;

  let sceneTreeNodeDomClientRect =
    DomHelper.getDomClientRect(sceneTreeNodeDomEle);

  _setXAxisScrollLeft(
    sceneTreeContainerJsObj,
    sceneTreeNodeDomClientRect##offsetLeft,
    (
      sceneTreeContainerJsObj##scrollLeft,
      sceneTreeContainerJsObj##offsetWidth,
    ),
  );

  _setYAxisScrollTop(
    sceneTreeContainerJsObj,
    sceneTreeNodeDomClientRect##offsetTop,
    (
      sceneTreeContainerJsObj##scrollTop,
      sceneTreeContainerJsObj##offsetHeight,
    ),
  );
};