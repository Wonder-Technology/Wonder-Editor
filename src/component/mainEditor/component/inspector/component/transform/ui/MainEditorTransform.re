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
  let changeValue = MainEditorTransformChangeEventHandler.MakeMainEditorTransformChangeEventHandler.onChange;
};

let component = ReasonReact.statelessComponent("MainEditorTransform");

let render = (store, dispatch, transformComponent, _self) => {
  let (x, y, z) =
    Method.getCurrentGameObjectLocalPosition(transformComponent) |> Method.truncateTransformValue;
  <article className="transform-component">
    <FloatInput
      label="X"
      defaultValue=x
      onChange=(Method.changeValue((store, dispatch), (transformComponent, "x")))
    />
    <FloatInput
      label="Y"
      defaultValue=y
      onChange=(Method.changeValue((store, dispatch), (transformComponent, "y")))
    />
    <FloatInput
      label="Z"
      defaultValue=z
      onChange=(Method.changeValue((store, dispatch), (transformComponent, "z")))
    />
  </article>
};

let make = (~store: AppStore.appState, ~dispatch, ~transformComponent, _children) => {
  ...component,
  render: (self) => render(store, dispatch, transformComponent, self)
};