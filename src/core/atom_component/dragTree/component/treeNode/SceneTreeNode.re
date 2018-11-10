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
  let handleDragStart = (id, widget, dragImg, effectAllowd, event) => {
    DragEventBaseUtils.dragStart(id, widget, dragImg, effectAllowd, event);
    DragStart;
  };

  let handleDragEnter =
      (
        id,
        (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFileFunc),
        _event,
      ) =>
    DragEventBaseUtils.isTriggerDragEnter(
      id,
      handleWidgetFunc,
      handleRelationErrorFunc,
    )
    || isAssetWDBFileFunc() ?
      DragEnter : Nothing;

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

  let buildDragableUl =
      (send, (id, widget, dragImg, treeChildren, isShowChildren), content) =>
    TreeNodeUtils.buildDragableUl(
      send,
      (id, widget, dragImg, treeChildren, isShowChildren),
      content,
      (handleDragStart, handleDrageEnd),
    );

  let getContent =
      (
        (state, send),
        (id, icon, name, treeChildren, isShowChildren, isHasChildren),
        (
          onSelectFunc,
          handleWidgetFunc,
          handleRelationErrorFunc,
          isAssetWDBFileFunc,
        ),
      ) =>
    <li
      style=state.style
      draggable=true
      onClick=(_event => onSelectFunc(id))
      onDragEnter=(
        _e =>
          send(
            handleDragEnter(
              id,
              (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFileFunc),
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
              (handleWidgetFunc, handleRelationErrorFunc, isAssetWDBFileFunc),
              _e,
            ),
          )
      )>
      (
        isHasChildren ?
          <div
            className="item-triangle"
            onClick=(
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
      (DomHelper.textEl(name))
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
          style: ReactUtils.addStyleProp("border", "0px", state.style),
        })
    )

  | DragEnd => (
      state =>
        ReasonReact.Update({
          ...state,
          style:
            ReactUtils.addStyleProp("opacity", "1", state.style)
            |> ReactUtils.addStyleProp("border", "0px"),
        })
    )

  | DragGameObject(targetUid, removedUid) => (
      _state =>
        ReasonReactUtils.sideEffects(() =>
          dragGameObject((targetUid, removedUid))
        )
    )

  | DragWDB(targetUid, wdbGameObjectUid) => (
      _state =>
        ReasonReactUtils.sideEffects(() =>
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
        isDragable,
        isShowChildren,
        isHasChildren,
      ),
      (
        onSelectFunc,
        isWidgetFunc,
        handleRelationErrorFunc,
        isAssetWDBFileFunc,
      ),
      treeChildren,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let _buildContent = () =>
    switch (isDragable) {
    | None =>
      Method.buildDragableUl(
        send,
        (id, widget, dragImg, treeChildren, isShowChildren),
        Method.getContent(
          (state, send),
          (id, icon, name, treeChildren, isShowChildren, isHasChildren),
          (
            onSelectFunc,
            isWidgetFunc,
            handleRelationErrorFunc,
            isAssetWDBFileFunc,
          ),
        ),
      )

    | Some(isDragable) =>
      isDragable ?
        Method.buildDragableUl(
          send,
          (id, widget, dragImg, treeChildren, isShowChildren),
          Method.getContent(
            (state, send),
            (id, icon, name, treeChildren, isShowChildren, isHasChildren),
            (
              onSelectFunc,
              isWidgetFunc,
              handleRelationErrorFunc,
              isAssetWDBFileFunc,
            ),
          ),
        ) :
        Method.buildNotDragableUl(
          treeChildren,
          isShowChildren,
          Method.getContent(
            (state, send),
            (id, icon, name, treeChildren, isShowChildren, isHasChildren),
            (
              onSelectFunc,
              isWidgetFunc,
              handleRelationErrorFunc,
              isAssetWDBFileFunc,
            ),
          ),
        )
    };

  _buildContent();
};

let initalState = (isSelected, isActive) =>
  isSelected ?
    isActive ?
      {style: ReactDOMRe.Style.make(~background="#5C7EA6", ())} :
      {style: ReactDOMRe.Style.make(~background="rgba(255,255,255,0.2)", ())} :
    {style: ReactDOMRe.Style.make(~border="0px", ())};

let make =
    (
      ~id,
      ~name,
      ~isSelected,
      ~isActive,
      ~dragImg,
      ~widget,
      ~icon: option(string)=?,
      ~isDragable: option(bool)=?,
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
  initialState: () => initalState(isSelected, isActive),
  reducer:
    reducer(
      isShowChildren,
      (dragGameObject, dragWDB, handleToggleShowTreeChildren),
    ),
  render: self =>
    render(
      (
        id,
        name,
        widget,
        dragImg,
        icon,
        isDragable,
        isShowChildren,
        isHasChildren,
      ),
      (onSelect, isWidget, handleRelationError, isAssetWDBFile),
      treeChildren,
      self,
    ),
};