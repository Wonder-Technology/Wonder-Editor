let buildHeader = (store) =>
  ReactTestRenderer.create(<Header store dispatch=(TestTool.getDispatch()) />);

let buildSceneTree = (store) =>
  ReactTestRenderer.create(<MainEditorSceneTree store dispatch=(TestTool.getDispatch()) />);

let buildInspectorComponent = (store, allShowComponentConfig) =>
  ReactTestRenderer.create(
    <MainEditorInspector store dispatch=(TestTool.getDispatch()) allShowComponentConfig />
  );

let buildMainEditorTransformComponent = (store, transformComponent) =>
  ReactTestRenderer.create(
    <MainEditorTransform store dispatch=(TestTool.getDispatch()) transformComponent />
  );