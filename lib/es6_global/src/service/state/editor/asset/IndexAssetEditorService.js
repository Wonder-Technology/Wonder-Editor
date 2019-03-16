

import * as IndexAssetService$WonderEditor from "../../../record/editor/asset/IndexAssetService.js";

function getNodeIndex(editorState) {
  return IndexAssetService$WonderEditor.getNodeIndex(editorState[/* assetRecord */2]);
}

function setNodeIndex(index, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */IndexAssetService$WonderEditor.setNodeIndex(index, editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
        ];
}

function getImageDataMapIndex(editorState) {
  return IndexAssetService$WonderEditor.getImageDataMapIndex(editorState[/* assetRecord */2]);
}

function setImageDataMapIndex(index, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */IndexAssetService$WonderEditor.setImageDataMapIndex(index, editorState[/* assetRecord */2]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
        ];
}

function generateImageDataMapIndex(editorState) {
  var match = IndexAssetService$WonderEditor.generateImageDataMapIndex(IndexAssetService$WonderEditor.getImageDataMapIndex(editorState[/* assetRecord */2]));
  return /* tuple */[
          setImageDataMapIndex(match[0], editorState),
          match[1]
        ];
}

export {
  getNodeIndex ,
  setNodeIndex ,
  getImageDataMapIndex ,
  setImageDataMapIndex ,
  generateImageDataMapIndex ,
  
}
/* No side effect */
