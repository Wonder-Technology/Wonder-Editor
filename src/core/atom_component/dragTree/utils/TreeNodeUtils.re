let buildNotDragableUl = (treeChildren, isShowChildren, content) =>
  <ul className="wonder-tree-node">
    content
    (isShowChildren ? ReasonReact.array(treeChildren) : ReasonReact.null)
  </ul>;

let getNoBorderCss = () => "3px solid rgba(0,0,0,0)";