'use strict';

import * as RootSceneService$WonderEditor              from "../../record/scene/RootSceneService.js";
import * as IsRunSceneService$WonderEditor             from "../../record/scene/isRunSceneService.js";
import * as DiffMapSceneService$WonderEditor           from "../../record/scene/DiffMapSceneService.js";
import * as CurrentGameObjectSceneService$WonderEditor from "../../record/scene/CurrentGameObjectSceneService.js";

function getIsRun(editorState) {
  return IsRunSceneService$WonderEditor.getIsRun(editorState[/* sceneRecord */1]);
}

function setIsRun(isRun, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */IsRunSceneService$WonderEditor.setIsRun(isRun, editorState[/* sceneRecord */1]),
          /* loopId */editorState[/* loopId */2]
        ];
}

function unsafeGetScene(editorState) {
  return RootSceneService$WonderEditor.unsafeGetScene(editorState[/* sceneRecord */1]);
}

function setScene(scene, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */RootSceneService$WonderEditor.setScene(scene, editorState[/* sceneRecord */1]),
          /* loopId */editorState[/* loopId */2]
        ];
}

function unsafeGetDiffMap(editorState) {
  return DiffMapSceneService$WonderEditor.unsafeGetDiffMap(editorState[/* sceneRecord */1]);
}

function setDiffMap(diffMap, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */DiffMapSceneService$WonderEditor.setDiffMap(diffMap, editorState[/* sceneRecord */1]),
          /* loopId */editorState[/* loopId */2]
        ];
}

function unsafeGetCurrentGameObject(editorState) {
  return CurrentGameObjectSceneService$WonderEditor.unsafeGetCurrentGameObject(editorState[/* sceneRecord */1]);
}

function getCurrentGameObject(editorState) {
  return CurrentGameObjectSceneService$WonderEditor.getCurrentGameObject(editorState[/* sceneRecord */1]);
}

function setCurrentGameObject(gameObject, editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */CurrentGameObjectSceneService$WonderEditor.setCurrentGameObject(gameObject, editorState[/* sceneRecord */1]),
          /* loopId */editorState[/* loopId */2]
        ];
}

function clearCurrentGameObject(editorState) {
  return /* record */[
          /* assetRecord */editorState[/* assetRecord */0],
          /* sceneRecord */CurrentGameObjectSceneService$WonderEditor.clearCurrentGameObject(editorState[/* sceneRecord */1]),
          /* loopId */editorState[/* loopId */2]
        ];
}

export {
  getIsRun                   ,
  setIsRun                   ,
  unsafeGetScene             ,
  setScene                   ,
  unsafeGetDiffMap           ,
  setDiffMap                 ,
  unsafeGetCurrentGameObject ,
  getCurrentGameObject       ,
  setCurrentGameObject       ,
  clearCurrentGameObject     ,
  
}
/* RootSceneService-WonderEditor Not a pure module */
