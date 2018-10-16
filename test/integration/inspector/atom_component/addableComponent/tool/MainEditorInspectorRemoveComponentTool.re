let _removeComponent = ((store, dispatchFunc), gameObject, type_) =>
  ComponentBox.Method.removeComponent(
    (store, dispatchFunc),
    gameObject,
    type_,
  );

let removeDirectionLightComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (store, dispatchFunc),
    gameObject,
    InspectorComponentType.Light,
  );

let removeCameraGroupComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (store, dispatchFunc),
    gameObject,
    InspectorComponentType.CameraGroup,
  );

let removeGeometryComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (store, dispatchFunc),
    gameObject,
    InspectorComponentType.Geometry,
  );

let removeRenderGroupComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (store, dispatchFunc),
    gameObject,
    InspectorComponentType.RenderGroup,
  );

let removeArcballCameraControllerComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _removeComponent(
    (store, dispatchFunc),
    gameObject,
    InspectorComponentType.ArcballCameraController,
  );