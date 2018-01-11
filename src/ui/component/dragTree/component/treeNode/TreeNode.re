Css.importCss("./css/treeNode.css");

/* TODO duplication: move to external folder */
/* TODO rename to convertReactMouseEventToJsEvent */
external toDomObj : ReactEventRe.Mouse.t => Js.t({..}) = "%identity";

type state = {currentStyle: ReactDOMRe.Style.t};

type action =
  | DragEnter
  | DragLeave
  | DragStart;

module Method = {
  let handleClick = (onSelect, uid, event) => onSelect(uid);
  let handleDragStart = (uid, event) => {
    let e = toDomObj(event);
    e##stopPropagation() |> ignore;
    e##dataTransfer##effectAllowed#="move";
    e##dataTransfer##setData("dragedId", uid) |> ignore;
    DragStart
  };
  let handleDragEnter = (_event) => DragEnter;
  let handleDragLeave = (_event) => DragLeave;
  /* TODO dragId shouldn't be store in event
     make sure that the logic of operate dragId should only in TreeNode, not in DragTree
     store dragId in state/store? */
  let handleDragOver = (event) => {
    let e = toDomObj(event);
    e##preventDefault()
  };
  let handleDrop = (uid, onDropFinish, event) => {
    let e = toDomObj(event);
    onDropFinish(uid, DragUtils.getDragedId(e))
  };
};

let component = ReasonReact.reducerComponent("TreeNode");

let reducer = (action, state) =>
  switch action {
  | DragStart =>
    ReasonReact.Update({
      ...state,
      currentStyle: ReactUtils.addStyleProp("opacity", "0.2", state.currentStyle)
    })
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      currentStyle: ReactUtils.addStyleProp("border", "2px dashed blue", state.currentStyle)
    })
  | DragLeave =>
    ReasonReact.Update({
      ...state,
      currentStyle: ReactUtils.addStyleProp("border", "0", state.currentStyle)
    })
  };

let render =
    (attributeTuple, eventHandleTuple, treeChildren, {state, reduce}: ReasonReact.self('a, 'b, 'c)) => {
  let (uid, name) = attributeTuple;
  let (onSelect, onDropFinish) = eventHandleTuple;
  <ul
    className="wonder-tree-node"
    draggable=Js.true_
    onDragStart=(reduce(Method.handleDragStart(uid)))>
    <li
      style=state.currentStyle
      onDragEnter=(reduce(Method.handleDragEnter))
      onDragLeave=(reduce(Method.handleDragLeave))
      onDragOver=(reduce(Method.handleDragOver))
      onDrop=(Method.handleDrop(uid, onDropFinish))
      onClick=((e) => Method.handleClick(onSelect, uid, e))>
      (DomHelper.textEl(name))
    </li>
    (
      switch treeChildren {
      | None => ReasonReact.nullElement
      | Some(trees) => ReasonReact.arrayToElement(trees)
      }
    )
  </ul>
};

let make =
    (
      ~attributeTuple,
      ~eventHandleTuple,
      ~treeChildren: option(array(ReasonReact.reactElement))=?,
      _children
    ) => {
  ...component,
  initialState: () => {currentStyle: ReactDOMRe.Style.make(~opacity="1", ())},
  reducer,
  render: render(attributeTuple, eventHandleTuple, treeChildren)
};