'use strict';

import * as MainEditorGameObjectOper$WonderEditor from "../../../../../logic/operator/MainEditorGameObjectOper.js";

function hasTransformComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.hasTransformComponent(gameObject, param[1]);
}

function getTransformComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.getTransformComponent(gameObject, param[1]);
}

function hasMaterialComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.hasMaterialComponent(gameObject, param[1]);
}

function getMaterialComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.getMaterialComponent(gameObject, param[1]);
}

function hasSourceInstanceComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.hasGameObjectSourceInstanceComponent(gameObject, param[1]);
}

function getSourceInstanceComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.getGameObjectSourceInstanceComponent(gameObject, param[1]);
}

function hasCameraControllerComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.hasCameraControllerComponent(gameObject, param[1]);
}

function getCameraControllerComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.getCameraControllerComponent(gameObject, param[1]);
}

function hasBoxGeometryComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.hasBoxGeometryComponent(gameObject, param[1]);
}

function getBoxGeometryComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.getBoxGeometryComponent(gameObject, param[1]);
}

export {
  hasTransformComponent        ,
  getTransformComponent        ,
  hasMaterialComponent         ,
  getMaterialComponent         ,
  hasSourceInstanceComponent   ,
  getSourceInstanceComponent   ,
  hasCameraControllerComponent ,
  getCameraControllerComponent ,
  hasBoxGeometryComponent      ,
  getBoxGeometryComponent      ,
  
}
/* MainEditorGameObjectOper-WonderEditor Not a pure module */
