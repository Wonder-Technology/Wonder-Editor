open Wonderjs;

let hasBasicMaterialComponent = GameObjectAPI.hasGameObjectBasicMaterialComponent;

let getBasicMaterialComponent = GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent;

let addMeshRendererComponent = GameObjectAPI.addGameObjectMeshRendererComponent;

let addBasicMaterialComponent = GameObjectAPI.addGameObjectBasicMaterialComponent;

let addBoxGeometryComponent = GameObjectAPI.addGameObjectBoxGeometryComponent;

let addPerspectiveCameraProjectionComponent = GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent;

let hasPerspectiveCameraProjectionComponent = GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent;

let getPerspectiveCameraProjectionComponent = GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent;

let addBasicCameraViewComponent = GameObjectAPI.addGameObjectBasicCameraViewComponent;

let hasBasicCameraViewComponent = GameObjectAPI.hasGameObjectBasicCameraViewComponent;

let getBasicCameraViewComponent = GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent;

let getTransformComponent = GameObjectAPI.unsafeGetGameObjectTransformComponent;

let hasTransformComponent = GameObjectAPI.hasGameObjectTransformComponent;

let getBoxGeometryComponent = (gameObject, engineState) => {
  let (gameObject, gameObjectRecord) =
    engineState |> GameObjectAPI.unsafeGetGameObjectGeometryComponent(gameObject);
  gameObjectRecord |> GetComponentGameObjectService.unsafeGetGeometryComponent(gameObject)
};

let hasBoxGeometryComponent = GameObjectAPI.hasGameObjectBoxGeometryComponent;

let getSourceInstanceComponent = GameObjectAPI.unsafeGetGameObjectSourceInstanceComponent;

let hasSourceInstanceComponent = GameObjectAPI.hasGameObjectSourceInstanceComponent;

let addSourceInstanceComponent = GameObjectAPI.addGameObjectSourceInstanceComponent;

let hasMeshRendererComponent = GameObjectAPI.hasGameObjectMeshRendererComponent;