open DragEventUtils;

type state = {style: ReactDOMRe.Style.t};

module Method = {
  let buildNotDragableUl = TreeNodeUtils.buildNotDragableUl;

  let buildDragableUl =
      (send, (id, widget, dragImg, treeChildren, isShowChildren), content) =>
    TreeNodeUtils.buildDragableUl(
      send,
      (id, widget, dragImg, treeChildren, isShowChildren),
      content,
      (DragEventUtils.handleDragStart, DragEventUtils.handleDrageEnd),
    );

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
              handleWidgettFunc,
              handleRelationErrorFunc(true),
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
      (onSelectFunc, handleWidgetFunc, handleRelationErrorFunc),
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
          (onSelectFunc, handleWidgetFunc, handleRelationErrorFunc),
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
            (onSelectFunc, handleWidgetFunc, handleRelationErrorFunc),
          ),
        ) :
        Method.buildNotDragableUl(
          treeChildren,
          isShowChildren,
          Method.getContent(
            (state, send),
            (id, icon, name, treeChildren, isShowChildren, isHasChildren),
            (onSelectFunc, handleWidgetFunc, handleRelationErrorFunc),
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