open MainEditorTransformMethod;

let component = ReasonReact.statelessComponent("MainEditorTransform");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (_self) => {
    let (x, y, z) = getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
    <div key="transform" className="transform-component">
      <FloatInput label="X" defaultValue=x onChange=changeX />
      <FloatInput label="Y" defaultValue=y onChange=changeY />
      <FloatInput label="Z" defaultValue=z onChange=changeZ />
    </div>
  }
};