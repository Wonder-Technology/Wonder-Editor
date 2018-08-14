

import * as ImageBase64MapAssetService$WonderEditor from "../../../record/editor/asset/ImageBase64MapAssetService.js";

function getImageBase64Map(editorState) {
  return ImageBase64MapAssetService$WonderEditor.getImageBase64Map(editorState[/* assetRecord */1]);
}

function setImageBase64Map(imageBase64Map, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */ImageBase64MapAssetService$WonderEditor.setImageBase64Map(imageBase64Map, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

function setResult(textureIndex, base64, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */ImageBase64MapAssetService$WonderEditor.setResult(textureIndex, base64, editorState[/* assetRecord */1]),
          /* inspectorRecord */editorState[/* inspectorRecord */2],
          /* currentDragSource */editorState[/* currentDragSource */3],
          /* currentSelectSource */editorState[/* currentSelectSource */4],
          /* loopId */editorState[/* loopId */5]
        ];
}

export {
  getImageBase64Map ,
  setImageBase64Map ,
  setResult ,
  
}
/* ImageBase64MapAssetService-WonderEditor Not a pure module */
