

import * as IndexAssetService$WonderEditor from "../../../record/editor/asset/IndexAssetService.js";

function getNodeIndex(editorState) {
  return IndexAssetService$WonderEditor.getNodeIndex(editorState[/* assetRecord */5]);
}

function setNodeIndex(index, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */IndexAssetService$WonderEditor.setNodeIndex(index, editorState[/* assetRecord */5]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function getImageDataMapIndex(editorState) {
  return IndexAssetService$WonderEditor.getImageDataMapIndex(editorState[/* assetRecord */5]);
}

function setImageDataMapIndex(index, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */IndexAssetService$WonderEditor.setImageDataMapIndex(index, editorState[/* assetRecord */5]),
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function generateImageDataMapIndex(editorState) {
  var match = IndexAssetService$WonderEditor.generateImageDataMapIndex(IndexAssetService$WonderEditor.getImageDataMapIndex(editorState[/* assetRecord */5]));
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
