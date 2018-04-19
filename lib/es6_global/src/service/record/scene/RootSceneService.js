'use strict';

import * as Js_option                       from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog                   from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog              from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";

function unsafeGetScene(sceneRecord) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(sceneRecord[/* root */0]);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.getExn(sceneRecord[/* root */0]);
}

function setScene(scene, sceneRecord) {
  return /* record */[
          /* root : Some */[scene],
          /* currentGameObject */sceneRecord[/* currentGameObject */1],
          /* diffMap */sceneRecord[/* diffMap */2]
        ];
}

export {
  unsafeGetScene ,
  setScene       ,
  
}
/* Log-WonderLog Not a pure module */
