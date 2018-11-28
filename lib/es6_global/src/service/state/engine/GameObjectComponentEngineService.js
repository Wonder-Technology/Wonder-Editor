

import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/gameObject/GetComponentGameObjectService.js";

var unsafeGetGeometryComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent;

function getGeometryComponent(gameObject, engineState) {
  return GetComponentGameObjectService$Wonderjs.getGeometryComponent(gameObject, engineState[/* gameObjectRecord */10]);
}

var hasLightMaterialComponent = GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent;

var unsafeGetLightMaterialComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent;

var addLightMaterialComponent = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent;

var disposeLightMaterialComponent = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent;

var removeLightMaterialComponent = GameObjectAPI$Wonderjs.removeGameObjectLightMaterialComponent;

var hasBasicMaterialComponent = GameObjectAPI$Wonderjs.hasGameObjectBasicMaterialComponent;

var unsafeGetBasicMaterialComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent;

var addBasicMaterialComponent = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent;

var disposeBasicMaterialComponent = GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent;

var removeBasicMaterialComponent = GameObjectAPI$Wonderjs.removeGameObjectBasicMaterialComponent;

var addMeshRendererComponent = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent;

var unsafeGetMeshRendererComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent;

var hasMeshRendererComponent = GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent;

var disposeMeshRendererComponent = GameObjectAPI$Wonderjs.disposeGameObjectMeshRendererComponent;

var disposeGeometryComponent = GameObjectAPI$Wonderjs.disposeGameObjectGeometryComponent;

var removeGeometryComponent = GameObjectAPI$Wonderjs.removeGameObjectGeometryComponent;

var hasGeometryComponent = GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent;

var addGeometryComponent = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent;

var addPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent;

var hasPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.hasGameObjectPerspectiveCameraProjectionComponent;

var unsafeGetPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent;

var disposePerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent;

var addBasicCameraViewComponent = GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent;

var hasBasicCameraViewComponent = GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent;

var unsafeGetBasicCameraViewComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent;

var disposeBasicCameraViewComponent = GameObjectAPI$Wonderjs.disposeGameObjectBasicCameraViewComponent;

var unsafeGetTransformComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent;

var hasTransformComponent = GameObjectAPI$Wonderjs.hasGameObjectTransformComponent;

var unsafeGetSourceInstanceComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectSourceInstanceComponent;

var hasSourceInstanceComponent = GameObjectAPI$Wonderjs.hasGameObjectSourceInstanceComponent;

var addSourceInstanceComponent = GameObjectAPI$Wonderjs.addGameObjectSourceInstanceComponent;

var addDirectionLightComponent = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent;

var disposeDirectionLightComponent = GameObjectAPI$Wonderjs.disposeGameObjectDirectionLightComponent;

var unsafeGetDirectionLightComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectDirectionLightComponent;

var hasDirectionLightComponent = GameObjectAPI$Wonderjs.hasGameObjectDirectionLightComponent;

var addPointLightComponent = GameObjectAPI$Wonderjs.addGameObjectPointLightComponent;

var disposePointLightComponent = GameObjectAPI$Wonderjs.disposeGameObjectPointLightComponent;

var unsafeGetPointLightComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectPointLightComponent;

var hasPointLightComponent = GameObjectAPI$Wonderjs.hasGameObjectPointLightComponent;

var addArcballCameraControllerComponent = GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent;

var disposeArcballCameraControllerComponent = GameObjectAPI$Wonderjs.disposeGameObjectArcballCameraControllerComponent;

var unsafeGetArcballCameraControllerComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectArcballCameraControllerComponent;

var hasArcballCameraControllerComponent = GameObjectAPI$Wonderjs.hasGameObjectArcballCameraControllerComponent;

var getAllLightMaterialComponents = GameObjectAPI$Wonderjs.getAllLightMaterialComponents;

var getAllDirectionLightComponents = GameObjectAPI$Wonderjs.getAllDirectionLightComponents;

var getAllBasicCameraViewComponents = GameObjectAPI$Wonderjs.getAllBasicCameraViewComponents;

var getAllArcballCameraControllerComponents = GameObjectAPI$Wonderjs.getAllArcballCameraControllerComponents;

var getAllPerspectiveCameraProjectionComponents = GameObjectAPI$Wonderjs.getAllPerspectiveCameraProjectionComponents;

var getAllGeometryComponents = GameObjectAPI$Wonderjs.getAllGeometryComponents;

export {
  hasLightMaterialComponent ,
  unsafeGetLightMaterialComponent ,
  addLightMaterialComponent ,
  disposeLightMaterialComponent ,
  removeLightMaterialComponent ,
  hasBasicMaterialComponent ,
  unsafeGetBasicMaterialComponent ,
  addBasicMaterialComponent ,
  disposeBasicMaterialComponent ,
  removeBasicMaterialComponent ,
  addMeshRendererComponent ,
  unsafeGetMeshRendererComponent ,
  hasMeshRendererComponent ,
  disposeMeshRendererComponent ,
  unsafeGetGeometryComponent ,
  getGeometryComponent ,
  disposeGeometryComponent ,
  removeGeometryComponent ,
  hasGeometryComponent ,
  addGeometryComponent ,
  addPerspectiveCameraProjectionComponent ,
  hasPerspectiveCameraProjectionComponent ,
  unsafeGetPerspectiveCameraProjectionComponent ,
  disposePerspectiveCameraProjectionComponent ,
  addBasicCameraViewComponent ,
  hasBasicCameraViewComponent ,
  unsafeGetBasicCameraViewComponent ,
  disposeBasicCameraViewComponent ,
  unsafeGetTransformComponent ,
  hasTransformComponent ,
  unsafeGetSourceInstanceComponent ,
  hasSourceInstanceComponent ,
  addSourceInstanceComponent ,
  addDirectionLightComponent ,
  disposeDirectionLightComponent ,
  unsafeGetDirectionLightComponent ,
  hasDirectionLightComponent ,
  addPointLightComponent ,
  disposePointLightComponent ,
  unsafeGetPointLightComponent ,
  hasPointLightComponent ,
  addArcballCameraControllerComponent ,
  disposeArcballCameraControllerComponent ,
  unsafeGetArcballCameraControllerComponent ,
  hasArcballCameraControllerComponent ,
  getAllLightMaterialComponents ,
  getAllDirectionLightComponents ,
  getAllBasicCameraViewComponents ,
  getAllArcballCameraControllerComponents ,
  getAllPerspectiveCameraProjectionComponents ,
  getAllGeometryComponents ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
