Css.importCss("./css/dragTree.css");

external toDomObj : ReactEventRe.Mouse.t => Js.t({..}) = "%identity";

/* TODO rename to _style */
type state = {currentStyle: ReactDOMRe.Style.t};

type action =
  | DragEnter
  | DragLeave;

module Method = {
  let handleDragEnter = (_event) => DragEnter;
  let handleDragLeave = (event) => {
    let e = toDomObj(event);
    e##stopPropagation() |> ignore;
    DragLeave
  };
  let handleDragOver = (event) => {
    let e = toDomObj(event);
    e##preventDefault()
  };
  let handleDrop = (uid, onDropFinish, event) => {
    let e = toDomObj(event);
    onDropFinish(uid, DragUtils.getDragedId(e))
  };
};

let component = ReasonReact.reducerComponent("DragTree");

let reducer = (action, state) =>
  switch action {
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      currentStyle:
        ReactUtils.addStyleProp("backgroundColor", "rgba(1,1,1,0.7)", state.currentStyle)
    })
  | DragLeave =>
    ReasonReact.Update({
      ...state,
      currentStyle: ReactUtils.addStyleProp("backgroundColor", "#c0c0c0", state.currentStyle)
    })
  };

let render = (treeArrayData, rootUid, onDropFinish, {state, reduce}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-drag-tree">
    (ReasonReact.arrayToElement(treeArrayData))
    <div
      style=state.currentStyle
      className="wonder-disable-drag"
      onDragEnter=(reduce(Method.handleDragEnter))
      onDragLeave=(reduce(Method.handleDragLeave))
      onDragOver=Method.handleDragOver
      onDrop=(Method.handleDrop(rootUid, onDropFinish))
    />
  </article>;

let make = (~treeArrayData, ~rootUid, ~onDropFinish, _children) => {
  ...component,
  initialState: () => {currentStyle: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ())},
  reducer,
  /* TODO not use curry */
  render: (_self) => render(treeArrayData, rootUid, onDropFinish, _self)
};