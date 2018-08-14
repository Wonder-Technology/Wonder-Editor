

import * as TextureNodeMapAssetService$WonderEditor from "../../../record/editor/asset/TextureNodeMapAssetService.js";

function getTextureNodeMap(editorState) {
  return TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(editorState[/* assetRecord */1]);
}

function setTextureNodeMap(textureNodeMap, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */TextureNodeMapAssetService$WonderEditor.setTextureNodeMap(textureNodeMap, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function setResult(index, result, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */TextureNodeMapAssetService$WonderEditor.setResult(index, result, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

export {
  getTextureNodeMap ,
  setTextureNodeMap ,
  setResult ,
  
}
/* TextureNodeMapAssetService-WonderEditor Not a pure module */
