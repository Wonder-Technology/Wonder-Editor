open DragEventUtils;

type state = {style: ReactDOMRe.Style.t};

module Method = {
  let buildDragEndState = state => {
    ...state,
    style:
      ReactUtils.addStyleProp("opacity", "1", state.style)
      |> ReactUtils.addStyleProp("border", "0px"),
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
              DragEventUtils.handleDragEnter(
                id,
                handleWidgetFunc,
                handleRelationErrorFunc(false),
                _e,
              ),
            )
        )
        onDragLeave=(_e => send(DragEventUtils.handleDragLeave(id, _e)))
        onDragOver=(e => DragEventUtils.handleDragOver("move", e))
        onDrop=(
          _e =>
            send(
              DragEventUtils.handleDrop(
                id,
                handleWidgetFunc,
                handleRelationErrorFunc(true),
                _e,
              ),
            )
        )>
        (DomHelper.textEl(name))
      </div>
    </li>;
};

let component = ReasonReact.reducerComponent("AssetTreeNode");

let reducer =
    (isShowChildren, (onDropFunc, handleToggleShowTreeChildren), action) =>
  switch (action) {
  | TogggleChildren(targetId) => (
      state =>
        ReasonReactUtils.sideEffects(() =>
          handleToggleShowTreeChildren(targetId, ! isShowChildren)
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

  | DragEnd => (state => ReasonReact.Update(Method.buildDragEndState(state)))

  | DragDrop(targetId, removedId) => (
      state =>
        ReasonReactUtils.updateWithSideEffects(
          Method.buildDragEndState(state), _state =>
          onDropFunc((targetId, removedId))
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
      (onSelectFunc, handleWidgetFunc, handleRelationErrorFunc),
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
        handleWidgetFunc,
        handleRelationErrorFunc,
        handleRelationErrorFunc,
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
      ~onDrop,
      ~isWidget,
      ~isShowChildren,
      ~isHasChildren,
      ~handleRelationError,
      ~handleToggleShowTreeChildren,
      ~treeChildren,
      _children,
    ) => {
  ...component,
  initialState: () => {style: ReactDOMRe.Style.make()},
  reducer: reducer(isShowChildren, (onDrop, handleToggleShowTreeChildren)),
  render: self =>
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
      (onSelect, isWidget, handleRelationError),
      treeChildren,
      self,
    ),
};