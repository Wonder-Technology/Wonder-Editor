let buildNotDragableUl = (treeChildren, isShowChildren, content) =>
  <ul className="wonder-tree-node">
    content
    (isShowChildren ? ReasonReact.array(treeChildren) : ReasonReact.null)
  </ul>;

let getNoBorderCss = () => "3px solid rgba(0,0,0,0)";

let renderChildren = (id, isShowChildren, send, togggleChildren) =>
  <div
    className="item-triangle"
    onMouseDown=(
      event => {
        EventHelper.stopPropagation(
          ReactEventType.convertReactMouseEventToJsEvent(event),
        );

        send(togggleChildren);
      }
    )>
    (
      isShowChildren ?
        <img src="./public/img/down.png" /> :
        <img src="./public/img/right.png" />
    )
  </div>;