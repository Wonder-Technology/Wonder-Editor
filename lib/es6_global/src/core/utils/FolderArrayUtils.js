'use strict';

import * as ArrayService$WonderEditor       from "../../service/atom/ArrayService.js";
import * as AssetEditorService$WonderEditor from "../../service/state/editor/AssetEditorService.js";

function isFileBeFolder(fileId, editorState) {
  return +AssetEditorService$WonderEditor.unsafeGetFolderArray(editorState).includes(fileId);
}

function addFolderIntoFolderArray(folderId, editorState) {
  return AssetEditorService$WonderEditor.setFolderArray(ArrayService$WonderEditor.push(folderId, AssetEditorService$WonderEditor.unsafeGetFolderArray(editorState)), editorState);
}

function removeFolderFromFolderArray(folderId, editorState) {
  return AssetEditorService$WonderEditor.setFolderArray(AssetEditorService$WonderEditor.unsafeGetFolderArray(editorState).filter((function (id) {
                    return +(folderId !== id);
                  })), editorState);
}

export {
  isFileBeFolder              ,
  addFolderIntoFolderArray    ,
  removeFolderFromFolderArray ,
  
}
/* ArrayService-WonderEditor Not a pure module */
