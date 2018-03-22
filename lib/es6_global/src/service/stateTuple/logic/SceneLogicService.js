'use strict';

import * as Curry                                     from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as GameObjectUtils$WonderEditor              from "../../../core/utils/GameObjectUtils.js";
import * as StateLogicService$WonderEditor            from "./StateLogicService.js";
import * as GameObjectEngineService$WonderEditor      from "../../state/engine/GameObjectEngineService.js";
import * as EngineStateDataEditorService$WonderEditor from "../../state/editor/EngineStateDataEditorService.js";

function addGameObject(targetGameObject, createGameObjectFunc) {
  var match = Curry._1(createGameObjectFunc, StateLogicService$WonderEditor.getEngineStateForEdit(/* () */0));
  var box1 = match[1];
  StateLogicService$WonderEditor.setEngineStateForEdit(GameObjectUtils$WonderEditor.addChild(targetGameObject, box1, GameObjectEngineService$WonderEditor.initGameObject(box1, match[0])));
  var match$1 = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match$1 !== 0) {
    var match$2 = Curry._1(createGameObjectFunc, StateLogicService$WonderEditor.getEngineStateForRun(/* () */0));
    var box2 = match$2[1];
    StateLogicService$WonderEditor.setEngineStateForRun(GameObjectUtils$WonderEditor.addChild(targetGameObject, box2, GameObjectEngineService$WonderEditor.initGameObject(box2, match$2[0])));
  }
  return box1;
}

export {
  addGameObject ,
  
}
/* GameObjectUtils-WonderEditor Not a pure module */
