Css.importCss("./css/treeNode.css");

type state = {style: ReactDOMRe.Style.t};

type action =
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart;

module Method = {
  let handleDragStart = (uid, event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    DragUtils.setDataTransferEffectIsMove(e);
    DragUtils.setdragedUid(uid, e);
    DragStart
  };
  let handleDragEnter = (_event) => DragEnter;
  let handleDragLeave = (_event) => DragLeave;
  let handleDragOver = (event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    DomHelper.preventDefault(e)
  };
  let handleDrop = (uid, onDrop, event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    onDrop((uid, DragUtils.getdragedUid(e)))
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
    ReasonReact.Update({...state, style: ReactUtils.addStyleProp("opacity", "1", state.style)})
  };

let render =
    (attributeTuple, eventHandleTuple, treeChildren, {state, reduce}: ReasonReact.self('a, 'b, 'c)) => {
  let (uid, name, _) = attributeTuple;
  let (onSelect, onDrop) = eventHandleTuple;
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
      onDrop=(Method.handleDrop(uid, onDrop))
      onClick=((_event) => onSelect(uid))>
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
  initialState: () => {
    let (uid, name, isSelected) = attributeTuple;
    isSelected ?
      {style: ReactDOMRe.Style.make(~background="red", ())} :
      {style: ReactDOMRe.Style.make(~opacity="1", ())}
  },
  reducer,
  render: (self) => render(attributeTuple, eventHandleTuple, treeChildren, self)
};