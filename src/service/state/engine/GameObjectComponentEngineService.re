open Wonderjs;

/* light material */

let hasLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent;

let getLightMaterialComponent = GameObjectAPI.unsafeGetGameObjectLightMaterialComponent;

let addLightMaterialComponent = GameObjectAPI.addGameObjectLightMaterialComponent;

/* basic material */

let hasBasicMaterialComponent = GameObjectAPI.hasGameObjectBasicMaterialComponent;

let getBasicMaterialComponent = GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent;

let addBasicMaterialComponent = GameObjectAPI.addGameObjectBasicMaterialComponent;

/* mesh renderer */

let addMeshRendererComponent = GameObjectAPI.addGameObjectMeshRendererComponent;

let getMeshRendererComponent = GameObjectAPI.unsafeGetGameObjectMeshRendererComponent;

let hasMeshRendererComponent = GameObjectAPI.hasGameObjectMeshRendererComponent;

/* geometry */

let addBoxGeometryComponent = GameObjectAPI.addGameObjectBoxGeometryComponent;

let getGeometryComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectAPI.unsafeGetGameObjectGeometryComponent(gameObject);

let hasBoxGeometryComponent = GameObjectAPI.hasGameObjectBoxGeometryComponent;

/* perspective camera projection */

let addPerspectiveCameraProjectionComponent = GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent;

let hasPerspectiveCameraProjectionComponent = GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent;

let getPerspectiveCameraProjectionComponent = GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent;

/* camera view */

let addBasicCameraViewComponent = GameObjectAPI.addGameObjectBasicCameraViewComponent;

let hasBasicCameraViewComponent = GameObjectAPI.hasGameObjectBasicCameraViewComponent;

let getBasicCameraViewComponent = GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent;

/* transform */

let getTransformComponent = GameObjectAPI.unsafeGetGameObjectTransformComponent;

let hasTransformComponent = GameObjectAPI.hasGameObjectTransformComponent;

/* source instance */
let getSourceInstanceComponent = GameObjectAPI.unsafeGetGameObjectSourceInstanceComponent;

let hasSourceInstanceComponent = GameObjectAPI.hasGameObjectSourceInstanceComponent;

let addSourceInstanceComponent = GameObjectAPI.addGameObjectSourceInstanceComponent;

/* direction light */

let addDirectionLightComponent = GameObjectAPI.addGameObjectDirectionLightComponent;

let disposeDirectionLightComponent = GameObjectAPI.disposeGameObjectDirectionLightComponent;

let getDirectionLightComponent = GameObjectAPI.unsafeGetGameObjectDirectionLightComponent;

let hasDirectionLightComponent = GameObjectAPI.hasGameObjectDirectionLightComponent;

/* point light */
let addPointLightComponent = GameObjectAPI.addGameObjectPointLightComponent;
let disposePointLightComponent = GameObjectAPI.disposeGameObjectPointLightComponent;

let unsafeGetPointLightComponent = GameObjectAPI.unsafeGetGameObjectPointLightComponent;

let hasPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent;

/* arcball camera */

let addArcballCameraControllerComponent = GameObjectAPI.addGameObjectArcballCameraControllerComponent;
let disposeArcballCameraControllerComponent = GameObjectAPI.disposeGameObjectArcballCameraControllerComponent;

let getArcballCameraControllerComponent = GameObjectAPI.unsafeGetGameObjectArcballCameraControllerComponent;

let hasArcballCameraControllerComponent = GameObjectAPI.hasGameObjectArcballCameraControllerComponent;