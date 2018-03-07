'use strict';

import * as GameObjectLogicSingleService$WonderEditor    from "../service/logic_service/single/GameObjectLogicSingleService.js";
import * as GameObjectLogicCompositeService$WonderEditor from "../service/logic_service/composite/GameObjectLogicCompositeService.js";

function addChild(parent, child, param) {
  return /* tuple */[
          param[0],
          GameObjectLogicCompositeService$WonderEditor.addChild(parent, child, param[1])
        ];
}

function getChildren(targetGameObject, param) {
  return GameObjectLogicCompositeService$WonderEditor.getChildren(targetGameObject, param[1]);
}

function hasChildren(targetGameObject, param) {
  return GameObjectLogicCompositeService$WonderEditor.hasChildren(targetGameObject, param[1]);
}

function addMeshRendererComponent(gameObject, component, param) {
  return /* tuple */[
          param[0],
          GameObjectLogicSingleService$WonderEditor.addMeshRendererComponent(gameObject, component, param[1])
        ];
}

function addMaterialComponent(gameObject, component, param) {
  return /* tuple */[
          param[0],
          GameObjectLogicSingleService$WonderEditor.addMaterialComponent(gameObject, component, param[1])
        ];
}

function addGeometryComponent(gameObject, component, param) {
  return /* tuple */[
          param[0],
          GameObjectLogicSingleService$WonderEditor.addGeometryComponent(gameObject, component, param[1])
        ];
}

function addCameraControllerComponent(gameObject, component, param) {
  return /* tuple */[
          param[0],
          GameObjectLogicSingleService$WonderEditor.addCameraControllerComponent(gameObject, component, param[1])
        ];
}

function hasCameraControllerComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.hasCameraControllerComponent(gameObject, param[1]);
}

function getCameraControllerComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.getCameraControllerComponent(gameObject, param[1]);
}

function getTransformComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.getTransformComponent(gameObject, param[1]);
}

function hasTransformComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.hasTransformComponent(gameObject, param[1]);
}

function getGeometryComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.getGeometryComponent(gameObject, param[1]);
}

function hasGeometryComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.hasGeometryComponent(gameObject, param[1]);
}

function getSourceInstanceComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.getSourceInstanceComponent(gameObject, param[1]);
}

function hasSourceInstanceComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.hasSourceInstanceComponent(gameObject, param[1]);
}

function addSourceInstanceComponent(gameObject, component, param) {
  return /* tuple */[
          param[0],
          GameObjectLogicSingleService$WonderEditor.addSourceInstanceComponent(gameObject, component, param[1])
        ];
}

function hasMeshRendererComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.hasMeshRendererComponent(gameObject, param[1]);
}

function initGameObject(gameObject, param) {
  return /* tuple */[
          param[0],
          GameObjectLogicSingleService$WonderEditor.initGameObject(gameObject, param[1])
        ];
}

function hasMaterialComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.hasMaterialComponent(gameObject, param[1]);
}

function getMaterialComponent(gameObject, param) {
  return GameObjectLogicSingleService$WonderEditor.getMaterialComponent(gameObject, param[1]);
}

function disposeGameObjectLogicSingleService(gameObject, param) {
  return /* tuple */[
          param[0],
          GameObjectLogicSingleService$WonderEditor.disposeGameObject(gameObject, param[1])
        ];
}

export {
  addChild                            ,
  getChildren                         ,
  hasChildren                         ,
  addMeshRendererComponent            ,
  addMaterialComponent                ,
  addGeometryComponent                ,
  addCameraControllerComponent        ,
  hasCameraControllerComponent        ,
  getCameraControllerComponent        ,
  getTransformComponent               ,
  hasTransformComponent               ,
  getGeometryComponent                ,
  hasGeometryComponent                ,
  getSourceInstanceComponent          ,
  hasSourceInstanceComponent          ,
  addSourceInstanceComponent          ,
  hasMeshRendererComponent            ,
  initGameObject                      ,
  hasMaterialComponent                ,
  getMaterialComponent                ,
  disposeGameObjectLogicSingleService ,
  
}
/* GameObjectLogicSingleService-WonderEditor Not a pure module */
