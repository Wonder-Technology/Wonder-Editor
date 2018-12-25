type action =
  | TogggleChildren(int)
  | Nothing
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart
  | DragDrop(int, int);

type state = {style: ReactDOMRe.Style.t};

module Method = {
  let buildDragEndState = state => {
    ...state,
    style:
      ReactUtils.addStyleProp("opacity", "1", state.style)
      |> ReactUtils.addStyleProp("border", TreeNodeUtils.getNoBorderCss()),
  };

  let buildNotDragableUl = TreeNodeUtils.buildNotDragableUl;

  let _renderDragableText =
      (
        (state, send),
        (id, widget, dragImg, name, isShowChildren, isSelected, isActive),
        (onSelectFunc, isWidgetFunc, checkNodeRelationFunc),
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
        _e =>
          send(
            DragEventUtils.handleDragStart(
              id,
              DragStart,
              widget,
              dragImg,
              "move",
              _e,
            ),
          )
      )
      onDragEnd=(_e => send(DragEventUtils.handleDragEnd(DragEnd, _e)))
      onDragEnter=(
        _e =>
          send(
            DragEventUtils.handleDragEnter(
              id,
              (DragEnter, Nothing),
              isWidgetFunc,
              checkNodeRelationFunc,
              _e,
            ),
          )
      )
      onDragLeave=(
        _e => send(DragEventUtils.handleDragLeave(id, DragLeave, _e))
      )
      onDragOver=(e => DragEventUtils.handleDragOver("move", e))
      onDrop=(
        _e =>
          send(
            DragEventUtils.handleDrop(
              id,
              (
                (targetId, removedId) => DragDrop(targetId, removedId),
                DragLeave,
              ),
              isWidgetFunc,
              checkNodeRelationFunc,
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
        (onSelectFunc, isWidgetFunc, checkNodeRelationFunc),
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
          (onSelectFunc, isWidgetFunc, checkNodeRelationFunc),
        )
      )
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
          style:
            ReactUtils.addStyleProp(
              "border",
              TreeNodeUtils.getNoBorderCss(),
              state.style,
            ),
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
      (onSelectFunc, isWidgetFunc, checkNodeRelationFunc),
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
      (onSelectFunc, isWidgetFunc, checkNodeRelationFunc),
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
      ~checkNodeRelation,
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
      (onSelect, isWidget, checkNodeRelation),
      treeChildren,
      self,
    ),
};