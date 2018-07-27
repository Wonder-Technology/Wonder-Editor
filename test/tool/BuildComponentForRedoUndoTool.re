let buildInspectorComponent = (store, allShowComponentConfig, ()) =>
  ReactTestRenderer.create(
    <MainEditorInspector
      store
      dispatchFunc=(TestTool.getDispatch())
      allShowComponentConfig
    />,
  );

let buildSceneTree = () =>
  ReactTestRenderer.create(
    <MainEditorSceneTree
      store=(TestTool.buildAppStateSceneGraphFromEngine())
      dispatchFunc=(TestTool.getDispatch())
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
      store=(TestTool.buildAppStateSceneGraphFromEngine())
      dispatchFunc=(TestTool.getDispatch())
      allShowComponentConfig=(InspectorTool.buildFakeAllShowComponentConfig())
    />,
  );

let buildMainEditorTransformComponent = () =>
  ReactTestRenderer.create(
    <MainEditorTransform
      store=(TestTool.buildEmptyAppState())
      dispatchFunc=(TestTool.getDispatch())
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

let buildHeader = () =>
  ReactTestRenderer.create(
    <Header
      store=(TestTool.buildAppStateSceneGraphFromEngine())
      dispatchFunc=(TestTool.getDispatch())
    />,
  );