'use strict';

import * as GameObjectAPI$Wonderjs                 from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/gameObject/GetComponentGameObjectService.js";

function getBoxGeometryComponent(gameObject, engineState) {
  var match = GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(gameObject, engineState);
  return GetComponentGameObjectService$Wonderjs.unsafeGetGeometryComponent(match[0], match[1]);
}

var hasBasicMaterialComponent = GameObjectAPI$Wonderjs.hasGameObjectBasicMaterialComponent;

var getBasicMaterialComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent;

var addMeshRendererComponent = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent;

var addBasicMaterialComponent = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent;

var addBoxGeometryComponent = GameObjectAPI$Wonderjs.addGameObjectBoxGeometryComponent;

var addPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent;

var hasPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.hasGameObjectPerspectiveCameraProjectionComponent;

var getPerspectiveCameraProjectionComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent;

var addBasicCameraViewComponent = GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent;

var hasBasicCameraViewComponent = GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent;

var getBasicCameraViewComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent;

var getTransformComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent;

var hasTransformComponent = GameObjectAPI$Wonderjs.hasGameObjectTransformComponent;

var hasBoxGeometryComponent = GameObjectAPI$Wonderjs.hasGameObjectBoxGeometryComponent;

var getSourceInstanceComponent = GameObjectAPI$Wonderjs.unsafeGetGameObjectSourceInstanceComponent;

var hasSourceInstanceComponent = GameObjectAPI$Wonderjs.hasGameObjectSourceInstanceComponent;

var addSourceInstanceComponent = GameObjectAPI$Wonderjs.addGameObjectSourceInstanceComponent;

var hasMeshRendererComponent = GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent;

export {
  hasBasicMaterialComponent               ,
  getBasicMaterialComponent               ,
  addMeshRendererComponent                ,
  addBasicMaterialComponent               ,
  addBoxGeometryComponent                 ,
  addPerspectiveCameraProjectionComponent ,
  hasPerspectiveCameraProjectionComponent ,
  getPerspectiveCameraProjectionComponent ,
  addBasicCameraViewComponent             ,
  hasBasicCameraViewComponent             ,
  getBasicCameraViewComponent             ,
  getTransformComponent                   ,
  hasTransformComponent                   ,
  getBoxGeometryComponent                 ,
  hasBoxGeometryComponent                 ,
  getSourceInstanceComponent              ,
  hasSourceInstanceComponent              ,
  addSourceInstanceComponent              ,
  hasMeshRendererComponent                ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
