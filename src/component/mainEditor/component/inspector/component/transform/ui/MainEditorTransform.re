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
  let getCurrentGameObjectLocalPosition = () =>
    MainEditorStateView.prepareState() |> MainEditorTransformView.getCurrentGameObjectLocalPosition;
  let setCurrentGameObjectLocalPosition = (x, y, z) =>
    MainEditorStateView.prepareState()
    |> MainEditorTransformView.setCurrentGameObjectLocalPosition((x, y, z))
    |> MainEditorStateView.finishState;
  let changeX = (value) => {
    let (_x, y, z) = getCurrentGameObjectLocalPosition();
    setCurrentGameObjectLocalPosition(value, y, z)
  };
  let changeY = (value) => {
    let (x, _y, z) = getCurrentGameObjectLocalPosition();
    setCurrentGameObjectLocalPosition(x, value, z)
  };
  let changeZ = (value) => {
    let (x, y, _z) = getCurrentGameObjectLocalPosition();
    setCurrentGameObjectLocalPosition(x, y, value)
  };
};

let component = ReasonReact.statelessComponent("MainEditorTransform");

let render = (_store, _dispatch, _self) => {
  let (x, y, z) = Method.getCurrentGameObjectLocalPosition() |> Method.truncateTransformValue;
  <article className="transform-component">
    <FloatInput label="X" defaultValue=x onChange=Method.changeX />
    <FloatInput label="Y" defaultValue=y onChange=Method.changeY />
    <FloatInput label="Z" defaultValue=z onChange=Method.changeZ />
  </article>
};

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};