

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/FolderNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/asset/MaterialNodeMapAssetLogicService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";

function handleSpeficFuncByAssetNodeType(type_, param, editorState) {
  switch (type_) {
    case 0 : 
        return Curry._1(param[0], FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap(editorState));
    case 1 : 
        return Curry._1(param[1], TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState));
    case 2 : 
        return Curry._1(param[3], WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(editorState));
    case 3 : 
        return Curry._1(param[2], MaterialNodeMapAssetEditorService$WonderEditor.getMaterialNodeMap(editorState));
    
  }
}

function getAssetNodeTotalName(type_, currentNodeId, param) {
  var engineState = param[1];
  return handleSpeficFuncByAssetNodeType(type_, /* tuple */[
              (function (param) {
                  return FolderNodeMapAssetEditorService$WonderEditor.getFolderName(currentNodeId, param);
                }),
              (function (param) {
                  return OperateTextureLogicService$WonderEditor.getTextureBaseName(currentNodeId, param);
                }),
              (function (param) {
                  return MaterialNodeMapAssetLogicService$WonderEditor.getMaterialBaseName(currentNodeId, engineState, param);
                }),
              (function (param) {
                  return WDBNodeMapAssetEditorService$WonderEditor.getWDBTotalName(currentNodeId, param);
                })
            ], param[0]);
}

function getAssetNodeParentId(type_, currentNodeId, editorState) {
  return handleSpeficFuncByAssetNodeType(type_, /* tuple */[
              (function (param) {
                  return FolderNodeMapAssetEditorService$WonderEditor.getFolderParentId(currentNodeId, param);
                }),
              (function (param) {
                  return TextureNodeMapAssetEditorService$WonderEditor.getParentFolderNodeId(currentNodeId, param);
                }),
              (function (param) {
                  return MaterialNodeMapAssetEditorService$WonderEditor.getParentFolderNodeId(currentNodeId, param);
                }),
              (function (param) {
                  return WDBNodeMapAssetEditorService$WonderEditor.getWDBParentId(currentNodeId, param);
                })
            ], editorState);
}

export {
  handleSpeficFuncByAssetNodeType ,
  getAssetNodeTotalName ,
  getAssetNodeParentId ,
  
}
/* OperateTextureLogicService-WonderEditor Not a pure module */
