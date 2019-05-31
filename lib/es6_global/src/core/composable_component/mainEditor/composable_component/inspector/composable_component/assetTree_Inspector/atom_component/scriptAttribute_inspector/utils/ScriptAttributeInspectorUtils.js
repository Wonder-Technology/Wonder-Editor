

import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../../../../../../../../service/record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as ScriptAttributeNodeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js";

function getScriptAttributeOptions(param) {
  return /* array */[
          /* record */[
            /* key : Int */0,
            /* value */"Int"
          ],
          /* record */[
            /* key : Float */1,
            /* value */"Float"
          ]
        ];
}

function updateScriptAttributeNode(nodeId, attributeName, attribute, editorState) {
  return ScriptAttributeNodeAssetEditorService$WonderEditor.setNodeData(nodeId, ScriptAttributeNodeAssetService$WonderEditor.buildNodeData(attributeName, attribute), editorState);
}

export {
  getScriptAttributeOptions ,
  updateScriptAttributeNode ,
  
}
/* ScriptAttributeNodeAssetService-WonderEditor Not a pure module */
