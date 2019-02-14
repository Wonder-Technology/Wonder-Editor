

import * as Result$WonderEditor from "../../../module/Result.js";
import * as ConsoleUtils$WonderEditor from "../ui/ConsoleUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";

function handleError(result) {
  return Result$WonderEditor.SameDataResult[/* handleError */5]((function (result) {
                return result;
              }), (function (msg, result) {
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                ConsoleUtils$WonderEditor.error(msg, editorState);
                return result;
              }), result);
}

export {
  handleError ,
  
}
/* ConsoleUtils-WonderEditor Not a pure module */
