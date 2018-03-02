let buildHeader = (store) =>
  ReactTestRenderer.create(<Header store dispatch=(TestToolUI.getDispatch()) />);

let buildSceneTree = (store) =>
  ReactTestRenderer.create(<MainEditorSceneTree store dispatch=(TestToolUI.getDispatch()) />);

let buildInspectorComponent = (store, allShowComponentConfig) =>
  ReactTestRenderer.create(
    <MainEditorInspector store dispatch=(TestToolUI.getDispatch()) allShowComponentConfig />
  );

let buildMainEditorTransformComponent = (store, transformComponent) =>
  ReactTestRenderer.create(
    <MainEditorTransform store dispatch=(TestToolUI.getDispatch()) transformComponent />
  );