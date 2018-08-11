open DragEventUtils;

type state = {style: ReactDOMRe.Style.t};

module Method = {
  let buildNotDragableUl = (treeChildren, content) =>
    <ul className="wonder-tree-node">
      content
      (ReasonReact.arrayToElement(treeChildren))
    </ul>;
  let buildDragableUl = (send, (uid, widge, dragImg, treeChildren), content) =>
    <ul
      className="wonder-tree-node"
      draggable=true
      onDragStart=(
        _e => send(DragEventUtils.handleDragStart(uid, widge, dragImg, _e))
      )
      onDragEnd=(_e => send(DragEventUtils.handleDrageEnd(_e)))>
      content
      (ReasonReact.arrayToElement(treeChildren))
    </ul>;
  let getContent =
      (
        (state, send),
        (uid, icon, name),
        (onSelectFunc, handleWidgeFunc, handleRelationErrorFunc),
      ) =>
    <li style=state.style onClick=(_event => onSelectFunc(uid))>
      <div
        className="item-ground"
        draggable=true
        onDragEnter=(
          _e =>
            send(
              DragEventUtils.handleDragEnter(
                uid,
                handleWidgeFunc,
                handleRelationErrorFunc,
                _e,
              ),
            )
        )
        onDragLeave=(
          _e =>
            send(
              DragEventUtils.handleDragLeave(
                uid,
                handleWidgeFunc,
                handleRelationErrorFunc,
                _e,
              ),
            )
        )
        onDragOver=DragEventUtils.handleDragOver
        onDrop=(
          _e =>
            send(
              DragEventUtils.handleDrop(
                uid,
                handleWidgeFunc,
                handleRelationErrorFunc,
                _e,
              ),
            )
        )
      />
      (
        switch (icon) {
        | None => ReasonReact.nullElement
        | Some(icon) => <img src=icon />
        }
      )
      (DomHelper.textEl(name))
    </li>;
};

let component = ReasonReact.reducerComponent("TreeNode");

let reducer = (onDropFunc, action) =>
  switch (action) {
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
            ReactUtils.addStyleProp("border", "2px dashed blue", state.style),
        })
    )

  | DragLeave => (
      state =>
        ReasonReact.Update({
          ...state,
          style:
            ReactUtils.addStyleProp("border", "1px solid red", state.style),
        })
    )

  | DragEnd => (
      state =>
        ReasonReact.Update({
          ...state,
          style:
            ReactUtils.addStyleProp("opacity", "1", state.style)
            |> ReactUtils.addStyleProp("border", "1px solid red"),
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
      (uid, name, widge, dragImg, icon, isDragable),
      (onSelectFunc, handleWidgeFunc, handleRelationErrorFunc),
      treeChildren,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let _buildContent = () =>
    switch (isDragable) {
    | None =>
      Method.buildDragableUl(
        send,
        (uid, widge, dragImg, treeChildren),
        Method.getContent(
          (state, send),
          (uid, icon, name),
          (onSelectFunc, handleWidgeFunc, handleRelationErrorFunc),
        ),
      )
    | Some(isDragable) =>
      isDragable ?
        Method.buildDragableUl(
          send,
          (uid, widge, dragImg, treeChildren),
          Method.getContent(
            (state, send),
            (uid, icon, name),
            (onSelectFunc, handleWidgeFunc, handleRelationErrorFunc),
          ),
        ) :
        Method.buildNotDragableUl(
          treeChildren,
          Method.getContent(
            (state, send),
            (uid, icon, name),
            (onSelectFunc, handleWidgeFunc, handleRelationErrorFunc),
          ),
        )
    };

  _buildContent();
};

let initalState = (isSelected, isActive) =>
  isSelected ?
    isActive ?
      {style: ReactDOMRe.Style.make(~background="red", ())} :
      {style: ReactDOMRe.Style.make(~background="#c0c0c0", ())} :
    {style: ReactDOMRe.Style.make(~border="1px solid red", ())};

let make =
    (
      ~uid,
      ~name,
      ~isSelected,
      ~isActive,
      ~dragImg,
      ~widge,
      ~icon: option(string)=?,
      ~isDragable: option(bool)=?,
      ~onSelect,
      ~onDrop,
      ~isWidge,
      ~handleRelationError,
      ~treeChildren,
      _children,
    ) => {
  ...component,
  initialState: () => initalState(isSelected, isActive),
  reducer: reducer(onDrop),
  render: self =>
    render(
      (uid, name, widge, dragImg, icon, isDragable),
      (onSelect, isWidge, handleRelationError),
      treeChildren,
      self,
    ),
};