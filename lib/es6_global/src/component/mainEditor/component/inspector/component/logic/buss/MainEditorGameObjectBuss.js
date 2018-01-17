'use strict';

import * as MainEditorGameObjectOper$WonderEditor            from "../../../../../logic/operator/MainEditorGameObjectOper.js";
import * as GameObjectComponentParseSystem$WonderEditor      from "../edit/GameObjectComponentParseSystem.js";
import * as GameObject_inspector_show_component$WonderEditor from "../edit/gameObject_inspector_show_component.js";

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

function getGameObjectAllShowInspectorComponent() {
  return GameObjectComponentParseSystem$WonderEditor.convertDataToRecord(GameObject_inspector_show_component$WonderEditor.gameObject_inspector_show_component);
}

export {
  hasTransformComponent                  ,
  getTransformComponent                  ,
  hasMaterialComponent                   ,
  getMaterialComponent                   ,
  getGameObjectAllShowInspectorComponent ,
  
}
/* MainEditorGameObjectOper-WonderEditor Not a pure module */
