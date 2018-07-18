Css.importCss("./css/dragTree.css");

type state = {style: ReactDOMRe.Style.t};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragDrop(int, int);

module Method = {
  let handleDragEnter = (id, handleFlagFunc, handleRelationErrorFunc, _event) =>
    DragEventBaseUtils.isTriggerDragEnter(
      id,
      handleFlagFunc,
      handleRelationErrorFunc,
    ) ?
      DragEnter : Nothing;

  let handleDragLeave = (id, handleFlagFunc, handleRelationErrorFunc, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    DragEventBaseUtils.isTriggerDragLeave(
      id,
      handleFlagFunc,
      handleRelationErrorFunc,
    ) ?
      DragLeave : Nothing;
  };

  let handleDrop = (uid, handleFlagFunc, handleRelationErrorFunc, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedUid(e);
    DragEventBaseUtils.isTriggerDragDrop(
      uid,
      startId,
      handleFlagFunc,
      handleRelationErrorFunc,
    ) ?
      DragDrop(uid, startId) : DragLeave;
  };
};

let component = ReasonReact.reducerComponent("DragTree");

let reducer = (onDrop, action, state) =>
  switch (action) {
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp(
          "backgroundColor",
          "rgba(0,0,1,1.0)",
          state.style,
        ),
    })

  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("backgroundColor", "#c0c0c0", state.style),
    })

  | DragDrop(targetId, removedId) =>
    ReasonReactUtils.sideEffects(() => onDrop((targetId, removedId)))

  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      treeArray,
      rootUid,
      (handleFlagFunc, handleRelationErrorFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-drag-tree">
    (ReasonReact.arrayToElement(treeArray))
    <div
      style=state.style
      className="wonder-disable-drag"
      onDragEnter=(
        _e =>
          send(
            Method.handleDragEnter(
              rootUid,
              handleFlagFunc,
              handleRelationErrorFunc,
              _e,
            ),
          )
      )
      onDragLeave=(
        _e =>
          send(
            Method.handleDragLeave(
              rootUid,
              handleFlagFunc,
              handleRelationErrorFunc,
              _e,
            ),
          )
      )
      onDragOver=DragEventUtils.handleDragOver
      onDrop=(
        _e =>
          send(
            Method.handleDrop(
              rootUid,
              handleFlagFunc,
              handleRelationErrorFunc,
              _e,
            ),
          )
      )
    />
  </article>;

let make =
    (
      ~treeArray,
      ~rootUid,
      ~onDrop,
      ~isFlag,
      ~handleRelationError,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ()),
  },
  reducer: reducer(onDrop),
  render: self =>
    render(treeArray, rootUid, (isFlag, handleRelationError), self),
};