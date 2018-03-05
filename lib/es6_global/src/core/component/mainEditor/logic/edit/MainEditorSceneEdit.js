'use strict';

import * as Js_option                        from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog                    from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog               from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as EditorStateDataEdit$WonderEditor from "../../../../logic/edit/EditorStateDataEdit.js";

function unsafeGetScene(editorState) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(editorState[/* sceneData */0][/* scene */0]);
                      }));
        }), EditorStateDataEdit$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.getExn(editorState[/* sceneData */0][/* scene */0]);
}

function setScene(scene, editorState) {
  return /* record */[/* sceneData : record */[
            /* scene : Some */[scene],
            /* currentGameObject */editorState[/* sceneData */0][/* currentGameObject */1]
          ]];
}

function hasCurrentGameObject(editorState) {
  var match = editorState[/* sceneData */0][/* currentGameObject */1];
  if (match) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function unsafeGetCurrentGameObject(editorState) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("current gameObject exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(editorState[/* sceneData */0][/* currentGameObject */1]);
                      }));
        }), EditorStateDataEdit$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.getExn(editorState[/* sceneData */0][/* currentGameObject */1]);
}

function getCurrentGameObject(editorState) {
  return editorState[/* sceneData */0][/* currentGameObject */1];
}

function setCurrentGameObject(gameObject, editorState) {
  return /* record */[/* sceneData : record */[
            /* scene */editorState[/* sceneData */0][/* scene */0],
            /* currentGameObject : Some */[gameObject]
          ]];
}

function clearCurrentGameObject(editorState) {
  return /* record */[/* sceneData : record */[
            /* scene */editorState[/* sceneData */0][/* scene */0],
            /* currentGameObject : None */0
          ]];
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
/* Log-WonderLog Not a pure module */
