'use strict';

import * as Js_option                       from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog                   from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog              from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";

function unsafeGetDiffMap(sceneRecord) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("diffMap exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(sceneRecord[/* diffMap */2]);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.getExn(sceneRecord[/* diffMap */2]);
}

function setDiffMap(diffMap, sceneRecord) {
  return /* record */[
          /* root */sceneRecord[/* root */0],
          /* currentGameObject */sceneRecord[/* currentGameObject */1],
          /* diffMap : Some */[diffMap],
          /* isRun */sceneRecord[/* isRun */3]
        ];
}

export {
  unsafeGetDiffMap ,
  setDiffMap       ,
  
}
/* Log-WonderLog Not a pure module */
