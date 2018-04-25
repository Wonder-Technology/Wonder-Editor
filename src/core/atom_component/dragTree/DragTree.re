Css.importCss("./css/dragTree.css");

type state = {style: ReactDOMRe.Style.t};

type action =
  | DragEnter
  | DragLeave;

module Method = {
  let handleDragEnter = (_event) => DragEnter;
  let handleDragLeave = (event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    DragLeave
  };
  let handleDragOver = (event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    DomHelper.preventDefault(e)
  };
  let handleDrop = (uid, onDrop, event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    onDrop((uid, DragUtils.getdragedUid(e)))
  };
};

let component = ReasonReact.reducerComponent("DragTree");

let reducer = (action, state) =>
  switch action {
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("backgroundColor", "rgba(0,0,1,1.0)", state.style)
    })
  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("backgroundColor", "#c0c0c0", state.style)
    })
  };

let render = (treeArrayData, rootUid, onDrop, {state, reduce}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-drag-tree">
    (ReasonReact.arrayToElement(treeArrayData))
    <div
      style=state.style
      className="wonder-disable-drag"
      onDragEnter=(reduce(Method.handleDragEnter))
      onDragLeave=(reduce(Method.handleDragLeave))
      onDragOver=Method.handleDragOver
      onDrop=(Method.handleDrop(rootUid, onDrop))
    />
  </article>;

let make = (~treeArrayData, ~rootUid, ~onDrop, _children) => {
  ...component,
  initialState: () => {style: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ())},
  reducer,
  render: (self) => render(treeArrayData, rootUid, onDrop, self)
};