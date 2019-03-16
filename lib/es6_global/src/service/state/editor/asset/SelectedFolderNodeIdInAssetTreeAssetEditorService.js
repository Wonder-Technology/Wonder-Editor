

import * as SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor from "../../../record/editor/asset/SelectedFolderNodeIdInAssetTreeAssetService.js";

function getSelectedFolderNodeIdInAssetTree(editorState) {
  return SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor.getSelectedFolderNodeIdInAssetTree(editorState[/* assetRecord */2]);
}

function unsafeGetSelectedFolderNodeIdInAssetTree(editorState) {
  return SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor.unsafeGetSelectedFolderNodeIdInAssetTree(editorState[/* assetRecord */2]);
}

function clearSelectedFolderNodeIdInAssetTree(editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(editorState[/* assetRecord */2]),
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

function setSelectedFolderNodeIdInAssetTree(selectedFolderNodeIdInAssetTree, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */SelectedFolderNodeIdInAssetTreeAssetService$WonderEditor.setSelectedFolderNodeIdInAssetTree(selectedFolderNodeIdInAssetTree, editorState[/* assetRecord */2]),
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

export {
  getSelectedFolderNodeIdInAssetTree ,
  unsafeGetSelectedFolderNodeIdInAssetTree ,
  clearSelectedFolderNodeIdInAssetTree ,
  setSelectedFolderNodeIdInAssetTree ,
  
}
/* SelectedFolderNodeIdInAssetTreeAssetService-WonderEditor Not a pure module */
