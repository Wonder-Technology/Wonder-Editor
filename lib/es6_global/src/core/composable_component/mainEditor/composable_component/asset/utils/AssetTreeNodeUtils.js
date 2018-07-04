

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Image$WonderEditor from "../../../../../external/Image.js";
import * as AssetUtils$WonderEditor from "./AssetUtils.js";
import * as TextureUtils$WonderEditor from "../../../../../utils/engine/TextureUtils.js";
import * as FileNameUtils$WonderEditor from "../../../../../utils/file/FileNameUtils.js";
import * as OptionService$WonderEditor from "../../../../../../service/primitive/OptionService.js";
import * as IndexAssetService$WonderEditor from "../../../../../../service/state/asset/IndexAssetService.js";
import * as StateAssetService$WonderEditor from "../../../../../../service/state/asset/StateAssetService.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as NodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/NodeMapAssetService.js";
import * as AssetNodeAssetService$WonderEditor from "../../../../../../service/state/asset/AssetNodeAssetService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../../service/state/asset/AssetTreeRootAssetService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function renameNodeResult(name, result) {
  return /* record */[
          /* name */name,
          /* type_ */result[/* type_ */1],
          /* result */result[/* result */2]
        ];
}

function addFolderIntoNodeMap(index, assetState) {
  return NodeMapAssetService$WonderEditor.setResult(index, AssetNodeAssetService$WonderEditor.buildFolderResult(index, assetState), assetState);
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
            AssetNodeAssetService$WonderEditor.buildAssetTreeNodeByIndex(rootIndex),
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
        return /* Json */2;
    case "image/jpeg" : 
    case "image/png" : 
        return /* Image */1;
    default:
      var partial_arg = "the type:" + (String(type_) + " not exist");
      return Log$WonderLog.fatal((function (param, param$1, param$2) {
                    return Log$WonderLog.buildFatalMessage("getAssetTreeAssetNodeTypeByFileType", partial_arg, param, param$1, param$2);
                  }));
  }
}

function _handleSpecificFuncByType(type_, param) {
  var exit = 0;
  if (type_ !== 0) {
    switch (type_ - 1 | 0) {
      case 0 : 
          return Curry._1(param[1], /* () */0);
      case 1 : 
          return Curry._1(param[0], /* () */0);
      case 2 : 
          exit = 1;
          break;
      
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    var partial_arg = "the type:" + (String(type_) + " is not exist");
    return Log$WonderLog.error((function (param, param$1, param$2) {
                  return Log$WonderLog.buildErrorMessage("_handleSpecificFuncByType", partial_arg, param, param$1, param$2);
                }));
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

function createNodeAndAddToCurrentNodeParent(newIndex, assetState) {
  return AssetTreeRootAssetService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertSourceTreeNodeToTargetTreeNodeChildren(AssetUtils$WonderEditor.getTargetTreeNodeId(assetState), AssetNodeAssetService$WonderEditor.buildAssetTreeNodeByIndex(newIndex), AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(assetState)), assetState);
}

function handleFileByType(fileResult) {
  var assetState = StateLogicService$WonderEditor.getAssetState(IndexAssetService$WonderEditor.increaseIndex);
  var newIndex = IndexAssetService$WonderEditor.getIndex(assetState);
  return new Promise((function (resolve, _) {
                return _handleSpecificFuncByType(fileResult[/* type_ */1], /* tuple */[
                            (function () {
                                StateAssetService$WonderEditor.setState(createNodeAndAddToCurrentNodeParent(newIndex, NodeMapAssetService$WonderEditor.setResult(newIndex, fileResult, assetState)));
                                return resolve("resolve");
                              }),
                            (function () {
                                var match = FileNameUtils$WonderEditor.handleFileName(fileResult[/* name */0]);
                                var fileName = match[0];
                                var match$1 = TextureUtils$WonderEditor.createAndInitTexture(fileName, StateLogicService$WonderEditor.getEditEngineState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0));
                                var runEngineState = match$1[2];
                                var editEngineState = match$1[1];
                                var texture = match$1[0];
                                return Curry._2(Image$WonderEditor.onload, OptionService$WonderEditor.unsafeGet(fileResult[/* result */2]), (function (loadedImg) {
                                              StateLogicService$WonderEditor.setEditEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, texture, editEngineState));
                                              StateLogicService$WonderEditor.setRunEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(loadedImg, texture, runEngineState));
                                              StateAssetService$WonderEditor.setState(createNodeAndAddToCurrentNodeParent(newIndex, NodeMapAssetService$WonderEditor.setResult(newIndex, TextureUtils$WonderEditor.buildTextureNodeResult(fileName, texture), assetState)));
                                              return resolve("resolve");
                                            }));
                              })
                          ]);
              }));
}

export {
  renameNodeResult ,
  addFolderIntoNodeMap ,
  initRootAssetTree ,
  convertFileJsObjectToFileInfoRecord ,
  getAssetTreeAssetNodeTypeByFileType ,
  _handleSpecificFuncByType ,
  readFileByType ,
  createNodeAndAddToCurrentNodeParent ,
  handleFileByType ,
  
}
/* Log-WonderLog Not a pure module */
