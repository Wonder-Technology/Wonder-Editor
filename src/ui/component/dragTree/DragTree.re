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
  let handleDrop = (uid, onDropFinish, event) => {
    let e = DragExternal.convertReactMouseEventToJsEvent(event);
    onDropFinish(uid, DragUtils.getDragedId(e))
  };
};

let component = ReasonReact.reducerComponent("DragTree");

let reducer = (action, state) =>
  switch action {
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("backgroundColor", "rgba(1,1,1,0.7)", state.style)
    })
  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("backgroundColor", "#c0c0c0", state.style)
    })
  };

let render = (treeArrayData, rootUid, onDropFinish, {state, reduce}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-drag-tree">
    (ReasonReact.arrayToElement(treeArrayData))
    <div
      style=state.style
      className="wonder-disable-drag"
      onDragEnter=(reduce(Method.handleDragEnter))
      onDragLeave=(reduce(Method.handleDragLeave))
      onDragOver=Method.handleDragOver
      onDrop=(Method.handleDrop(rootUid, onDropFinish))
    />
  </article>;

let make = (~treeArrayData, ~rootUid, ~onDropFinish, _children) => {
  ...component,
  initialState: () => {style: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ())},
  reducer,
  render: (self) => render(treeArrayData, rootUid, onDropFinish, self)
};