let create = MainEditorGameObjectAdaptor.create;

let initGameObject = MainEditorGameObjectAdaptor.initGameObject;

let addChild = (parent, child, state) =>
  MainEditorTransformAdaptor.setParent(
    MainEditorGameObjectAdaptor.getTransformComponent(parent, state),
    MainEditorGameObjectAdaptor.getTransformComponent(child, state),
    state
  );

let getChildren = (gameObject, state) =>
  MainEditorTransformAdaptor.getChildren(
    MainEditorGameObjectAdaptor.getTransformComponent(gameObject, state),
    state
  )
  |> Js.Array.map((transform) => MainEditorTransformAdaptor.getGameObject(transform, state));

let hasChildren = (gameObject, state) => getChildren(gameObject, state) |> Js.Array.length > 0;

let hasTransformComponent = MainEditorGameObjectAdaptor.hasTransformComponent;

let getTransformComponent = MainEditorGameObjectAdaptor.getTransformComponent;

let hasMaterialComponent = MainEditorGameObjectAdaptor.hasMaterialComponent;

let getMaterialComponent = MainEditorGameObjectAdaptor.getMaterialComponent;

let hasCameraControllerComponent = MainEditorGameObjectAdaptor.hasGameObjectCameraControllerComponent;

let getCameraControllerComponent = MainEditorGameObjectAdaptor.getGameObjectCameraControllerComponent;

let disposeGameObject = MainEditorGameObjectAdaptor.disposeGameObject;

let hasBoxGeometryComponent = MainEditorGameObjectAdaptor.hasGeometryComponent;

let getBoxGeometryComponent = MainEditorGameObjectAdaptor.getGeometryComponent;

let hasGameObjectSourceInstanceComponent = MainEditorGameObjectAdaptor.hasGameObjectSourceInstanceComponent;

let getGameObjectSourceInstanceComponent = MainEditorGameObjectAdaptor.getGameObjectSourceInstanceComponent;