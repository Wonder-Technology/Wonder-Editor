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
      (id, (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc), event) => {
    let (isTrigger, _) =
      DragEventBaseUtils.checkDragEnter(
        id,
        isWidgetFunc,
        checkNodeRelationFunc,
      );

    isTrigger || isAssetWDBFileFunc() ? DragEnter : Nothing;
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

  let handleDrop =
      (id, (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc), event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedId(e);

    DomHelper.preventDefault(e);

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
      DragGameObject(id, startId) :
      isAssetWDBFileFunc() ?
        {
          let wdbGameObjectUid =
            StateEditorService.getState()
            |> OperateTreeAssetEditorService.unsafeFindNodeById(startId)
            |> WDBNodeAssetService.getWDBGameObject;

          DragWDB(id, wdbGameObjectUid);
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
          isSelected ? isActive ? " select-active" : " select-not-active" : ""
        )
      )
      style=state.style
      draggable=true
      onMouseDown=(_event => onSelectFunc(id))
      onDragStart=(
        _e => send(handleDragStart(id, widget, dragImg, "move", _e))
      )
      onDragEnd=(_e => send(handleDragEnd(_e)))
      onDragEnter=(
        _e =>
          send(
            handleDragEnter(
              id,
              (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
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
              (isWidgetFunc, checkNodeRelationFunc, isAssetWDBFileFunc),
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

  | DragGameObject(targetUid, dragedUid) => (
      state =>
        ReasonReactUtils.updateWithSideEffects(
          Method.buildDragEndState(state), _state =>
          dragGameObject((targetUid, dragedUid))
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
      (onSelect, isWidget, checkNodeRelation, isAssetWDBFile),
      treeChildren,
      self,
    ),
};