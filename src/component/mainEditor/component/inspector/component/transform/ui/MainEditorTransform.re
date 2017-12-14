let _getLocalPosition = () =>
  MainEditorStateView.prepareState()
  |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition;

let _setLocalPosition = (x, y, z) =>
  MainEditorStateView.prepareState()
  |> MainEditorComponentView.InspectorView.TransformView.setLocalPosition((x, y, z))
  |> MainEditorStateView.finishState;

let component = ReasonReact.statelessComponent("MainEditorTransform");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  let changeX = (value) => {
    let (x, y, z) = _getLocalPosition();
    _setLocalPosition(value, y, z)
  };
  let changeY = (value) => {
    let (x, y, z) = _getLocalPosition();
    _setLocalPosition(x, value, z)
  };
  let changeZ = (value) => {
    let (x, y, z) = _getLocalPosition();
    _setLocalPosition(x, y, value)
  };
  {
    ...component,
    render: (_self) => {
      let (x, y, z) = _getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
      <div key="transform" className="transform-component">
        <FloatInput label="X" defaultValue=x onChange=changeX />
        <FloatInput label="Y" defaultValue=y onChange=changeY />
        <FloatInput label="Z" defaultValue=z onChange=changeZ />
      </div>
    }
  }
};