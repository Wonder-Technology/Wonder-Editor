
type state = {style: ReactDOMRe.Style.t};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragDrop(int, int);

module Method = {
  let handleDragEnter = (id, handleWidgeFunc, handleRelationErrorFunc, _event) =>
    DragEventBaseUtils.isTriggerDragEnter(
      id,
      handleWidgeFunc,
      handleRelationErrorFunc,
    ) ?
      DragEnter : Nothing;

  let handleDragLeave = (id, handleWidgeFunc, handleRelationErrorFunc, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    DragEventBaseUtils.isTriggerDragLeave(
      id,
      handleWidgeFunc,
      handleRelationErrorFunc,
    ) ?
      DragLeave : Nothing;
  };

  let handleDrop = (uid, handleWidgeFunc, handleRelationErrorFunc, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedUid(e);
    DragEventBaseUtils.isTriggerDragDrop(
      uid,
      startId,
      handleWidgeFunc,
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
      (handleWidgeFunc, handleRelationErrorFunc),
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
              handleWidgeFunc,
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
              handleWidgeFunc,
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
              handleWidgeFunc,
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
      ~isWidge,
      ~handleRelationError,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ()),
  },
  reducer: reducer(onDrop),
  render: self =>
    render(treeArray, rootUid, (isWidge, handleRelationError), self),
};