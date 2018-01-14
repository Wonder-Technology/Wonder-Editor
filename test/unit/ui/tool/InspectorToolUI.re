open GameObjectComponentParseType;

let buildFakeGameObjectComponentRecord = () =>
  MainEditorGameObjectView.getGameObjectAllShowInspectorComponent();

let buildFakeSpecificGameObjectComponentRecord = () => [|
  {componentName: "transform"},
  {componentName: "material"},
  {componentName: "cameraController"}
|];