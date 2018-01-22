module Method = {
  let truncateTransformValue = ((x, y, z)) => {
    open OperateFloatUtils;
    let truncateLen = 6;
    (
      truncateFloatValue(x, truncateLen),
      truncateFloatValue(y, truncateLen),
      truncateFloatValue(z, truncateLen)
    )
  };
  let getCurrentGameObjectLocalPosition = (transformComponent) =>
    MainEditorStateView.prepareState()
    |> MainEditorTransformView.getCurrentGameObjectLocalPosition(transformComponent);
  let onFinish = MainEditorTransformFinishEventHandler.MakeEventHandler.onFinish;
  let _setCurrentGameObjectLocalPosition = (transformComponent, (x, y, z)) =>
    MainEditorStateView.prepareState()
    |> MainEditorTransformView.setCurrentGameObjectLocalPosition(transformComponent, (x, y, z))
    |> MainEditorStateView.finishState;
  let onChange = ((transformComponent, type_), value) => {
    let (x, y, z) = getCurrentGameObjectLocalPosition(transformComponent);
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

let component = ReasonReact.statelessComponent("MainEditorTransform");

let render = (store, dispatch, transformComponent, _self) => {
  let (x, y, z) =
    Method.getCurrentGameObjectLocalPosition(transformComponent) |> Method.truncateTransformValue;
  <article className="transform-component">
    <FloatInput
      label="X"
      defaultValue=x
      onChange=(Method.onChange((transformComponent, "x")))
      onFinish=(Method.onFinish((store, dispatch), ()))
    />
    <FloatInput
      label="Y"
      defaultValue=y
      onChange=(Method.onChange((transformComponent, "y")))
      onFinish=(Method.onFinish((store, dispatch), ()))
    />
    <FloatInput
      label="Z"
      defaultValue=z
      onChange=(Method.onChange((transformComponent, "z")))
      onFinish=(Method.onFinish((store, dispatch), ()))
    />
  </article>
};

let make = (~store: AppStore.appState, ~dispatch, ~transformComponent, _children) => {
  ...component,
  render: (self) => render(store, dispatch, transformComponent, self)
};