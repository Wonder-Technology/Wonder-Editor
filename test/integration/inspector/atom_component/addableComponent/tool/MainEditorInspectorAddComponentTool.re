let _addComponent = ((store, dispatchFunc), gameObject, type_) =>
  AddableComponent.Method.addSpecificComponent(
    (store, dispatchFunc),
    gameObject,
    type_,
  );

let addDirectionLightComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent((store, dispatchFunc), gameObject, "Light");

let addCameraGroupComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent((store, dispatchFunc), gameObject, "CameraGroup");

let addGeometryComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent((store, dispatchFunc), gameObject, "Geometry");

let addRenderGroupComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent((store, dispatchFunc), gameObject, "RenderGroup");

let addArcballCameraControllerComponent =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      (),
    ) =>
  _addComponent(
    (store, dispatchFunc),
    gameObject,
    "ArcballCameraController",
  );

let buildTwoAddedArcballCameraControllerCamera = sandbox => {
  let (camera1, camera2, cube) =
    SceneTreeTool.buildTwoCameraSceneGraphToEngine(sandbox);

  camera1 |> GameObjectTool.setCurrentSceneTreeNode;

  addArcballCameraControllerComponent();

  camera2 |> GameObjectTool.setCurrentSceneTreeNode;
  addArcballCameraControllerComponent();

  (camera1, camera2);
};