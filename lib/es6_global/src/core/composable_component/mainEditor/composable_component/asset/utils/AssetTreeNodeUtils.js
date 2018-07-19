

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Image$WonderEditor from "../../../../../external/Image.js";
import * as AssetUtils$WonderEditor from "./AssetUtils.js";
import * as TextureUtils$WonderEditor from "../../../../../utils/engine/TextureUtils.js";
import * as FileNameService$WonderEditor from "../../../../../../service/atom/FileNameService.js";
import * as IndexAssetService$WonderEditor from "../../../../../../service/state/asset/IndexAssetService.js";
import * as StateAssetService$WonderEditor from "../../../../../../service/state/asset/StateAssetService.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetNodeAssetService$WonderEditor from "../../../../../../service/state/asset/AssetNodeAssetService.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/JsonNodeMapAssetService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../../service/state/asset/AssetTreeRootAssetService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/FolderNodeMapAssetService.js";
import * as ImageBase64MapAssetService$WonderEditor from "../../../../../../service/state/asset/ImageBase64MapAssetService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/TextureNodeMapAssetService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function addFolderIntoNodeMap(index, assetState) {
  var __x = AssetNodeAssetService$WonderEditor.buildFolderResult(index, assetState);
  return FolderNodeMapAssetService$WonderEditor.setResult(index, __x, assetState);
}

function initRootAssetTree(assetState) {
  var match = AssetTreeRootAssetService$WonderEditor.getAssetTreeRoot(assetState);
  if (match !== undefined) {
    return /* tuple */[
            match,
            assetState
          ];
  } else {
    var rootIndex = IndexAssetService$WonderEditor.getIndex(assetState);
    return /* tuple */[
            AssetNodeAssetService$WonderEditor.buildAssetTreeNodeByIndex(rootIndex, /* Folder */0),
            addFolderIntoNodeMap(rootIndex, assetState)
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

function createNodeAndAddToTargetNodeChildren(targetTreeNode, newIndex, type_, assetState) {
  return AssetTreeRootAssetService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertSourceTreeNodeToTargetTreeNodeChildren(targetTreeNode, AssetNodeAssetService$WonderEditor.buildAssetTreeNodeByIndex(newIndex, type_), AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(assetState)), assetState);
}

function _handleJsonType(fileResult, newIndex, param, _) {
  var assetState = param[1];
  var assetState$1 = StateAssetService$WonderEditor.setState(createNodeAndAddToTargetNodeChildren(AssetUtils$WonderEditor.getTargetTreeNodeId(assetState), newIndex, /* Json */1, JsonNodeMapAssetService$WonderEditor.setResult(newIndex, AssetNodeAssetService$WonderEditor.buildJsonNodeResult(fileResult), assetState)));
  return param[0](assetState$1);
}

function _handleImageType(fileResult, newIndex, param, _) {
  var assetState = param[1];
  var resolve = param[0];
  var match = FileNameService$WonderEditor.getBaseNameAndExtName(fileResult[/* name */0]);
  var match$1 = TextureUtils$WonderEditor.createAndInitTexture(match[0], StateLogicService$WonderEditor.getEditEngineState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0));
  var runEngineState = match$1[2];
  var editEngineState = match$1[1];
  var texture = match$1[0];
  return Curry._2(Image$WonderEditor.onload, fileResult[/* result */2], (function (loadedImg) {
                StateLogicService$WonderEditor.setEditEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, texture, editEngineState));
                StateLogicService$WonderEditor.setRunEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, texture, runEngineState));
                var assetState$1 = StateAssetService$WonderEditor.setState(createNodeAndAddToTargetNodeChildren(AssetUtils$WonderEditor.getTargetTreeNodeId(assetState), newIndex, /* Texture */2, TextureNodeMapAssetService$WonderEditor.setResult(newIndex, AssetNodeAssetService$WonderEditor.buildTextureNodeResult(texture), ImageBase64MapAssetService$WonderEditor.setResult(texture, fileResult[/* result */2], assetState))));
                return resolve(assetState$1);
              }));
}

function handleFileByType(fileResult) {
  var assetState = StateLogicService$WonderEditor.getAssetState(IndexAssetService$WonderEditor.increaseIndex);
  var newIndex = IndexAssetService$WonderEditor.getIndex(assetState);
  return new Promise((function (resolve, _) {
                var partial_arg = /* tuple */[
                  resolve,
                  assetState
                ];
                var partial_arg$1 = /* tuple */[
                  resolve,
                  assetState
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
