'use strict';

import * as Js_option                       from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog                   from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog              from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";

function unsafeGetEditScene(sceneRecord) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(sceneRecord[/* editRoot */0]);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.getExn(sceneRecord[/* editRoot */0]);
}

function setEditScene(scene, sceneRecord) {
  return /* record */[
          /* editRoot : Some */[scene],
          /* runRoot */sceneRecord[/* runRoot */1],
          /* currentGameObject */sceneRecord[/* currentGameObject */2]
        ];
}

function unsafeGetRunScene(sceneRecord) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(sceneRecord[/* runRoot */1]);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.getExn(sceneRecord[/* runRoot */1]);
}

function setRunScene(scene, sceneRecord) {
  return /* record */[
          /* editRoot */sceneRecord[/* editRoot */0],
          /* runRoot : Some */[scene],
          /* currentGameObject */sceneRecord[/* currentGameObject */2]
        ];
}

export {
  unsafeGetEditScene ,
  setEditScene       ,
  unsafeGetRunScene  ,
  setRunScene        ,
  
}
/* Log-WonderLog Not a pure module */
