'use strict';

import * as Js_option           from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as GameObject$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/ecs/admin/api/GameObject.js";

function getSourceInstanceComponent(gameObject, engineState) {
  return Js_option.getExn(GameObject$Wonderjs.getGameObjectSourceInstanceComponent(gameObject, engineState));
}

var hasMaterialComponent = GameObject$Wonderjs.hasGameObjectMaterialComponent;

var getMaterialComponent = GameObject$Wonderjs.getGameObjectMaterialComponent;

var addMeshRendererComponent = GameObject$Wonderjs.addGameObjectMeshRendererComponent;

var addMaterialComponent = GameObject$Wonderjs.addGameObjectMaterialComponent;

var addGeometryComponent = GameObject$Wonderjs.addGameObjectGeometryComponent;

var addCameraControllerComponent = GameObject$Wonderjs.addGameObjectCameraControllerComponent;

var hasCameraControllerComponent = GameObject$Wonderjs.hasGameObjectCameraControllerComponent;

var getCameraControllerComponent = GameObject$Wonderjs.getGameObjectCameraControllerComponent;

var getTransformComponent = GameObject$Wonderjs.getGameObjectTransformComponent;

var hasTransformComponent = GameObject$Wonderjs.hasGameObjectTransformComponent;

var getGeometryComponent = GameObject$Wonderjs.getGameObjectGeometryComponent;

var hasGeometryComponent = GameObject$Wonderjs.hasGameObjectGeometryComponent;

var hasSourceInstanceComponent = GameObject$Wonderjs.hasGameObjectSourceInstanceComponent;

var addSourceInstanceComponent = GameObject$Wonderjs.addGameObjectSourceInstanceComponent;

var hasMeshRendererComponent = GameObject$Wonderjs.hasGameObjectMeshRendererComponent;

export {
  hasMaterialComponent         ,
  getMaterialComponent         ,
  addMeshRendererComponent     ,
  addMaterialComponent         ,
  addGeometryComponent         ,
  addCameraControllerComponent ,
  hasCameraControllerComponent ,
  getCameraControllerComponent ,
  getTransformComponent        ,
  hasTransformComponent        ,
  getGeometryComponent         ,
  hasGeometryComponent         ,
  getSourceInstanceComponent   ,
  hasSourceInstanceComponent   ,
  addSourceInstanceComponent   ,
  hasMeshRendererComponent     ,
  
}
/* GameObject-Wonderjs Not a pure module */
