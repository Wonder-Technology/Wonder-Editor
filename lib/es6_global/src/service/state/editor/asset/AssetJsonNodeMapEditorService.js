

import * as FileNameService$WonderEditor from "../../../atom/FileNameService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../record/editor/asset/JsonNodeMapAssetService.js";

function getJsonNodeMap(editorState) {
  return JsonNodeMapAssetService$WonderEditor.getJsonNodeMap(editorState[/* assetRecord */1]);
}

function setJsonNodeMap(jsonNodeMap, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */JsonNodeMapAssetService$WonderEditor.setJsonNodeMap(jsonNodeMap, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function setResult(index, result, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */JsonNodeMapAssetService$WonderEditor.setResult(index, result, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function getJsonBaseNameAndExtName(currentNodeId, jsonNodeMap) {
  return FileNameService$WonderEditor.getBaseNameAndExtName(SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, jsonNodeMap)[/* name */0]);
}

export {
  getJsonNodeMap ,
  setJsonNodeMap ,
  setResult ,
  getJsonBaseNameAndExtName ,
  
}
/* JsonNodeMapAssetService-WonderEditor Not a pure module */
