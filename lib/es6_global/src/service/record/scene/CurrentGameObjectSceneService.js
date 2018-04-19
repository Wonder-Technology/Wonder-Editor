'use strict';

import * as Js_option                       from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog                   from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog              from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";

function hasCurrentGameObject(sceneRecord) {
  var match = sceneRecord[/* currentGameObject */1];
  if (match) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function unsafeGetCurrentGameObject(sceneRecord) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("current gameObject exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(sceneRecord[/* currentGameObject */1]);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.getExn(sceneRecord[/* currentGameObject */1]);
}

function getCurrentGameObject(sceneRecord) {
  return sceneRecord[/* currentGameObject */1];
}

function setCurrentGameObject(gameObject, sceneRecord) {
  return /* record */[
          /* root */sceneRecord[/* root */0],
          /* currentGameObject : Some */[gameObject],
          /* diffMap */sceneRecord[/* diffMap */2]
        ];
}

function clearCurrentGameObject(sceneRecord) {
  return /* record */[
          /* root */sceneRecord[/* root */0],
          /* currentGameObject : None */0,
          /* diffMap */sceneRecord[/* diffMap */2]
        ];
}

export {
  hasCurrentGameObject       ,
  unsafeGetCurrentGameObject ,
  getCurrentGameObject       ,
  setCurrentGameObject       ,
  clearCurrentGameObject     ,
  
}
/* Log-WonderLog Not a pure module */
