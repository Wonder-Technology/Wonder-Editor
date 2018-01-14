'use strict';

import * as GameObject_component$WonderEditor           from "../edit/GameObject_component.js";
import * as MainEditorGameObjectOper$WonderEditor       from "../../../../../logic/operator/MainEditorGameObjectOper.js";
import * as GameObjectComponentParseSystem$WonderEditor from "../edit/GameObjectComponentParseSystem.js";

function hasMaterialComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.hasMaterialComponent(gameObject, param[1]);
}

function getGameObjectAllComponent() {
  return GameObjectComponentParseSystem$WonderEditor.convertDataToRecord(GameObject_component$WonderEditor.gameObject_component);
}

export {
  hasMaterialComponent      ,
  getGameObjectAllComponent ,
  
}
/* MainEditorGameObjectOper-WonderEditor Not a pure module */
