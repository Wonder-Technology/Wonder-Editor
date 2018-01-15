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
  let setCurrentGameObjectLocalPosition = (transformComponent, (x, y, z)) =>
    MainEditorStateView.prepareState()
    |> MainEditorTransformView.setCurrentGameObjectLocalPosition(transformComponent, (x, y, z))
    |> MainEditorStateView.finishState;
  let changeX = (transformComponent, value) => {
    let (_x, y, z) = getCurrentGameObjectLocalPosition(transformComponent);
    setCurrentGameObjectLocalPosition(transformComponent, (value, y, z))
  };
  let changeY = (transformComponent, value) => {
    let (x, _y, z) = getCurrentGameObjectLocalPosition(transformComponent);
    setCurrentGameObjectLocalPosition(transformComponent, (x, value, z))
  };
  let changeZ = (transformComponent, value) => {
    let (x, y, _z) = getCurrentGameObjectLocalPosition(transformComponent);
    setCurrentGameObjectLocalPosition(transformComponent, (x, y, value))
  };
};

let component = ReasonReact.statelessComponent("MainEditorTransform");

let render = (_store, _dispatch, transformComponent, _self) => {
  let (x, y, z) =
    Method.getCurrentGameObjectLocalPosition(transformComponent) |> Method.truncateTransformValue;
  <article className="transform-component">
    <FloatInput label="X" defaultValue=x onChange=(Method.changeX(transformComponent)) />
    <FloatInput label="Y" defaultValue=y onChange=(Method.changeY(transformComponent)) />
    <FloatInput label="Z" defaultValue=z onChange=(Method.changeZ(transformComponent)) />
  </article>
};

let make = (~store: AppStore.appState, ~dispatch, ~transformComponent, _children) => {
  ...component,
  render: (self) => render(store, dispatch, transformComponent, self)
};