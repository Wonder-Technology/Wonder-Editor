type action =
  | TogggleChildren(int)
  | Nothing
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart
  | DragGameObject(int, int)
  | DragWDB(int, int);

type state = {style: ReactDOMRe.Style.t};

module Method = {
  let buildDragEndState = state => {
    ...state,
    style:
      ReactUtils.addStyleProp("opacity", "1", state.style)
      |> ReactUtils.addStyleProp("border", TreeNodeUtils.getNoBorderCss()),
  };

  let handleDragStart = (id, widget, dragImg, effectAllowd, event) => {
    DragEventBaseUtils.dragStart(id, widget, dragImg, effectAllowd, event);
    DragStart;
  };

  let handleDragEnter =
      (
        id,
        (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFileFunc),
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);

    DragEventBaseUtils.isTriggerDragEnter(
      id,
      handleWidgetFunc,
      handleRelationErrorFunc,
    )
    || isAssetWDBFileFunc() ?
      DragEnter : Nothing;
  };

  let handleDragLeave = (id, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);

    DragLeave;
  };

  let handleDrageEnd = _event => {
    CurrentDragSourceEditorService.clearCurrentDragSource
    |> StateLogicService.getAndSetEditorState;

    DragEnd;
  };

  let handleDrop =
      (
        id,
        (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFileFunc),
        event,
      ) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedId(e);

    DragEventBaseUtils.isTriggerDragDrop(
      id,
      startId,
      handleWidgetFunc,
      handleRelationErrorFunc,
    ) ?
      DragGameObject(id, startId) :
      isAssetWDBFileFunc() ?
        {
          let wdbGameObjectUid =
            StateEditorService.getState()
            |> WDBNodeMapAssetEditorService.getWDBNodeMap
            |> WonderCommonlib.SparseMapService.unsafeGet(startId)
            |> (({wdbGameObject}) => wdbGameObject);

          DragWDB(id, wdbGameObjectUid);
        } :
        DragLeave;
  };

  let buildNotDragableUl = TreeNodeUtils.buildNotDragableUl;

  let getContent =
      (
        (state, send),
        (
          id,
          icon,
          widget,
          dragImg,
          name,
          treeChildren,
          isShowChildren,
          isHasChildren,
          isSelected,
          isActive,
        ),
        (
          onSelectFunc,
          handleWidgetFunc,
          handleRelationErrorFunc,
          isAssetWDBFileFunc,
        ),
      ) =>
    <li>
      (
        isHasChildren ?
          <div
            className="item-triangle"
            onMouseDown=(
              event => {
                DomHelper.stopPropagation(
                  ReactEventType.convertReactMouseEventToJsEvent(event),
                );

                send(TogggleChildren(id));
              }
            )>
            (
              isShowChildren ?
                <img src="./public/img/down.png" /> :
                <img src="./public/img/right.png" />
            )
          </div> :
          <div className="item-triangle" />
      )
      (
        switch (icon) {
        | None => ReasonReact.null
        | Some(icon) => <img src=icon className="treeNode-icon" />
        }
      )
      <div
        className=(
          "draggable-container"
          ++ (
            isSelected ?
              isActive ? " select-active" : " select-not-active" : ""
          )
        )
        style=state.style
        draggable=true
        onMouseDown=(_event => onSelectFunc(id))
        onDragStart=(
          _e => send(handleDragStart(id, widget, dragImg, "move", _e))
        )
        onDragEnd=(_e => send(handleDrageEnd(_e)))
        onDragEnter=(
          _e =>
            send(
              handleDragEnter(
                id,
                (
                  handleWidgetFunc,
                  handleRelationErrorFunc,
                  isAssetWDBFileFunc,
                ),
                _e,
              ),
            )
        )
        onDragLeave=(_e => send(handleDragLeave(id, _e)))
        onDragOver=(e => DragEventUtils.handleDragOver("move", e))
        onDrop=(
          _e =>
            send(
              handleDrop(
                id,
                (
                  handleWidgetFunc,
                  handleRelationErrorFunc,
                  isAssetWDBFileFunc,
                ),
                _e,
              ),
            )
        )>
        (DomHelper.textEl(name))
      </div>
    </li>;
};

let component = ReasonReact.reducerComponent("SceneTreeNode");

let reducer =
    (
      isShowChildren,
      (dragGameObject, dragWDB, handleToggleShowTreeChildren),
      action,
    ) =>
  switch (action) {
  | TogggleChildren(targetUid) => (
      state =>
        ReasonReactUtils.sideEffects(() =>
          handleToggleShowTreeChildren(targetUid, ! isShowChildren)
        )
    )

  | DragStart => (
      state =>
        ReasonReact.Update({
          ...state,
          style: ReactUtils.addStyleProp("opacity", "0.2", state.style),
        })
    )

  | DragEnter => (
      state =>
        ReasonReact.Update({
          ...state,
          style:
            ReactUtils.addStyleProp("border", "3px solid coral", state.style),
        })
    )

  | DragLeave => (
      state =>
        ReasonReact.Update({
          ...state,
          style:
            ReactUtils.addStyleProp(
              "border",
              TreeNodeUtils.getNoBorderCss(),
              state.style,
            ),
        })
    )

  | DragEnd => (state => ReasonReact.Update(Method.buildDragEndState(state)))

  | DragGameObject(targetUid, removedUid) => (
      state =>
        ReasonReactUtils.updateWithSideEffects(
          Method.buildDragEndState(state), _state =>
          dragGameObject((targetUid, removedUid))
        )
    )

  | DragWDB(targetUid, wdbGameObjectUid) => (
      state =>
        ReasonReactUtils.updateWithSideEffects(
          Method.buildDragEndState(state), _state =>
          dragWDB((targetUid, wdbGameObjectUid))
        )
    )

  | Nothing => (_state => ReasonReact.NoUpdate)
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
      (
        onSelectFunc,
        isWidgetFunc,
        handleRelationErrorFunc,
        isAssetWDBFileFunc,
      ),
      treeChildren,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  Method.buildNotDragableUl(
    treeChildren,
    isShowChildren,
    Method.getContent(
      (state, send),
      (
        id,
        icon,
        widget,
        dragImg,
        name,
        treeChildren,
        isShowChildren,
        isHasChildren,
        isSelected,
        isActive,
      ),
      (
        onSelectFunc,
        isWidgetFunc,
        handleRelationErrorFunc,
        isAssetWDBFileFunc,
      ),
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
      ~handleRelationError,
      ~handleToggleShowTreeChildren,
      ~isAssetWDBFile,
      ~treeChildren,
      _children,
    ) => {
  ...component,
  initialState: () => {style: ReactDOMRe.Style.make()},
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
      (onSelect, isWidget, handleRelationError, isAssetWDBFile),
      treeChildren,
      self,
    ),
};