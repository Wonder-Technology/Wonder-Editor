let buildInspectorComponent = (uiState, addableComponentConfig, ()) =>
  ReactTestRenderer.create(
    <MainEditorInspector
      uiState
      dispatchFunc=(TestTool.getDispatch())
      addableComponentConfig
    />,
  );

let buildCameraView = () =>
  ReactTestRenderer.create(
    <MainEditorCameraView
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildSceneTree = () =>
  ReactTestRenderer.create(
    <MainEditorSceneTree
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildLight = () =>
  ReactTestRenderer.create(
    <MainEditorLight
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildGeometry = () =>
  ReactTestRenderer.create(
    <MainEditorGeometry
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      currentSceneTreeNode=(GameObjectTool.unsafeGetCurrentSceneTreeNode())
      geometryComponent=(GameObjectTool.getCurrentSceneTreeNodeGeometry())
      isShowGeometryGroup=false
    />,
  );
let buildMeshRenderer = () =>
  ReactTestRenderer.create(
    <MainEditorMeshRenderer
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );
let buildMaterial = () =>
  ReactTestRenderer.create(
    <MainEditorMaterial
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      currentSceneTreeNode=(GameObjectTool.unsafeGetCurrentSceneTreeNode())
    />,
  );
let buildBasicMaterial = () =>
  ReactTestRenderer.create(
    <MainEditorBasicMaterial
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      materialComponent=(GameObjectTool.getCurrentSceneTreeNodeBasicMaterial())
    />,
  );

let buildLightMaterial = () =>
  ReactTestRenderer.create(
    <MainEditorLightMaterial
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      materialComponent=(GameObjectTool.getCurrentSceneTreeNodeLightMaterial())
    />,
  );

let buildInspectorComponent = () =>
  ReactTestRenderer.create(
    <MainEditorInspector
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      addableComponentConfig=(InspectorTool.buildFakeAllShowComponentConfig())
    />,
  );

let buildMainEditorTransformComponent = () =>
  ReactTestRenderer.create(
    <MainEditorTransform
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      gameObject=(GameObjectTool.unsafeGetCurrentSceneTreeNode())
      transformComponent=(GameObjectTool.getCurrentSceneTreeNodeTransform())
    />,
  );

let buildDirectionLight = () =>
  ReactTestRenderer.create(
    <MainEditorDirectionLight
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      lightComponent=(
        GameObjectTool.getCurrentSceneTreeNodeDirectionLightComponent()
      )
    />,
  );

let buildCameraProjection = () =>
  ReactTestRenderer.create(
    <MainEditorCameraProjection
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );
let buildPointLight = () =>
  ReactTestRenderer.create(
    <MainEditorPointLight
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      lightComponent=(GameObjectTool.getCurrentSceneTreeNodePointLightComponent())
    />,
  );

let buildHeader = () =>
  ReactTestRenderer.create(
    <Header
      uiState=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );