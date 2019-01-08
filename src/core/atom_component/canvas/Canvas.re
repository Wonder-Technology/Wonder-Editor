/* type action =
   | Nothing
   | DragEnter
   | DragLeave
   | DragWDB(int); */

module Method = {
  let handleDragEnter = (isWDBAssetFileFunc, _event) =>
    /* isWDBAssetFileFunc() ? DragEnter : Nothing; */
    ();

  let handleDragLeave = event => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);

    ();
  };

  let handleDrop = ((isWDBAssetFileFunc, dragWDBFunc), event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startId = DragUtils.getDragedId(e);

    DomHelper.preventDefault(e);

    isWDBAssetFileFunc() ?
      {
        let wdbGameObjectUid =
          StateEditorService.getState()
          |> WDBNodeAssetEditorService.unsafeGetNodeData(startId)
          |> (({wdbGameObject}: NodeAssetType.wdbNodeData) => wdbGameObject);

        dragWDBFunc(wdbGameObjectUid);
      } :
      ();
  };
};

let component = ReasonReact.statelessComponent("Canvas");

/* let reducer = (dragWDB, action, state) =>
   switch (action) {
   | DragEnter => ReasonReact.NoUpdate

   | DragLeave => ReasonReact.NoUpdate

   | DragWDB(wdbGameObjectUid) =>
     ReasonReactUtils.sideEffects(() => dragWDB(wdbGameObjectUid))

   | Nothing => ReasonReact.NoUpdate
   }; */

let render =
    (
      domId,
      (isWDBAssetFileFunc, dragWDBFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <canvas
    id=domId
    onDragEnter=(_e => send(Method.handleDragEnter(isWDBAssetFileFunc, _e)))
    onDragLeave=(_e => send(Method.handleDragLeave(_e)))
    onDragOver=(e => DragEventUtils.handleDragOver("copy", e))
    onDrop=(
      _e => send(Method.handleDrop((isWDBAssetFileFunc, dragWDBFunc), _e))
    )
  />;

let make = (~domId, ~dragWDB, ~isWDBAssetFile, _children) => {
  ...component,
  render: self => render(domId, (isWDBAssetFile, dragWDB), self),
};