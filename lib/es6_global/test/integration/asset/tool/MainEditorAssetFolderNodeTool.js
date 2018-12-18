

import * as FolderNodeUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/FolderNodeUtils.js";
import * as SparseMapService$WonderEditor from "../../../../src/service/atom/SparseMapService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/FolderNodeMapAssetEditorService.js";

function getFolderName(nodeId, editorState) {
  return FolderNodeMapAssetEditorService$WonderEditor.getFolderName(nodeId, FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap(editorState));
}

function setFolderName(nodeId, name, editorState) {
  return FolderNodeMapAssetEditorService$WonderEditor.setResult(nodeId, FolderNodeMapAssetEditorService$WonderEditor.renameFolderNodeResult(name, FolderNodeMapAssetEditorService$WonderEditor.unsafeGetResult(nodeId, editorState)), editorState);
}

function getNoNameFolderName(param) {
  return FolderNodeUtils$WonderEditor.getNoNameFolderName(/* () */0);
}

function getNodeIdByName(folderName, editorState) {
  var match = SparseMapService$WonderEditor.getValidDataArr(FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap(editorState)).find((function (param) {
          return param[1][/* name */0] === folderName;
        }));
  if (match !== undefined) {
    return match[0];
  }
  
}

export {
  getFolderName ,
  setFolderName ,
  getNoNameFolderName ,
  getNodeIdByName ,
  
}
/* FolderNodeUtils-WonderEditor Not a pure module */
