open GameObjectComponentParseType;

let buildComponentUIComponent = MainEditorInspector.Method._buildComponentUIComponent;

let buildFakeGameObjectComponentRecord = () =>
  MainEditorGameObjectView.getGameObjectAllShowInspectorComponent();

let buildFakeSpecificGameObjectComponentRecord = () => [|
  {componentName: "transform"},
  {componentName: "material"},
  {componentName: "cameraController"}
|];