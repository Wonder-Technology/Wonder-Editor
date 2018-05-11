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

let buildMaterialComponent = (materialComponent) =>
  ReactTestRenderer.create(
    <MainEditorBasicMaterial
      store=(TestTool.buildEmptyAppState())
      dispatch=(TestTool.getDispatch())
      materialComponent
    />
  );

let buildAssetComponent = () =>
  ReactTestRenderer.create(
    <MainEditorAsset store=(TestTool.buildEmptyAppState()) dispatch=(TestTool.getDispatch()) />
  );

let buildAssetTreeComponent = () =>
  ReactTestRenderer.create(
    <MainEditorAssetTree store=(TestTool.buildEmptyAppState()) dispatch=(TestTool.getDispatch()) />
  );

let buildAssetHeaderComponent = () =>
  ReactTestRenderer.create(
    <MainEditorAssetHeader
      store=(TestTool.buildEmptyAppState())
      dispatch=(TestTool.getDispatch())
    />
  );