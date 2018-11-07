let buildNotDragableUl = (treeChildren, isShowChildren, content) =>
  <ul className="wonder-tree-node">
    content
    (isShowChildren ? ReasonReact.array(treeChildren) : ReasonReact.null)
  </ul>;

let buildDragableUl =
    (
      send,
      (id, widget, dragImg, treeChildren, isShowChildren),
      content,
      (handleDragStartFunc, handleDrageEndFunc),
    ) =>
  <ul
    className="wonder-tree-node"
    draggable=true
    onDragStart=(
      _e => send(handleDragStartFunc(id, widget, dragImg, "move", _e))
    )
    onDragEnd=(_e => send(handleDrageEndFunc(_e)))>
    content
    (isShowChildren ? ReasonReact.array(treeChildren) : ReasonReact.null)
  </ul>;