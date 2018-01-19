module ChangeEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (Wonderjs.TransformType.transform, string);
  type dataTuple = Js.Typed_array.Float32Array.elt;
  let _getCurrentGameObjectLocalPosition = (transformComponent) =>
    MainEditorStateView.prepareState()
    |> MainEditorTransformView.getCurrentGameObjectLocalPosition(transformComponent);
  let _setCurrentGameObjectLocalPosition = (transformComponent, (x, y, z)) =>
    MainEditorStateView.prepareState()
    |> MainEditorTransformView.setCurrentGameObjectLocalPosition(transformComponent, (x, y, z))
    |> MainEditorStateView.finishState;
  let onChange = ((store: AppStore.appState, dispatch), (transformComponent, type_), value) => {
    let (x, y, z) = _getCurrentGameObjectLocalPosition(transformComponent);
    switch type_ {
    | "x" => _setCurrentGameObjectLocalPosition(transformComponent, (value, y, z))
    | "y" => _setCurrentGameObjectLocalPosition(transformComponent, (x, value, z))
    | "z" => _setCurrentGameObjectLocalPosition(transformComponent, (x, y, value))
    | _ =>
      WonderLog.Log.error(
        WonderLog.Log.buildErrorMessage(
          ~title="onChange",
          ~description={j|TransformEventHandler type:$type_ is error|j},
          ~reason="",
          ~solution={j|set type:$type_ in (x,y,z)|j},
          ~params={j|type:$type_|j}
        )
      )
    }
  };
};

module MakeMainEditorTransformChangeEventHandler =
  EventHandler.MakeEventHandler(ChangeEventHandler);