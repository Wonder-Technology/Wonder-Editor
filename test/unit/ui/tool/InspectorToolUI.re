open GameObjectComponentParseType;

let buildFakeGameObjectComponentRecord = () =>
  MainEditorGameObjectView.getGameObjectAllComponent();

let buildFakeSpecificGameObjectComponentRecord = () => [|
  {componentName: "transform"},
  {componentName: "material"},
  {componentName: "cameraController"}
|];