let buildHeader = store =>
  ReactTestRenderer.create(
    <Header store dispatchFunc=(TestTool.getDispatch()) />,
  );

let buildSceneTree = store =>
  ReactTestRenderer.create(
    <MainEditorSceneTree store dispatchFunc=(TestTool.getDispatch()) />,
  );

let buildConsole = () =>
  ReactTestRenderer.create(
    <MainEditorConsole
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildCameraProjection = () =>
  ReactTestRenderer.create(
    <MainEditorCameraProjection
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildCameraView = store =>
  ReactTestRenderer.create(
    <MainEditorCameraView store dispatchFunc=(TestTool.getDispatch()) />,
  );
let buildInspectorComponent = (store, addableComponentConfig) =>
  ReactTestRenderer.create(
    <MainEditorInspector
      store
      dispatchFunc=(TestTool.getDispatch())
      addableComponentConfig
    />,
  );

let buildMeshRenderer = store =>
  ReactTestRenderer.create(
    <MainEditorMeshRenderer store dispatchFunc=(TestTool.getDispatch()) />,
  );

let buildGeometry =
    (
      ~geometryComponent,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~isShowGeometryGroup=false,
      (),
    ) =>
  ReactTestRenderer.create(
    <MainEditorGeometry
      store
      dispatchFunc
      currentSceneTreeNode=(GameObjectTool.unsafeGetCurrentSceneTreeNode())
      geometryComponent
      isShowGeometryGroup
    />,
  );

let buildMainEditorTransformComponent = (store, transformComponent) =>
  ReactTestRenderer.create(
    <MainEditorTransform
      store
      dispatchFunc=(TestTool.getDispatch())
      gameObject=(GameObjectTool.unsafeGetCurrentSceneTreeNode())
      transformComponent
    />,
  );

let buildMaterial =
    (
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~isShowMaterialGroup=false,
      (),
    ) =>
  ReactTestRenderer.create(
    <MainEditorMaterial
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      currentSceneTreeNode=(GameObjectTool.unsafeGetCurrentSceneTreeNode())
      isShowMaterialGroup
    />,
  );

let buildBasicMaterial = materialComponent =>
  ReactTestRenderer.create(
    <MainEditorBasicMaterial
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      materialComponent
    />,
  );

let buildLightMaterial = materialComponent =>
  ReactTestRenderer.create(
    <MainEditorLightMaterial
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      materialComponent
    />,
  );

let buildLight = () =>
  ReactTestRenderer.create(
    <MainEditorLight
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildDirectionLight = lightComponent =>
  ReactTestRenderer.create(
    <MainEditorDirectionLight
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      lightComponent
    />,
  );

let buildPointLight = lightComponent =>
  ReactTestRenderer.create(
    <MainEditorPointLight
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      lightComponent
    />,
  );

let buildAssetComponent = () =>
  ReactTestRenderer.create(
    <MainEditorAsset
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );

let buildAssetTree = () =>
  ReactTestRenderer.create(
    <MainEditorAssetTree
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      dragImg=(DomHelper.createElement("img"))
    />,
  );
let buildAssetChildrenNode = (~debounceTime=10, ()) =>
  ReactTestRenderer.create(
    <MainEditorAssetChildrenNode
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
      dragImg=(DomHelper.createElement("img"))
      debounceTime
    />,
  );