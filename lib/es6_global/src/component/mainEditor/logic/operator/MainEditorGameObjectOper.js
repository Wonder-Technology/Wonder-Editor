'use strict';

import * as Js_option                                from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as MainEditorTransformAdaptor$WonderEditor  from "../adaptor/MainEditorTransformAdaptor.js";
import * as MainEditorGameObjectAdaptor$WonderEditor from "../adaptor/MainEditorGameObjectAdaptor.js";

function addChild(parent, child, state) {
  return MainEditorTransformAdaptor$WonderEditor.setParent(MainEditorGameObjectAdaptor$WonderEditor.getTransformComponent(parent, state), MainEditorGameObjectAdaptor$WonderEditor.getTransformComponent(child, state), state);
}

function getChildren(gameObject, state) {
  return MainEditorTransformAdaptor$WonderEditor.getChildren(MainEditorGameObjectAdaptor$WonderEditor.getTransformComponent(gameObject, state), state).map((function (transform) {
                return MainEditorTransformAdaptor$WonderEditor.getGameObject(transform, state);
              }));
}

function hasChildren(gameObject, state) {
  return +(getChildren(gameObject, state).length > 0);
}

function getGameObjectSourceInstanceComponent(gameObject, engineState) {
  return Js_option.getExn(MainEditorGameObjectAdaptor$WonderEditor.getGameObjectSourceInstanceComponent(gameObject, engineState));
}

var create = MainEditorGameObjectAdaptor$WonderEditor.create;

var initGameObject = MainEditorGameObjectAdaptor$WonderEditor.initGameObject;

var hasTransformComponent = MainEditorGameObjectAdaptor$WonderEditor.hasTransformComponent;

var getTransformComponent = MainEditorGameObjectAdaptor$WonderEditor.getTransformComponent;

var hasMaterialComponent = MainEditorGameObjectAdaptor$WonderEditor.hasMaterialComponent;

var getMaterialComponent = MainEditorGameObjectAdaptor$WonderEditor.getMaterialComponent;

var hasCameraControllerComponent = MainEditorGameObjectAdaptor$WonderEditor.hasGameObjectCameraControllerComponent;

var getCameraControllerComponent = MainEditorGameObjectAdaptor$WonderEditor.getGameObjectCameraControllerComponent;

var disposeGameObject = MainEditorGameObjectAdaptor$WonderEditor.disposeGameObject;

var hasBoxGeometryComponent = MainEditorGameObjectAdaptor$WonderEditor.hasGeometryComponent;

var getBoxGeometryComponent = MainEditorGameObjectAdaptor$WonderEditor.getGeometryComponent;

var hasGameObjectSourceInstanceComponent = MainEditorGameObjectAdaptor$WonderEditor.hasGameObjectSourceInstanceComponent;

var addGameObjectSourceInstanceComponent = MainEditorGameObjectAdaptor$WonderEditor.addGameObjectSourceInstanceComponent;

export {
  create                               ,
  initGameObject                       ,
  addChild                             ,
  getChildren                          ,
  hasChildren                          ,
  hasTransformComponent                ,
  getTransformComponent                ,
  hasMaterialComponent                 ,
  getMaterialComponent                 ,
  hasCameraControllerComponent         ,
  getCameraControllerComponent         ,
  disposeGameObject                    ,
  hasBoxGeometryComponent              ,
  getBoxGeometryComponent              ,
  hasGameObjectSourceInstanceComponent ,
  addGameObjectSourceInstanceComponent ,
  getGameObjectSourceInstanceComponent ,
  
}
/* MainEditorTransformAdaptor-WonderEditor Not a pure module */
