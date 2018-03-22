'use strict';

import * as RootSceneService$WonderEditor              from "../../record/scene/RootSceneService.js";
import * as CurrentGameObjectSceneService$WonderEditor from "../../record/scene/CurrentGameObjectSceneService.js";

function unsafeGetScene(editorState) {
  return RootSceneService$WonderEditor.unsafeGetScene(editorState[/* sceneRecord */0]);
}

function setScene(scene, editorState) {
  return /* record */[
          /* sceneRecord */RootSceneService$WonderEditor.setScene(scene, editorState[/* sceneRecord */0]),
          /* loopId */editorState[/* loopId */1]
        ];
}

function hasCurrentGameObject(editorState) {
  return CurrentGameObjectSceneService$WonderEditor.hasCurrentGameObject(editorState[/* sceneRecord */0]);
}

function unsafeGetCurrentGameObject(editorState) {
  return CurrentGameObjectSceneService$WonderEditor.unsafeGetCurrentGameObject(editorState[/* sceneRecord */0]);
}

function getCurrentGameObject(editorState) {
  return CurrentGameObjectSceneService$WonderEditor.getCurrentGameObject(editorState[/* sceneRecord */0]);
}

function setCurrentGameObject(gameObject, editorState) {
  return /* record */[
          /* sceneRecord */CurrentGameObjectSceneService$WonderEditor.setCurrentGameObject(gameObject, editorState[/* sceneRecord */0]),
          /* loopId */editorState[/* loopId */1]
        ];
}

function clearCurrentGameObject(editorState) {
  return /* record */[
          /* sceneRecord */CurrentGameObjectSceneService$WonderEditor.clearCurrentGameObject(editorState[/* sceneRecord */0]),
          /* loopId */editorState[/* loopId */1]
        ];
}

export {
  unsafeGetScene             ,
  setScene                   ,
  hasCurrentGameObject       ,
  unsafeGetCurrentGameObject ,
  getCurrentGameObject       ,
  setCurrentGameObject       ,
  clearCurrentGameObject     ,
  
}
/* RootSceneService-WonderEditor Not a pure module */
