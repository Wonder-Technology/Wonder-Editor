

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Image$WonderEditor from "../../../../../external/Image.js";
import * as AssetUtils$WonderEditor from "./AssetUtils.js";
import * as TextureUtils$WonderEditor from "../../../../../utils/engine/TextureUtils.js";
import * as FileNameUtils$WonderEditor from "../../../../../utils/file/FileNameUtils.js";
import * as OptionService$WonderEditor from "../../../../../../service/primitive/OptionService.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as AssetNodeEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetNodeEditorService.js";
import * as AssetIndexEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetIndexEditorService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function renameNodeResult(name, result) {
  return /* record */[
          /* name */name,
          /* type_ */result[/* type_ */1],
          /* result */result[/* result */2]
        ];
}

function addFolderIntoNodeMap(index, editorState) {
  return AssetNodeMapEditorService$WonderEditor.setResult(index, AssetNodeEditorService$WonderEditor.buildFolderResult(index, editorState), editorState);
}

function initRootAssetTree(editorState) {
  var match = AssetTreeRootEditorService$WonderEditor.getAssetTreeRoot(editorState);
  if (match) {
    return /* tuple */[
            match[0],
            editorState
          ];
  } else {
    var rootIndex = AssetIndexEditorService$WonderEditor.getIndex(editorState);
    return /* tuple */[
            AssetNodeEditorService$WonderEditor.buildAssetTreeNodeByIndex(rootIndex),
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

function createNodeAndAddToCurrentNodeParent(newIndex, editorState) {
  return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertSourceTreeNodeToTargetTreeNodeChildren(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), AssetNodeEditorService$WonderEditor.buildAssetTreeNodeByIndex(newIndex), AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState)), editorState);
}

function handleFileByType(fileResult) {
  var editorState = StateLogicService$WonderEditor.getEditorState(AssetIndexEditorService$WonderEditor.increaseIndex);
  var newIndex = AssetIndexEditorService$WonderEditor.getIndex(editorState);
  return new Promise((function (resolve, _) {
                return _handleSpecificFuncByType(fileResult[/* type_ */1], /* tuple */[
                            (function () {
                                StateEditorService$WonderEditor.setState(createNodeAndAddToCurrentNodeParent(newIndex, AssetNodeMapEditorService$WonderEditor.setResult(newIndex, fileResult, editorState)));
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
                                              StateEditorService$WonderEditor.setState(createNodeAndAddToCurrentNodeParent(newIndex, AssetNodeMapEditorService$WonderEditor.setResult(newIndex, TextureUtils$WonderEditor.buildTextureNodeResult(fileName, texture), editorState)));
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
