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

let _calcXAxisScrollValue =
    (
      sceneTreeContainerJsObj,
      sceneTreeNodeDomOffsetLeft,
      (sceneTreeContainerScrollLeft, sceneTreeContainerOffsetWidth),
    ) =>
  _isXAxisNeedScrollLeft(
    sceneTreeNodeDomOffsetLeft,
    sceneTreeContainerScrollLeft,
  ) ?
    sceneTreeNodeDomOffsetLeft
    <= SceneTreeNodeScrollDataUtils.getXAxisScrollLeftMinDistance() ?
      Some(0.0) : Some(sceneTreeNodeDomOffsetLeft /. 2.) :
    _isXAxisNeedScrollRight(
      sceneTreeNodeDomOffsetLeft,
      sceneTreeContainerScrollLeft,
      sceneTreeContainerOffsetWidth,
    ) ?
      Some(
        sceneTreeNodeDomOffsetLeft -. sceneTreeContainerOffsetWidth /. 2.,
      ) :
      None;

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

let _calcYAxisScrollValue =
    (
      sceneTreeContainerJsObj,
      sceneTreeNodeDomOffsetTop,
      (sceneTreeContainerScrollTop, sceneTreeContainerOffsetHeight),
    ) =>
  _isYAxisNeedScrollTop(
    sceneTreeNodeDomOffsetTop,
    sceneTreeContainerScrollTop,
  ) ?
    sceneTreeNodeDomOffsetTop
    <= SceneTreeNodeScrollDataUtils.getYAxisScrollTopMinDistance() ?
      Some(0.0) : Some(sceneTreeNodeDomOffsetTop /. 2.) :
    _isYAxisNeedScrollBottom(
      sceneTreeNodeDomOffsetTop,
      sceneTreeContainerScrollTop,
      sceneTreeContainerOffsetHeight,
    ) ?
      Some(
        sceneTreeNodeDomOffsetTop -. sceneTreeContainerOffsetHeight /. 2.,
      ) :
      None;

let scrollCurrentSceneTreeNode =
    (sceneTreeContainerJsObj, sceneTreeNodeDomClientRect) => {
  switch (
    _calcXAxisScrollValue(
      sceneTreeContainerJsObj,
      sceneTreeNodeDomClientRect##offsetLeft,
      (
        sceneTreeContainerJsObj##scrollLeft,
        sceneTreeContainerJsObj##offsetWidth,
      ),
    )
  ) {
  | None => ()
  | Some(value) => sceneTreeContainerJsObj##scrollLeft#=value
  };

  switch (
    _calcYAxisScrollValue(
      sceneTreeContainerJsObj,
      sceneTreeNodeDomClientRect##offsetTop,
      (
        sceneTreeContainerJsObj##scrollTop,
        sceneTreeContainerJsObj##offsetHeight,
      ),
    )
  ) {
  | None => ()
  | Some(value) => sceneTreeContainerJsObj##scrollTop#=value
  };
};

let handleSelectedSceneTreeNodeScroll = (isSelected, gameObject) =>
  isSelected ?
    {
      let sceneTreeContainerJsObj =
        DomHelper.getElementById("wonder-sceneTree-component")
        |> DomHelperType.convertDomElementToJsObj;

      let sceneTreeNodeDomClientRect =
        DomHelper.getElementById({j|sceneTreeNode-$gameObject|j})
        |> DomHelper.getDomClientRect;

      scrollCurrentSceneTreeNode(
        sceneTreeContainerJsObj,
        sceneTreeNodeDomClientRect,
      );
    } :
    ();