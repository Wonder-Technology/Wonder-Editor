Css.importCss("./css/dragTree.css");

type state = {style: ReactDOMRe.Style.t};

type action =
  | Nothing
  | DragEnter
  | DragLeave;

module Method = {
  let handleDragEnter = (handleSign, _event) =>
    handleSign(StateEditorService.getState() |> CurrentSignEditorService.getCurrentSign) ?
      DragEnter : Nothing;
  let handleDragLeave = (handleSign, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    handleSign(StateEditorService.getState() |> CurrentSignEditorService.getCurrentSign) ?
      DragLeave : Nothing
  };
  let handleDragOver = (event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.preventDefault(e)
  };
  let handleDrop = (uid, onDrop, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    onDrop((
      uid,
      DragUtils.getdragedUid(e),
      StateEditorService.getState() |> CurrentSignEditorService.getCurrentSign
    ))
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

let render = (treeArrayData, rootUid, onDrop, handleSign, {state, reduce}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-drag-tree">
    (ReasonReact.arrayToElement(treeArrayData))
    <div
      style=state.style
      className="wonder-disable-drag"
      onDragEnter=(reduce(Method.handleDragEnter(handleSign)))
      onDragLeave=(reduce(Method.handleDragLeave(handleSign)))
      onDragOver=Method.handleDragOver
      onDrop=(Method.handleDrop(rootUid, onDrop))
    />
  </article>;

let make = (~treeArrayData, ~rootUid, ~onDrop, ~handleSign, _children) => {
  ...component,
  initialState: () => {style: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ())},
  reducer,
  render: (self) => render(treeArrayData, rootUid, onDrop, handleSign, self)
};