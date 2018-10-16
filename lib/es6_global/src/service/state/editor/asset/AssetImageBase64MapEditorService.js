

import * as ImageBase64MapAssetService$WonderEditor from "../../../record/editor/asset/ImageBase64MapAssetService.js";

function getImageBase64Map(editorState) {
  return ImageBase64MapAssetService$WonderEditor.getImageBase64Map(editorState[/* assetRecord */1]);
}

function setImageBase64Map(imageBase64Map, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */ImageBase64MapAssetService$WonderEditor.setImageBase64Map(imageBase64Map, editorState[/* assetRecord */1]),
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

function setResult(imageId, imageResult, editorState) {
  return /* record */[
          /* sceneRecord */editorState[/* sceneRecord */0],
          /* assetRecord */ImageBase64MapAssetService$WonderEditor.setResult(imageId, imageResult, editorState[/* assetRecord */1]),
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

function buildImageResult(base64, name, textureArray) {
  return /* record */[
          /* base64 */base64,
          /* name */name,
          /* textureArray */textureArray
        ];
}

export {
  getImageBase64Map ,
  setImageBase64Map ,
  setResult ,
  buildImageResult ,
  
}
/* ImageBase64MapAssetService-WonderEditor Not a pure module */
