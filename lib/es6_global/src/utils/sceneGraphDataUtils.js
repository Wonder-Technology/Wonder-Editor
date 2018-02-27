'use strict';

import * as Js_option                        from "../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog                    from "../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog               from "../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as EditorStateDataEdit$WonderEditor from "../logic/edit/EditorStateDataEdit.js";

function unsafeGetSceneGraphDataFromStore(store) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the store sceneTreeState sceneGraphData exist", "not"), (function () {
                        return Contract$WonderLog.assertTrue(Js_option.isSome(store[/* sceneTreeState */3][/* sceneGraphData */0]));
                      }));
        }), EditorStateDataEdit$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.getExn(store[/* sceneTreeState */3][/* sceneGraphData */0]);
}

export {
  unsafeGetSceneGraphDataFromStore ,
  
}
/* Log-WonderLog Not a pure module */
