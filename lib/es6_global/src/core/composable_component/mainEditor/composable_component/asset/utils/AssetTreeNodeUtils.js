

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Image$WonderEditor from "../../../../../external/Image.js";
import * as AssetUtils$WonderEditor from "./AssetUtils.js";
import * as TextureUtils$WonderEditor from "../../../../../utils/engine/TextureUtils.js";
import * as FileNameService$WonderEditor from "../../../../../../service/atom/FileNameService.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as AssetNodeEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetNodeEditorService.js";
import * as AssetIndexEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetIndexEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetJsonNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetJsonNodeMapEditorService.js";
import * as AssetFolderNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetFolderNodeMapEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as AssetImageBase64MapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetImageBase64MapEditorService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTextureNodeMapEditorService.js";

function addFolderIntoNodeMap(index, editorState) {
  var __x = AssetNodeEditorService$WonderEditor.buildFolderResult(index, editorState);
  return AssetFolderNodeMapEditorService$WonderEditor.setResult(index, __x, editorState);
}

function initRootAssetTree(editorState) {
  var match = AssetTreeRootEditorService$WonderEditor.getAssetTreeRoot(editorState);
  if (match !== undefined) {
    return /* tuple */[
            match,
            editorState
          ];
  } else {
    var rootIndex = AssetIndexEditorService$WonderEditor.getIndex(editorState);
    return /* tuple */[
            AssetNodeEditorService$WonderEditor.buildAssetTreeNodeByIndex(rootIndex, /* Folder */0),
            addFolderIntoNodeMap(rootIndex, editorState)
          ];
  }
}

function convertFileJsObjectToFileInfoRecord(fileObject) {
  return /* record */[
          /* name */fileObject.name,
          /* type_ */fileObject.type,
          /* file */fileObject
        ];
}

function getUploadFileType(type_) {
  switch (type_) {
    case "application/json" : 
        return /* LoadJson */1;
    case "image/jpeg" : 
    case "image/png" : 
        return /* LoadImage */0;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getUploadFileType", "the type:" + (String(type_) + " not exist"), "", "", ""));
  }
}

function _handleSpecificFuncByType(type_, param) {
  if (type_) {
    return Curry._1(param[0], /* () */0);
  } else {
    return Curry._1(param[1], /* () */0);
  }
}

function readFileByType(reader, fileInfo) {
  return _handleSpecificFuncByType(getUploadFileType(fileInfo[/* type_ */1]), /* tuple */[
              (function () {
                  reader.readAsText(fileInfo[/* file */2]);
                  return /* () */0;
                }),
              (function () {
                  reader.readAsDataURL(fileInfo[/* file */2]);
                  return /* () */0;
                })
            ]);
}

function createNodeAndAddToTargetNodeChildren(targetTreeNode, newIndex, type_, editorState) {
  return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertSourceTreeNodeToTargetTreeNodeChildren(targetTreeNode, AssetNodeEditorService$WonderEditor.buildAssetTreeNodeByIndex(newIndex, type_), AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState)), editorState);
}

function _handleJsonType(fileResult, newIndex, param, _) {
  var editorState = param[1];
  var editorState$1 = StateEditorService$WonderEditor.setState(createNodeAndAddToTargetNodeChildren(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), newIndex, /* Json */1, AssetJsonNodeMapEditorService$WonderEditor.setResult(newIndex, AssetNodeEditorService$WonderEditor.buildJsonNodeResult(fileResult), editorState)));
  return param[0](editorState$1);
}

function _handleImageType(fileResult, newIndex, param, _) {
  var editorState = param[1];
  var resolve = param[0];
  var match = FileNameService$WonderEditor.getBaseNameAndExtName(fileResult[/* name */0]);
  var match$1 = TextureUtils$WonderEditor.createAndInitTexture(match[0], StateLogicService$WonderEditor.getEditEngineState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0));
  var runEngineState = match$1[2];
  var editEngineState = match$1[1];
  var texture = match$1[0];
  return Curry._2(Image$WonderEditor.onload, fileResult[/* result */2], (function (loadedImg) {
                StateLogicService$WonderEditor.setEditEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, texture, editEngineState));
                StateLogicService$WonderEditor.setRunEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, texture, runEngineState));
                var editorState$1 = StateEditorService$WonderEditor.setState(createNodeAndAddToTargetNodeChildren(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), newIndex, /* Texture */2, AssetTextureNodeMapEditorService$WonderEditor.setResult(newIndex, AssetNodeEditorService$WonderEditor.buildTextureNodeResult(texture), AssetImageBase64MapEditorService$WonderEditor.setResult(texture, fileResult[/* result */2], editorState))));
                return resolve(editorState$1);
              }));
}

function handleFileByType(fileResult) {
  var editorState = StateLogicService$WonderEditor.getEditorState(AssetIndexEditorService$WonderEditor.increaseIndex);
  var newIndex = AssetIndexEditorService$WonderEditor.getIndex(editorState);
  return new Promise((function (resolve, _) {
                var partial_arg = /* tuple */[
                  resolve,
                  editorState
                ];
                var partial_arg$1 = /* tuple */[
                  resolve,
                  editorState
                ];
                return _handleSpecificFuncByType(fileResult[/* type_ */1], /* tuple */[
                            (function (param) {
                                return _handleJsonType(fileResult, newIndex, partial_arg, param);
                              }),
                            (function (param) {
                                return _handleImageType(fileResult, newIndex, partial_arg$1, param);
                              })
                          ]);
              }));
}

export {
  addFolderIntoNodeMap ,
  initRootAssetTree ,
  convertFileJsObjectToFileInfoRecord ,
  getUploadFileType ,
  _handleSpecificFuncByType ,
  readFileByType ,
  createNodeAndAddToTargetNodeChildren ,
  _handleJsonType ,
  _handleImageType ,
  handleFileByType ,
  
}
/* Log-WonderLog Not a pure module */
