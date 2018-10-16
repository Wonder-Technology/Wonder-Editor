

import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../record/editor/asset/JsonNodeMapAssetService.js";

function getJsonNodeMap(editorState) {
  return JsonNodeMapAssetService$WonderEditor.getJsonNodeMap(editorState[/* assetRecord */1]);
}

function setJsonNodeMap(jsonNodeMap, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */JsonNodeMapAssetService$WonderEditor.setJsonNodeMap(jsonNodeMap, editorState[/* assetRecord */1]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */editorState[/* inspectorRecord */6],
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */editorState[/* currentSelectSource */8],
          /* loopId */editorState[/* loopId */9]
        ];
}

function setResult(index, result, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */JsonNodeMapAssetService$WonderEditor.setResult(index, result, editorState[/* assetRecord */1]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */2],
          /* gameViewRecord */editorState[/* gameViewRecord */3],
          /* eventRecord */editorState[/* eventRecord */4],
          /* imguiRecord */editorState[/* imguiRecord */5],
          /* inspectorRecord */editorState[/* inspectorRecord */6],
          /* currentDragSource */editorState[/* currentDragSource */7],
          /* currentSelectSource */editorState[/* currentSelectSource */8],
          /* loopId */editorState[/* loopId */9]
        ];
}

function getJsonBaseName(currentNodeId, jsonNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, jsonNodeMap)[/* name */0];
}

function getJsonTotalName(currentNodeId, jsonNodeMap) {
  var param = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, jsonNodeMap);
  return param[/* name */0] + param[/* postfix */1];
}

function getJsonParentId(currentNodeId, jsonNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, jsonNodeMap)[/* parentId */2];
}

function buildJsonNodeResult(postfix, fileResult, parentId, name) {
  return /* record */[
          /* name */name,
          /* postfix */postfix,
          /* parentId */parentId,
          /* jsonResult */fileResult
        ];
}

function renameJsonNodeResult(name, jsonNodeResult) {
  return /* record */[
          /* name */name,
          /* postfix */jsonNodeResult[/* postfix */1],
          /* parentId */jsonNodeResult[/* parentId */2],
          /* jsonResult */jsonNodeResult[/* jsonResult */3]
        ];
}

function setJsonNodeResultParent(parentId, jsonNodeResult) {
  return /* record */[
          /* name */jsonNodeResult[/* name */0],
          /* postfix */jsonNodeResult[/* postfix */1],
          /* parentId */parentId,
          /* jsonResult */jsonNodeResult[/* jsonResult */3]
        ];
}

export {
  getJsonNodeMap ,
  setJsonNodeMap ,
  setResult ,
  getJsonBaseName ,
  getJsonTotalName ,
  getJsonParentId ,
  buildJsonNodeResult ,
  renameJsonNodeResult ,
  setJsonNodeResultParent ,
  
}
/* JsonNodeMapAssetService-WonderEditor Not a pure module */
