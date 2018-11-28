

import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../record/editor/asset/TextureNodeMapAssetService.js";

function getTextureNodeMap(editorState) {
  return TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(editorState[/* assetRecord */1]);
}

function setTextureNodeMap(textureNodeMap, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */TextureNodeMapAssetService$WonderEditor.setTextureNodeMap(textureNodeMap, editorState[/* assetRecord */1]),
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
          /* assetRecord */TextureNodeMapAssetService$WonderEditor.setResult(index, result, editorState[/* assetRecord */1]),
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

function getTextureParentId(currentNodeId, textureNodeMap) {
  return SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, textureNodeMap)[/* parentId */2];
}

function buildTextureNodeResult(textureIndex, parentId, imageId) {
  return /* record */[
          /* textureIndex */textureIndex,
          /* imageId */imageId,
          /* parentId */parentId
        ];
}

function setTextureNodeResultParent(parentId, texureResult) {
  return /* record */[
          /* textureIndex */texureResult[/* textureIndex */0],
          /* imageId */texureResult[/* imageId */1],
          /* parentId */parentId
        ];
}

export {
  getTextureNodeMap ,
  setTextureNodeMap ,
  setResult ,
  getTextureParentId ,
  buildTextureNodeResult ,
  setTextureNodeResultParent ,
  
}
/* TextureNodeMapAssetService-WonderEditor Not a pure module */
