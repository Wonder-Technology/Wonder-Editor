let addChild = (parent, child, (editorState, engineState)) => (
  editorState,
  engineState |> GameObjectLogicCompositeService.addChild(parent, child)
);

let getChildren = (targetGameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicCompositeService.getChildren(targetGameObject);

let hasChildren = (targetGameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicCompositeService.hasChildren(targetGameObject);

let addMeshRendererComponent = (gameObject, component, (editorState, engineState)) => (
  editorState,
  engineState |> GameObjectLogicSingleService.addMeshRendererComponent(gameObject, component)
);

let addMaterialComponent = (gameObject, component, (editorState, engineState)) => (
  editorState,
  engineState |> GameObjectLogicSingleService.addMaterialComponent(gameObject, component)
);

let addGeometryComponent = (gameObject, component, (editorState, engineState)) => (
  editorState,
  engineState |> GameObjectLogicSingleService.addGeometryComponent(gameObject, component)
);

let addCameraControllerComponent = (gameObject, component, (editorState, engineState)) => (
  editorState,
  engineState |> GameObjectLogicSingleService.addCameraControllerComponent(gameObject, component)
);

let hasCameraControllerComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.hasCameraControllerComponent(gameObject);

let getCameraControllerComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.getCameraControllerComponent(gameObject);

let getTransformComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.getTransformComponent(gameObject);

let hasTransformComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.hasTransformComponent(gameObject);

let getGeometryComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.getGeometryComponent(gameObject);

let hasGeometryComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.hasGeometryComponent(gameObject);

let getSourceInstanceComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.getSourceInstanceComponent(gameObject);

let hasSourceInstanceComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.hasSourceInstanceComponent(gameObject);

let addSourceInstanceComponent = (gameObject, component, (editorState, engineState)) => (
  editorState,
  engineState |> GameObjectLogicSingleService.addSourceInstanceComponent(gameObject, component)
);

let hasMeshRendererComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.hasMeshRendererComponent(gameObject);

let initGameObject = (gameObject, (editorState, engineState)) => (
  editorState,
  engineState |> GameObjectLogicSingleService.initGameObject(gameObject)
);

let hasMaterialComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.hasMaterialComponent(gameObject);

let getMaterialComponent = (gameObject, (editorState, engineState)) =>
  engineState |> GameObjectLogicSingleService.getMaterialComponent(gameObject);

let disposeGameObjectLogicSingleService = (gameObject, (editorState, engineState)) => (
  editorState,
  engineState |> GameObjectLogicSingleService.disposeGameObject(gameObject)
);