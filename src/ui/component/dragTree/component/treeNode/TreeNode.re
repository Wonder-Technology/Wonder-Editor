Css.importCss("./css/treeNode.css");

type state = {style: ReactDOMRe.Style.t};

type action =
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart;

/* TODO not use variable use "_xxx", conflict variable use "xxx_" */
module Method = {
  let handleClick = (onSelect, uid, _event) => onSelect(uid);
  let handleDragStart = (uid, event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    DragUtils.setDataTransferEffectIsMove(e);
    DragUtils.setDragedId(uid, e);
    DragStart
  };
  let handleDragEnter = (_event) => DragEnter;
  let handleDragLeave = (_event) => DragLeave;
  let handleDragOver = (event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    DomHelper.preventDefault(e)
  };
  let handleDrop = (uid, onDropFinish, event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    onDropFinish(uid, DragUtils.getDragedId(e))
  };
  let handleDrageEnd = (_event) => DragEnd;
};

let component = ReasonReact.reducerComponent("TreeNode");

let reducer = (action, state) =>
  switch action {
  | DragStart =>
    ReasonReact.Update({...state, style: ReactUtils.addStyleProp("opacity", "0.2", state.style)})
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("border", "2px dashed blue", state.style)
    })
  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("border", "1px solid red", state.style)
    })
  | DragEnd =>
    Js.log("end");
    ReasonReact.Update({...state, style: ReactUtils.addStyleProp("opacity", "1", state.style)})
  };

let render =
    (attributeTuple, eventHandleTuple, treeChildren, {state, reduce}: ReasonReact.self('a, 'b, 'c)) => {
  let (uid, name) = attributeTuple;
  let (onSelect, onDropFinish) = eventHandleTuple;
  <ul
    className="wonder-tree-node"
    draggable=Js.true_
    onDragStart=(reduce(Method.handleDragStart(uid)))
    onDragEnd=(reduce(Method.handleDrageEnd))>
    <li
      style=state.style
      onDragEnter=(reduce(Method.handleDragEnter))
      onDragLeave=(reduce(Method.handleDragLeave))
      onDragOver=Method.handleDragOver
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
  initialState: () => {style: ReactDOMRe.Style.make(~opacity="1", ())},
  reducer,
  render: render(attributeTuple, eventHandleTuple, treeChildren)
};