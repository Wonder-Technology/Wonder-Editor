

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateEditorService$WonderEditor from "../StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "./gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "./sceneView/SceneViewEditorService.js";

function getSize(editorState) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene view->y1,height1 === game view->y2,height2", "not"), (function (param) {
                        var match = SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
                        var match$1 = GameViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
                        Contract$WonderLog.Operators[/* = */0](match[1], match$1[1]);
                        return Contract$WonderLog.Operators[/* = */0](match[3], match$1[3]);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
  var match$1 = GameViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
  return /* tuple */[
          match[0],
          match[1],
          match[2] + match$1[2] | 0,
          match[3]
        ];
}

export {
  getSize ,
  
}
/* Log-WonderLog Not a pure module */
