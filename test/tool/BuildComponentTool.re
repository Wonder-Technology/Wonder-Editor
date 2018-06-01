let buildHeader = (store) =>
  ReactTestRenderer.create(<Header store dispatchFunc=(TestTool.getDispatch()) />);

let buildSceneTree = (store) =>
  ReactTestRenderer.create(<MainEditorSceneTree store dispatchFunc=(TestTool.getDispatch()) />);

let buildInspectorComponent = (store, allShowComponentConfig) =>
  ReactTestRenderer.create(
    <MainEditorInspector store dispatchFunc=(TestTool.getDispatch()) allShowComponentConfig />
  );

let buildMainEditorTransformComponent = (store, transformComponent) =>
  ReactTestRenderer.create(
    <MainEditorTransform store dispatchFunc=(TestTool.getDispatch()) transformComponent />
  );

let buildMaterialComponent = (materialComponent) =>
  ReactTestRenderer.create(
    <MainEditorBasicMaterial
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      materialComponent
    />
  );

let buildAssetComponent = () =>
  ReactTestRenderer.create(
    <MainEditorAsset store=(TestTool.buildEmptyAppState()) dispatchFunc=(TestTool.getDispatch()) />
  );