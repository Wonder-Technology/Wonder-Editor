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
  let getLocalPosition = () =>
    MainEditorStateView.prepareState()
    |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition;
  let setLocalPosition = (x, y, z) =>
    MainEditorStateView.prepareState()
    |> MainEditorComponentView.InspectorView.TransformView.setLocalPosition((x, y, z))
    |> MainEditorStateView.finishState;
  let changeX = (value) => {
    let (x, y, z) = getLocalPosition();
    setLocalPosition(value, y, z)
  };
  let changeY = (value) => {
    let (x, y, z) = getLocalPosition();
    setLocalPosition(x, value, z)
  };
  let changeZ = (value) => {
    let (x, y, z) = getLocalPosition();
    setLocalPosition(x, y, value)
  };
};

let component = ReasonReact.statelessComponent("MainEditorTransform");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (_self) => {
    let (x, y, z) = Method.getLocalPosition() |> Method.truncateTransformValue;
    <article key="transform" className="transform-component">
      <FloatInput label="X" defaultValue=x onChange=Method.changeX />
      <FloatInput label="Y" defaultValue=y onChange=Method.changeY />
      <FloatInput label="Z" defaultValue=z onChange=Method.changeZ />
    </article>
  }
};