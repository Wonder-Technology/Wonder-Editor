open Wonderjs;

/* light material */

let hasLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent;

let getLightMaterialComponent = GameObjectAPI.unsafeGetGameObjectLightMaterialComponent;

let addLightMaterialComponent = GameObjectAPI.addGameObjectLightMaterialComponent;

let disposeLightMaterialComponent = GameObjectAPI.disposeGameObjectLightMaterialComponent;
/* basic material */

let hasBasicMaterialComponent = GameObjectAPI.hasGameObjectBasicMaterialComponent;

let getBasicMaterialComponent = GameObjectAPI.unsafeGetGameObjectBasicMaterialComponent;

let addBasicMaterialComponent = GameObjectAPI.addGameObjectBasicMaterialComponent;

let disposeBasicMaterialComponent = GameObjectAPI.disposeGameObjectBasicMaterialComponent;
/* mesh renderer */

let addMeshRendererComponent = GameObjectAPI.addGameObjectMeshRendererComponent;

let getMeshRendererComponent = GameObjectAPI.unsafeGetGameObjectMeshRendererComponent;

let hasMeshRendererComponent = GameObjectAPI.hasGameObjectMeshRendererComponent;

let disposeMeshRendererComponent = GameObjectAPI.disposeGameObjectMeshRendererComponent;

/* geometry */

let getGeometryComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectAPI.unsafeGetGameObjectGeometryComponent(gameObject);

let hasGeometryComponent = GameObjectAPI.hasGameObjectGeometryComponent;

/* perspective camera projection */

let addPerspectiveCameraProjectionComponent = GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent;

let hasPerspectiveCameraProjectionComponent = GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent;

let getPerspectiveCameraProjectionComponent = GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent;

let disposePerspectiveCameraProjectionComponent = GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent;
/* camera view */

let addBasicCameraViewComponent = GameObjectAPI.addGameObjectBasicCameraViewComponent;

let hasBasicCameraViewComponent = GameObjectAPI.hasGameObjectBasicCameraViewComponent;

let getBasicCameraViewComponent = GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent;

let disposeBasicCameraViewComponent = GameObjectAPI.disposeGameObjectBasicCameraViewComponent;
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

let getPointLightComponent = GameObjectAPI.unsafeGetGameObjectPointLightComponent;

let hasPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent;

/* arcball camera */

let addArcballCameraControllerComponent = GameObjectAPI.addGameObjectArcballCameraControllerComponent;

let disposeArcballCameraControllerComponent = GameObjectAPI.disposeGameObjectArcballCameraControllerComponent;

let getArcballCameraControllerComponent = GameObjectAPI.unsafeGetGameObjectArcballCameraControllerComponent;

let hasArcballCameraControllerComponent = GameObjectAPI.hasGameObjectArcballCameraControllerComponent;

/* all components */

let getAllLightMaterialComponents = engineState =>
  GameObjectAPI.getAllLightMaterialComponents(engineState);

let getAllDirectionLightComponents = engineState =>
  GameObjectAPI.getAllDirectionLightComponents(engineState);

let getAllBasicCameraViewComponents = engineState =>
  GameObjectAPI.getAllBasicCameraViewComponents(engineState);

let getAllArcballCameraControllerComponents = engineState =>
  GameObjectAPI.getAllArcballCameraControllerComponents(engineState);