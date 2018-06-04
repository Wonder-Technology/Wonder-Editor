

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AssetUtils$WonderEditor from "./AssetUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetNodeEditorService.js";
import * as AssetIndexEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetIndexEditorService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";

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

function getAssetNodeTypeById(fileId, editorState) {
  var match = SparseMapService$WonderCommonlib.get(fileId, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState));
  if (match) {
    return match[0][/* type_ */1];
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getAssetNodeTypeByFileId", "the fileId:" + (String(fileId) + " not exist in nodeMap"), "", "", ""));
  }
}

function getAssetTreeAssetNodeTypeByAssetNodeType(type_) {
  switch (type_) {
    case "application/json" : 
        return /* Json */2;
    case "image/jpeg" : 
    case "image/png" : 
        return /* Image */1;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getAssetNodeTypeByFileId", "the type:" + (String(type_) + " type not exist"), "", "", ""));
  }
}

function _handleSpecificFuncByType(type_, param) {
  switch (type_) {
    case 0 : 
        return Log$WonderLog.error(Log$WonderLog.buildErrorMessage("_handleSpecificFuncByType", "the specific type:" + (String(type_) + " is not find"), "", "", "type:" + (String(type_) + "")));
    case 1 : 
        return Curry._1(param[1], /* () */0);
    case 2 : 
        return Curry._1(param[0], /* () */0);
    
  }
}

function readFileByType(reader, fileInfo) {
  return _handleSpecificFuncByType(getAssetTreeAssetNodeTypeByAssetNodeType(fileInfo[/* type_ */1]), /* tuple */[
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

function handleFileByType(currentNodeParentId, fileResult) {
  var editorState = StateLogicService$WonderEditor.getEditorState(AssetIndexEditorService$WonderEditor.increaseIndex);
  var newIndex = AssetIndexEditorService$WonderEditor.getIndex(editorState);
  StateEditorService$WonderEditor.setState(AssetNodeMapEditorService$WonderEditor.setResult(newIndex, fileResult, editorState));
  return _handleSpecificFuncByType(fileResult[/* type_ */1], /* tuple */[
              (function () {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var partial_arg = AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(currentNodeParentId, editorState), AssetNodeEditorService$WonderEditor.buildAssetTreeNodeByIndex(newIndex), AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
                  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(partial_arg, param);
                              }));
                }),
              (function () {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var partial_arg = AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(currentNodeParentId, editorState), AssetNodeEditorService$WonderEditor.buildAssetTreeNodeByIndex(newIndex), AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
                  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(partial_arg, param);
                              }));
                })
            ]);
}

export {
  renameNodeResult ,
  addFolderIntoNodeMap ,
  initRootAssetTree ,
  convertFileJsObjectToFileInfoRecord ,
  getAssetNodeTypeById ,
  getAssetTreeAssetNodeTypeByAssetNodeType ,
  _handleSpecificFuncByType ,
  readFileByType ,
  handleFileByType ,
  
}
/* Log-WonderLog Not a pure module */
