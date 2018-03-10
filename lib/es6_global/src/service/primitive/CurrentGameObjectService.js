'use strict';

import * as Js_option                       from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog                   from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog              from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateEditorService$WonderEditor from "../state/editor/StateEditorService.js";

function hasCurrentGameObject(editorState) {
  var match = editorState[/* sceneRecord */0][/* currentGameObject */1];
  if (match) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function unsafeGetCurrentGameObject(editorState) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("current gameObject exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(editorState[/* sceneRecord */0][/* currentGameObject */1]);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.getExn(editorState[/* sceneRecord */0][/* currentGameObject */1]);
}

function getCurrentGameObject(editorState) {
  return editorState[/* sceneRecord */0][/* currentGameObject */1];
}

function setCurrentGameObject(gameObject, editorState) {
  return /* record */[/* sceneRecord : record */[
            /* root */editorState[/* sceneRecord */0][/* root */0],
            /* currentGameObject : Some */[gameObject]
          ]];
}

function clearCurrentGameObject(editorState) {
  return /* record */[/* sceneRecord : record */[
            /* root */editorState[/* sceneRecord */0][/* root */0],
            /* currentGameObject : None */0
          ]];
}

export {
  hasCurrentGameObject       ,
  unsafeGetCurrentGameObject ,
  getCurrentGameObject       ,
  setCurrentGameObject       ,
  clearCurrentGameObject     ,
  
}
/* Log-WonderLog Not a pure module */
