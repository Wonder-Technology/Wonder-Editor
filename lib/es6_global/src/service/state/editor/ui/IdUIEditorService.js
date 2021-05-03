

import * as IdUIService$WonderEditor from "../../../record/editor/ui/IdUIService.js";
import * as IndexUIEditorService$WonderEditor from "./IndexUIEditorService.js";

function generateNodeId(editorState) {
  var match = IdUIService$WonderEditor.generateMessageId(IndexUIEditorService$WonderEditor.getMessageIndex(editorState));
  return /* tuple */[
          IndexUIEditorService$WonderEditor.setMessageIndex(match[0], editorState),
          match[1]
        ];
}

export {
  generateNodeId ,
  
}
/* No side effect */
