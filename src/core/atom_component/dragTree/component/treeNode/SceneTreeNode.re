open SceneTreeNodeType;

type state = {
  dragGapClass: string,
  style: ReactDOMRe.Style.t,
  dragPosition: sceneTreeDragMoveType,
};

type action =
  | Nothing
  | TogggleChildren(int)
  | DragEnter(sceneTreeDragMoveType)
  | DragLeave
  | DragEnd
  | DragStart
  | DragOver(sceneTreeDragMoveType)
  | DragGameObject(int, int, sceneTreeDragMoveType)
  | DragWDB(int, int, sceneTreeDragMoveType);

module Method = {
  let buildDragEndState = state => {
    ...state,
    dragGapClass: "no-drag",
    style: ReactUtils.addStyleProp("opacity", "1", state.style),
  };

  let handleDragStart = (id, widget, dragImg, effectAllowd, event) => {
    DragEventBaseUtils.dragStart(id, widget, dragImg, effectAllowd, event);
    DragStart;
  };

  let _calcDragPosition = (event, domElement) => {
    let domClientRect = DomHelper.getDomClientRect(domElement);
    let domOffsetTop = domClientRect##top;
    let domOffsetHeight = domClientRect##height;
    let gapHeight = TreeNodeUtils.getGapHeight();

    switch (event |> ReactEventRe.Mouse.pageY) {
    | pageY when pageY > domOffsetHeight + domOffsetTop - gapHeight =>
      DragAfterTarget
    | pageY when pageY < domOffsetTop + gapHeight => DragBeforeTarget
    | pageY => DragIntoTarget
    };
  };

  let handleDragEnter =
      (id, (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc), event) => {
    let (isTrigger, _) =
      DragEventBaseUtils.checkDragEnter(
        id,
        isWidgetFunc,
        checkNodeRelationFunc,
      );

    isTrigger || isAssetWDBFileFunc() ?
      DragEnter(
        ReactDOMRe.domElementToObj(ReactEventRe.Mouse.target(event))
        |> _calcDragPosition(event),
      ) :
      Nothing;
  };

  let handleDragLeave = (id, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);

    DragLeave;
  };

  let handleDragEnd = _event => {
    CurrentDragSourceEditorService.clearCurrentDragSource
    |> StateLogicService.getAndSetEditorState;

    DragEnd;
  };

  let handleDragOver =
      (id, (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc), event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    EventHelper.preventDefault(e);

    let (isTrigger, _) =
      DragEventBaseUtils.checkDragEnter(
        id,
        isWidgetFunc,
        checkNodeRelationFunc,
      );

    let isSceneGameObject =
      SceneEngineService.getSceneGameObject
      |> StateLogicService.getEngineStateToGetData === id;

    isTrigger || isAssetWDBFileFunc() ?
      DragOver(
        isSceneGameObject ?
          DragIntoTarget :
          ReactDOMRe.domElementToObj(ReactEventRe.Mouse.target(event))
          |> _calcDragPosition(event),
      ) :
      Nothing;
  };

  let handleDrop =
      (
        id,
        (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
        dragPosition,
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedId(e);

    EventHelper.preventDefault(e);

    let (isTrigger, relationResult) =
      DragEventBaseUtils.checkDragDrop(
        id,
        startId,
        isWidgetFunc,
        checkNodeRelationFunc,
      );

    relationResult
    |> OptionService.handleSomeAndIgnore(relationResult =>
         relationResult
         |> Result.RelationResult.handleError(msg =>
              ConsoleUtils.error(msg, StateEditorService.getState())
            )
       );

    isTrigger ?
      DragGameObject(id, startId, dragPosition) :
      isAssetWDBFileFunc() ?
        {
          let wdbGameObjectUid =
            StateEditorService.getState()
            |> OperateTreeAssetEditorService.unsafeFindNodeById(startId)
            |> WDBNodeAssetService.getWDBGameObject;

          DragWDB(id, wdbGameObjectUid, dragPosition);
        } :
        DragLeave;
  };

  let buildNotDragableUl = TreeNodeUtils.buildNotDragableUl;

  let _renderDragableText =
      (
        (state, send),
        (id, widget, dragImg, name, isShowChildren, isSelected, isActive),
        (
          onSelectFunc,
          isWidgetFunc,
          checkNodeRelationFunc,
          isAssetWDBFileFunc,
        ),
      ) =>
    <div
      className=(
        "draggable-container"
        ++ (
          isSelected ?
            isActive ? " select-active " : " select-not-active " : " "
        )
        ++ state.dragGapClass
      )
      style=state.style
      draggable=true
      onMouseDown=(_event => onSelectFunc(id))
      onDragStart=(
        e => send(handleDragStart(id, widget, dragImg, "move", e))
      )
      onDragEnd=(_e => send(handleDragEnd(_e)))
      onDragEnter=(
        e =>
          send(
            handleDragEnter(
              id,
              (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
              e,
            ),
          )
      )
      onDragLeave=(_e => send(handleDragLeave(id, _e)))
      onDragOver=(
        e =>
          send(
            handleDragOver(
              id,
              (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
              e,
            ),
          )
      )
      onDrop=(
        _e =>
          send(
            handleDrop(
              id,
              (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
              state.dragPosition,
              _e,
            ),
          )
      )>
      (DomHelper.textEl(name))
    </div>;

  let _renderContent =
      (
        (state, send),
        (
          id,
          icon,
          widget,
          dragImg,
          name,
          isShowChildren,
          isHasChildren,
          isSelected,
          isActive,
        ),
        (
          onSelectFunc,
          isWidgetFunc,
          checkNodeRelationFunc,
          isAssetWDBFileFunc,
        ),
      ) =>
    <li>
      (
        isHasChildren ?
          TreeNodeUtils.renderChildren(
            id,
            isShowChildren,
            send,
            TogggleChildren(id),
          ) :
          <div className="item-triangle" />
      )
      (
        switch (icon) {
        | None => ReasonReact.null
        | Some(icon) => <img src=icon className="treeNode-icon" />
        }
      )
      (
        _renderDragableText(
          (state, send),
          (id, widget, dragImg, name, isShowChildren, isSelected, isActive),
          (
            onSelectFunc,
            isWidgetFunc,
            checkNodeRelationFunc,
            isAssetWDBFileFunc,
          ),
        )
      )
    </li>;
};

let component = ReasonReact.reducerComponent("SceneTreeNode");

let reducer =
    (
      isShowChildren,
      (dragGameObject, dragWDB, handleToggleShowTreeChildren),
      action,
      state,
    ) =>
  switch (action) {
  | TogggleChildren(targetUid) =>
    ReasonReactUtils.sideEffects(() =>
      handleToggleShowTreeChildren(targetUid, ! isShowChildren)
    )

  | DragStart =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("opacity", "0.2", state.style),
    })

  | DragEnter(dragPosition) => ReasonReact.Update({...state, dragPosition})

  | DragOver(dragPosition) =>
    switch (dragPosition) {
    | DragBeforeTarget =>
      ReasonReact.Update({
        ...state,
        dragGapClass: "drag-gap-top",
        dragPosition,
      })
    | DragIntoTarget =>
      ReasonReact.Update({
        ...state,
        dragGapClass: "drag-gap-center",
        dragPosition,
      })
    | DragAfterTarget =>
      ReasonReact.Update({
        ...state,
        dragGapClass: "drag-gap-bottom",
        dragPosition,
      })
    }

  | DragLeave => ReasonReact.Update({...state, dragGapClass: "no-drag"})

  | DragEnd => ReasonReact.Update(Method.buildDragEndState(state))

  | DragGameObject(targetUid, draggedUid, dragPosition) =>
    ReasonReactUtils.updateWithSideEffects(
      Method.buildDragEndState(state), _state =>
      dragGameObject((targetUid, draggedUid, dragPosition))
    )

  | DragWDB(targetUid, wdbGameObjectUid, dragPosition) =>
    ReasonReactUtils.updateWithSideEffects(
      Method.buildDragEndState(state), _state =>
      dragWDB((targetUid, wdbGameObjectUid, dragPosition))
    )

  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      (
        id,
        name,
        widget,
        dragImg,
        icon,
        isShowChildren,
        isHasChildren,
        isSelected,
        isActive,
      ),
      (onSelectFunc, isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
      treeChildren,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  Method.buildNotDragableUl(
    treeChildren,
    isShowChildren,
    Method._renderContent(
      (state, send),
      (
        id,
        icon,
        widget,
        dragImg,
        name,
        isShowChildren,
        isHasChildren,
        isSelected,
        isActive,
      ),
      (onSelectFunc, isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
    ),
  );

let make =
    (
      ~id,
      ~name,
      ~isSelected,
      ~isActive,
      ~dragImg,
      ~widget,
      ~icon: option(string)=?,
      ~onSelect,
      ~dragGameObject,
      ~dragWDB,
      ~isWidget,
      ~isShowChildren,
      ~isHasChildren,
      ~checkNodeRelation,
      ~handleToggleShowTreeChildren,
      ~isAssetWDBFile,
      ~treeChildren,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(),
    dragGapClass: "no-drag",
    dragPosition: NoDrag,
  },
  reducer:
    reducer(
      isShowChildren,
      (dragGameObject, dragWDB, handleToggleShowTreeChildren),
    ),
  render: (({state}: ReasonReact.self('a, 'b, 'c)) as self) =>
    render(
      (
        id,
        name,
        widget,
        dragImg,
        icon,
        isShowChildren,
        isHasChildren,
        isSelected,
        isActive,
      ),
      (onSelect, isWidget, checkNodeRelation, isAssetWDBFile),
      treeChildren,
      self,
    ),
};