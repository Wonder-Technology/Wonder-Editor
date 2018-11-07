open DragEventUtils;

type state = {style: ReactDOMRe.Style.t};

module Method = {
  let buildNotDragableUl = (treeChildren, isShowChildren, content) =>
    <ul className="wonder-tree-node">
      content
      (isShowChildren ? ReasonReact.array(treeChildren) : ReasonReact.null)
    </ul>;
  let buildDragableUl =
      (send, (id, widget, dragImg, treeChildren, isShowChildren), content) =>
    <ul
      className="wonder-tree-node"
      draggable=true
      onDragStart=(
        _e =>
          send(
            DragEventUtils.handleDragStart(id, widget, dragImg, "move", _e),
          )
      )
      onDragEnd=(_e => send(DragEventUtils.handleDrageEnd(_e)))>
      content
      (isShowChildren ? ReasonReact.array(treeChildren) : ReasonReact.null)
    </ul>;

  let getContent =
      (
        (state, send),
        (id, icon, name, treeChildren, isShowChildren, isHasChildren),
        (onSelectFunc, handleWidgettFunc, handleRelationErrorFunc),
      ) =>
    <li
      style=state.style
      draggable=true
      onClick=(_event => onSelectFunc(id))
      onDragEnter=(
        _e =>
          send(
            DragEventUtils.handleDragEnter(
              id,
              handleWidgettFunc,
              handleRelationErrorFunc,
              _e,
            ),
          )
      )
      onDragLeave=(
        _e =>
          send(
            DragEventUtils.handleDragLeave(
              id,
              handleWidgettFunc,
              handleRelationErrorFunc,
              _e,
            ),
          )
      )
      onDragOver=(e => DragEventUtils.handleDragOver("move", e))
      onDrop=(
        _e =>
          send(
            DragEventUtils.handleDrop(
              id,
              handleWidgettFunc,
              handleRelationErrorFunc,
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

let component = ReasonReact.reducerComponent("TreeNode");

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

  | DragEnd => (
      state =>
        ReasonReact.Update({
          ...state,
          style:
            ReactUtils.addStyleProp("opacity", "1", state.style)
            |> ReactUtils.addStyleProp("border", "0px"),
        })
    )

  | DragDrop(targetId, removedId) => (
      _state =>
        ReasonReactUtils.sideEffects(() => onDropFunc((targetId, removedId)))
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
      (onSelectFunc, isWidgetFunc, handleRelationErrorFunc),
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
          (onSelectFunc, isWidgetFunc, handleRelationErrorFunc),
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
            (onSelectFunc, isWidgetFunc, handleRelationErrorFunc),
          ),
        ) :
        Method.buildNotDragableUl(
          treeChildren,
          isShowChildren,
          Method.getContent(
            (state, send),
            (id, icon, name, treeChildren, isShowChildren, isHasChildren),
            (onSelectFunc, isWidgetFunc, handleRelationErrorFunc),
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
  initialState: () => initalState(isSelected, isActive),
  reducer: reducer(isShowChildren, (onDrop, handleToggleShowTreeChildren)),
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
      (onSelect, isWidget, handleRelationError),
      treeChildren,
      self,
    ),
};