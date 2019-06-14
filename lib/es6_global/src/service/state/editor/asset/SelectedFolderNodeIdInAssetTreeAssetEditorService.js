

import * as SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor from "../../../record/editor/asset/SelectedFolderNodeIdInAssetTreeAssetService.js";

function getSelectedFolderNodeIdInAssetTree(editorState) {
  return SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor.getSelectedFolderNodeIdInAssetTree(editorState[/* assetRecord */5]);
}

function unsafeGetSelectedFolderNodeIdInAssetTree(editorState) {
  return SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor.unsafeGetSelectedFolderNodeIdInAssetTree(editorState[/* assetRecord */5]);
}

function clearSelectedFolderNodeIdInAssetTree(editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(editorState[/* assetRecord */5]),
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

function setSelectedFolderNodeIdInAssetTree(selectedFolderNodeIdInAssetTree, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
          /* assetRecord */SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor.setSelectedFolderNodeIdInAssetTree(selectedFolderNodeIdInAssetTree, editorState[/* assetRecord */5]),
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

export {
  getSelectedFolderNodeIdInAssetTree ,
  unsafeGetSelectedFolderNodeIdInAssetTree ,
  clearSelectedFolderNodeIdInAssetTree ,
  setSelectedFolderNodeIdInAssetTree ,
  
}
/* SelectedFolderNodeIdInAssetTreeAssetService-WonderEditor Not a pure module */
