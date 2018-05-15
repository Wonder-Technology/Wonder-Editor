Css.importCss("./css/dragTree.css");

type state = {style: ReactDOMRe.Style.t};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragDrop(int, int);

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
  let handleDrop = (uid,handleRelation, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    handleRelation(uid, DragUtils.getdragedUid(e))
    |> StateLogicService.getStateToGetData ?
      DragLeave : DragDrop(uid, DragUtils.getdragedUid(e))
  };
};

let component = ReasonReact.reducerComponent("DragTree");

let reducer = (onDrop, action, state) =>
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
  | DragDrop(targetId, removedId) =>
    ReasonReact.SideEffects(
      (
        (_self) =>
          onDrop((
            targetId,
            removedId,
            StateEditorService.getState() |> CurrentSignEditorService.getCurrentSign
          ))
      )
    )
  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (treeArrayData, rootUid, handleSign,handleRelation, {state, reduce}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-drag-tree">
    (ReasonReact.arrayToElement(treeArrayData))
    <div
      style=state.style
      className="wonder-disable-drag"
      onDragEnter=(reduce(Method.handleDragEnter(handleSign)))
      onDragLeave=(reduce(Method.handleDragLeave(handleSign)))
      onDragOver=Method.handleDragOver
      onDrop=(reduce(Method.handleDrop(rootUid,handleRelation)))
    />
  </article>;

let make = (~treeArrayData, ~rootUid, ~onDrop, ~handleSign,~handleRelation, _children) => {
  ...component,
  initialState: () => {style: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ())},
  reducer: reducer(onDrop),
  render: (self) => render(treeArrayData, rootUid, handleSign,handleRelation, self)
};