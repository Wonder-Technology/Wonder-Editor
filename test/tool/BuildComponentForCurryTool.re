let buildInspectorComponent = (store, addableComponentConfig, ()) =>
  ReactTestRenderer.create(
    <MainEditorInspector
      store
      dispatchFunc=(TestTool.getDispatch())
      addableComponentConfig
    />,
  );

let buildCameraView = () =>
  ReactTestRenderer.create(
    <MainEditorCameraView
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildSceneTree = () =>
  ReactTestRenderer.create(
    <MainEditorSceneTree
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildLight = () =>
  ReactTestRenderer.create(
    <MainEditorLight
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildGeometry = () =>
  ReactTestRenderer.create(
    <MainEditorGeometry
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      currentSceneTreeNode=(GameObjectTool.unsafeGetCurrentSceneTreeNode())
      geometryComponent=(GameObjectTool.getCurrentGameObjectGeometry())
      isShowGeometryGroup=false
    />,
  );
let buildMeshRenderer = () =>
  ReactTestRenderer.create(
    <MainEditorMeshRenderer
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );
let buildMaterial = () =>
  ReactTestRenderer.create(
    <MainEditorMaterial
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      currentSceneTreeNode=(GameObjectTool.unsafeGetCurrentSceneTreeNode())
    />,
  );
let buildBasicMaterial = () =>
  ReactTestRenderer.create(
    <MainEditorBasicMaterial
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      materialComponent=(GameObjectTool.getCurrentGameObjectBasicMaterial())
    />,
  );

let buildLightMaterial = () =>
  ReactTestRenderer.create(
    <MainEditorLightMaterial
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      materialComponent=(GameObjectTool.getCurrentGameObjectLightMaterial())
    />,
  );

let buildInspectorComponent = () =>
  ReactTestRenderer.create(
    <MainEditorInspector
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      addableComponentConfig=(InspectorTool.buildFakeAllShowComponentConfig())
    />,
  );

let buildMainEditorTransformComponent = () =>
  ReactTestRenderer.create(
    <MainEditorTransform
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      gameObject=(GameObjectTool.unsafeGetCurrentSceneTreeNode())
      transformComponent=(GameObjectTool.getCurrentSceneTreeNodeTransform())
    />,
  );

let buildDirectionLight = () =>
  ReactTestRenderer.create(
    <MainEditorDirectionLight
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      lightComponent=(
        GameObjectTool.getCurrentGameObjectDirectionLightComponent()
      )
    />,
  );

let buildCameraProjection = () =>
  ReactTestRenderer.create(
    <MainEditorCameraProjection
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );
let buildPointLight = () =>
  ReactTestRenderer.create(
    <MainEditorPointLight
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      lightComponent=(GameObjectTool.getCurrentGameObjectPointLightComponent())
    />,
  );

let buildHeader = () =>
  ReactTestRenderer.create(
    <Header
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );