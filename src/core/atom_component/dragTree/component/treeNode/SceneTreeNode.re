open SceneTreeNodeType;

type state = {
  dragGapClass: string,
  style: ReactDOMRe.Style.t,
  dragPosition: sceneTreeDragMoveType,
};

type action =
  | Nothing
  | TogggleChildren(int)
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
    dragPosition: NoDrag,
    style: ReactUtils.addStyleProp("opacity", "1", state.style),
  };

  let handleDragStart = (gameObject, widget, dragImg, effectAllowd, event) => {
    DragEventBaseUtils.dragStart(
      gameObject,
      widget,
      dragImg,
      effectAllowd,
      event,
    );
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

  let handleDragLeave = (gameObject, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);

    DragLeave;
  };

  let handleDragEnd = _event => {
    CurrentDragSourceEditorService.clearCurrentDragSource
    |> StateLogicService.getAndSetEditorState;

    DragEnd;
  };

  let handleDragOver =
      (
        gameObject,
        (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    EventHelper.preventDefault(e);
    let _isValidForDragOver = DragEventBaseUtils.isValidForDragEnter;

    let (isValid, _) =
      _isValidForDragOver(gameObject, isWidgetFunc, checkNodeRelationFunc);

    let isSceneGameObject =
      gameObject
      === (
            SceneEngineService.getSceneGameObject
            |> StateLogicService.getEngineStateToGetData
          );

    isValid || isAssetWDBFileFunc() ?
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
        gameObject,
        (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
        dragPosition,
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedId(e);

    EventHelper.preventDefault(e);

    let (isValid, relationResult) =
      DragEventBaseUtils.isValidForDragDrop(
        gameObject,
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

    isValid ?
      DragGameObject(gameObject, startId, dragPosition) :
      isAssetWDBFileFunc() ?
        {
          let wdbGameObjectUid =
            StateEditorService.getState()
            |> OperateTreeAssetEditorService.unsafeFindNodeById(startId)
            |> WDBNodeAssetService.getWDBGameObject;

          DragWDB(gameObject, wdbGameObjectUid, dragPosition);
        } :
        DragLeave;
  };

  let buildNotDragableUl = TreeNodeUtils.buildNotDragableUl;

  let _buildMultipleClassName = classNameArr =>
    classNameArr |> Js.Array.joinWith(" ");

  let _renderDragableText =
      (
        (state, send),
        (
          gameObject,
          widget,
          dragImg,
          name,
          isShowChildren,
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
    <div
      className=(
        _buildMultipleClassName([|
          "draggable-container",
          isSelected ? isActive ? "select-active" : "select-not-active" : "",
          state.dragGapClass,
        |])
      )
      style=state.style
      draggable=(
        gameObject
        !== (
              SceneEngineService.getSceneGameObject
              |> StateLogicService.getEngineStateToGetData
            )
      )
      onMouseDown=(_event => onSelectFunc(gameObject))
      onDragStart=(
        e => send(handleDragStart(gameObject, widget, dragImg, "move", e))
      )
      onDragEnd=(_e => send(handleDragEnd(_e)))
      onDragLeave=(_e => send(handleDragLeave(gameObject, _e)))
      onDragOver=(
        e =>
          send(
            handleDragOver(
              gameObject,
              (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
              e,
            ),
          )
      )
      onDrop=(
        _e =>
          send(
            handleDrop(
              gameObject,
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
          gameObject,
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
            gameObject,
            isShowChildren,
            send,
            TogggleChildren(gameObject),
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
          (
            gameObject,
            widget,
            dragImg,
            name,
            isShowChildren,
            isSelected,
            isActive,
          ),
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
        gameObject,
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
        gameObject,
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
      ~gameObject,
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
        gameObject,
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