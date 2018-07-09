

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Image$WonderEditor from "../../../../../external/Image.js";
import * as AssetUtils$WonderEditor from "./AssetUtils.js";
import * as TextureUtils$WonderEditor from "../../../../../utils/engine/TextureUtils.js";
import * as FileNameUtils$WonderEditor from "../../../../../utils/file/FileNameUtils.js";
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
  return FolderNodeMapAssetService$WonderEditor.setResult(index, AssetNodeAssetService$WonderEditor.buildFolderResult(index, assetState), assetState);
}

function initRootAssetTree(assetState) {
  var match = AssetTreeRootAssetService$WonderEditor.getAssetTreeRoot(assetState);
  if (match) {
    return /* tuple */[
            match[0],
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

function getAssetTreeAssetNodeTypeByFileType(type_) {
  switch (type_) {
    case "application/json" : 
        return /* LoadJson */1;
    case "image/jpeg" : 
    case "image/png" : 
        return /* LoadImage */0;
    default:
      var partial_arg = "the type:" + (String(type_) + " not exist");
      return Log$WonderLog.fatal((function (param, param$1, param$2) {
                    return Log$WonderLog.buildFatalMessage("getAssetTreeAssetNodeTypeByFileType", partial_arg, param, param$1, param$2);
                  }));
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
  return _handleSpecificFuncByType(getAssetTreeAssetNodeTypeByFileType(fileInfo[/* type_ */1]), /* tuple */[
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

function createNodeAndAddToCurrentNodeParent(newIndex, type_, assetState) {
  return AssetTreeRootAssetService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertSourceTreeNodeToTargetTreeNodeChildren(AssetUtils$WonderEditor.getTargetTreeNodeId(assetState), AssetNodeAssetService$WonderEditor.buildAssetTreeNodeByIndex(newIndex, type_), AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(assetState)), assetState);
}

function _handleJsonType(assetState, newIndex, fileResult, resolve, _) {
  StateAssetService$WonderEditor.setState(createNodeAndAddToCurrentNodeParent(newIndex, /* Json */1, JsonNodeMapAssetService$WonderEditor.setResult(newIndex, AssetNodeAssetService$WonderEditor.buildJsonNodeResult(fileResult), assetState)));
  return resolve("resolve");
}

function _handleImageType(fileResult, newIndex, resolve, assetState, _) {
  var match = FileNameUtils$WonderEditor.getBaseNameAndExtName(fileResult[/* name */0]);
  var match$1 = TextureUtils$WonderEditor.createAndInitTexture(match[0], StateLogicService$WonderEditor.getEditEngineState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0));
  var runEngineState = match$1[2];
  var editEngineState = match$1[1];
  var texture = match$1[0];
  return Curry._2(Image$WonderEditor.onload, fileResult[/* result */2], (function (loadedImg) {
                StateLogicService$WonderEditor.setEditEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, texture, editEngineState));
                StateLogicService$WonderEditor.setRunEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, texture, runEngineState));
                StateAssetService$WonderEditor.setState(createNodeAndAddToCurrentNodeParent(newIndex, /* Texture */2, TextureNodeMapAssetService$WonderEditor.setResult(newIndex, AssetNodeAssetService$WonderEditor.buildTextureNodeResult(texture), ImageBase64MapAssetService$WonderEditor.setResult(texture, fileResult[/* result */2], assetState))));
                return resolve("resolve");
              }));
}

function handleFileByType(fileResult) {
  var assetState = StateLogicService$WonderEditor.getAssetState(IndexAssetService$WonderEditor.increaseIndex);
  var newIndex = IndexAssetService$WonderEditor.getIndex(assetState);
  return new Promise((function (resolve, _) {
                return _handleSpecificFuncByType(fileResult[/* type_ */1], /* tuple */[
                            (function (param) {
                                return _handleJsonType(assetState, newIndex, fileResult, resolve, param);
                              }),
                            (function (param) {
                                return _handleImageType(fileResult, newIndex, resolve, assetState, param);
                              })
                          ]);
              }));
}

export {
  addFolderIntoNodeMap ,
  initRootAssetTree ,
  convertFileJsObjectToFileInfoRecord ,
  getAssetTreeAssetNodeTypeByFileType ,
  _handleSpecificFuncByType ,
  readFileByType ,
  createNodeAndAddToCurrentNodeParent ,
  _handleJsonType ,
  _handleImageType ,
  handleFileByType ,
  
}
/* Log-WonderLog Not a pure module */
