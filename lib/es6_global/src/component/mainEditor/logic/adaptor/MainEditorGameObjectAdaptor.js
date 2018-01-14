'use strict';

import * as GameObject$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/ecs/admin/api/GameObject.js";

var create = GameObject$Wonderjs.createGameObject;

var addMeshRendererComponent = GameObject$Wonderjs.addGameObjectMeshRendererComponent;

var addMaterialComponent = GameObject$Wonderjs.addGameObjectMaterialComponent;

var addGeometryComponent = GameObject$Wonderjs.addGameObjectGeometryComponent;

var addCameraControllerComponent = GameObject$Wonderjs.addGameObjectCameraControllerComponent;

var hasGameObjectCameraControllerComponent = GameObject$Wonderjs.hasGameObjectCameraControllerComponent;

var getGameObjectCameraControllerComponent = GameObject$Wonderjs.getGameObjectCameraControllerComponent;

var getTransformComponent = GameObject$Wonderjs.getGameObjectTransformComponent;

var hasTransformComponent = GameObject$Wonderjs.hasGameObjectTransformComponent;

var getGeometryComponent = GameObject$Wonderjs.getGameObjectGeometryComponent;

var hasGeometryComponent = GameObject$Wonderjs.hasGameObjectGeometryComponent;

var hasMeshRendererComponent = GameObject$Wonderjs.hasGameObjectMeshRendererComponent;

var hasMaterialComponent = GameObject$Wonderjs.hasGameObjectMaterialComponent;

var getMaterialComponent = GameObject$Wonderjs.getGameObjectMaterialComponent;

var disposeGameObject = GameObject$Wonderjs.disposeGameObject;

export {
  create                                 ,
  addMeshRendererComponent               ,
  addMaterialComponent                   ,
  addGeometryComponent                   ,
  addCameraControllerComponent           ,
  hasGameObjectCameraControllerComponent ,
  getGameObjectCameraControllerComponent ,
  getTransformComponent                  ,
  hasTransformComponent                  ,
  getGeometryComponent                   ,
  hasGeometryComponent                   ,
  hasMeshRendererComponent               ,
  hasMaterialComponent                   ,
  getMaterialComponent                   ,
  disposeGameObject                      ,
  
}
/* GameObject-Wonderjs Not a pure module */
