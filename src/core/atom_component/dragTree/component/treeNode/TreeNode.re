open DragEventUtils;

Css.importCss("./css/treeNode.css");

type state = {style: ReactDOMRe.Style.t};

let component = ReasonReact.reducerComponent("TreeNode");

let reducer = (funcTuple, action) =>
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
      _state => {
        let (_onSelect, onDrop, _handleFlag, _handleRelationError) = funcTuple;
        let (flag, _) =
          StateEditorService.getState()
          |> CurrentDragSourceEditorService.getCurrentDragSource;
        ReasonReactUtils.sideEffects(() =>
          onDrop((targetId, removedId, flag))
        );
      }
    )
  | Nothing => (state => ReasonReact.NoUpdate)
  };

let render =
    (
      attributeTuple,
      funcTuple,
      treeChildren,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let (uid, name, _isSelected, _isActive, _dragImg, flag, icon, isDragable) = attributeTuple;
  let (onSelect, _onDrop, handleFlag, handleRelationError) = funcTuple;
  let _buildNotDragableUl = content =>
    <ul className="wonder-tree-node">
      content
      (ReasonReact.arrayToElement(treeChildren))
    </ul>;
  let _buildDragableUl = content =>
    <ul
      className="wonder-tree-node"
      draggable=true
      onDragStart=(
        _e =>
          send(
            DragEventUtils.handleDragStart(
              uid,
              flag,
              DomHelper.createElement("img"),
              _e,
            ),
          )
      )
      onDragEnd=(_e => send(DragEventUtils.handleDrageEnd(_e)))>
      content
      (ReasonReact.arrayToElement(treeChildren))
    </ul>;
  let _getContent = () =>
    <li style=state.style onClick=(_event => onSelect(uid))>
      <div
        className="item-ground"
        draggable=true
        onDragEnter=(
          _e =>
            send(
              DragEventUtils.handleDragEnter(
                uid,
                handleFlag,
                handleRelationError,
                _e,
              ),
            )
        )
        onDragLeave=(
          _e =>
            send(
              DragEventUtils.handleDragLeave(
                uid,
                handleFlag,
                handleRelationError,
                _e,
              ),
            )
        )
        onDragOver=DragEventUtils.handleDragOver
        onDrop=(
          _e => send(DragEventUtils.handleDrop(uid, handleRelationError, _e))
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
  switch (isDragable) {
  | None => _buildDragableUl(_getContent())
  | Some(isDragable) =>
    isDragable ?
      _buildDragableUl(_getContent()) : _buildNotDragableUl(_getContent())
  };
};

let make = (~attributeTuple, ~funcTuple, ~treeChildren, _children) => {
  ...component,
  initialState: () => {
    let (
      _uid,
      _name,
      isSelected,
      isActive,
      _dragImg,
      _flag,
      _icon,
      _isDragable,
    ) = attributeTuple;
    isSelected ?
      isActive ?
        {style: ReactDOMRe.Style.make(~background="red", ())} :
        {style: ReactDOMRe.Style.make(~background="#c0c0c0", ())} :
      {style: ReactDOMRe.Style.make(~border="1px solid red", ())};
  },
  reducer: reducer(funcTuple),
  render: self => render(attributeTuple, funcTuple, treeChildren, self),
};