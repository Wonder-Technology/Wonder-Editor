'use strict';

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

var create = MainEditorGameObjectAdaptor$WonderEditor.create;

var getTransformComponent = MainEditorGameObjectAdaptor$WonderEditor.getTransformComponent;

var hasMaterialComponent = MainEditorGameObjectAdaptor$WonderEditor.hasMaterialComponent;

var disposeGameObject = MainEditorGameObjectAdaptor$WonderEditor.disposeGameObject;

export {
  create                ,
  addChild              ,
  getChildren           ,
  hasChildren           ,
  getTransformComponent ,
  hasMaterialComponent  ,
  disposeGameObject     ,
  
}
/* MainEditorTransformAdaptor-WonderEditor Not a pure module */
