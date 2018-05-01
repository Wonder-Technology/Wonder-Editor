Css.importCss("./css/dragTree.css");

type state = {style: ReactDOMRe.Style.t};

type action =
  | Nothing
  | DragEnter
  | DragLeave;

module Method = {
  let handleDragEnter = (sign, _event) =>
    StateEditorService.getState() |> CurrentTreeEditorService.getCurrenttree == sign ?
      DragEnter : Nothing;
  let handleDragLeave = (sign, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    StateEditorService.getState() |> CurrentTreeEditorService.getCurrenttree == sign ?
      DragLeave : Nothing
  };
  let handleDragOver = (event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.preventDefault(e)
  };
  let handleDrop = (uid, onDrop, sign, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    StateEditorService.getState() |> CurrentTreeEditorService.getCurrenttree == sign ?
      onDrop((uid, DragUtils.getdragedUid(e))) : WonderLog.Log.print("can't drop") |> ignore
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
  | Nothing => ReasonReact.NoUpdate
  };

let render = (treeArrayData, rootUid, onDrop, sign, {state, reduce}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-drag-tree">
    (ReasonReact.arrayToElement(treeArrayData))
    <div
      style=state.style
      className="wonder-disable-drag"
      onDragEnter=(reduce(Method.handleDragEnter(sign)))
      onDragLeave=(reduce(Method.handleDragLeave(sign)))
      onDragOver=Method.handleDragOver
      onDrop=(Method.handleDrop(rootUid, onDrop, sign))
    />
  </article>;

let make = (~treeArrayData, ~rootUid, ~onDrop, ~sign, _children) => {
  ...component,
  initialState: () => {style: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ())},
  reducer,
  render: (self) => render(treeArrayData, rootUid, onDrop, sign, self)
};