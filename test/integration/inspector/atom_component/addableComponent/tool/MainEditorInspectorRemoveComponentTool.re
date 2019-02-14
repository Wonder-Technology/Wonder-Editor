let _removeComponent = ((uiState, dispatchFunc), gameObject, type_) =>
  ComponentBox.Method.removeComponent(
    (uiState, dispatchFunc),
    gameObject,
    type_,
  );

let removeDirectionLightComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (uiState, dispatchFunc),
    gameObject,
    InspectorComponentType.Light,
  );

let removeCameraGroupComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (uiState, dispatchFunc),
    gameObject,
    InspectorComponentType.CameraGroup,
  );

let removeGeometryComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (uiState, dispatchFunc),
    gameObject,
    InspectorComponentType.Geometry,
  );

let removeRenderGroupComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (uiState, dispatchFunc),
    gameObject,
    InspectorComponentType.RenderGroup,
  );

let removeArcballCameraControllerComponent =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (uiState, dispatchFunc),
    gameObject,
    InspectorComponentType.ArcballCameraController,
  );