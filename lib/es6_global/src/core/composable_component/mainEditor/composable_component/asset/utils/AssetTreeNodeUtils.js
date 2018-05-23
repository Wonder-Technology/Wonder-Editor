'use strict';

import * as Curry                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                    from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AssetUtils$WonderEditor          from "./AssetUtils.js";
import * as StateLogicService$WonderEditor   from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor  from "../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor  from "../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _getTreeNodeName(index) {
  var match = +(index === StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.getRootTreeNodeId));
  if (match !== 0) {
    return "Asset";
  } else {
    return "newFolder";
  }
}

function buildFolderResult(index) {
  return /* record */[
          /* name */_getTreeNodeName(index),
          /* type_ : Folder */0,
          /* result : None */0
        ];
}

function renameNodeResult(name, result) {
  return /* record */[
          /* name */name,
          /* type_ */result[/* type_ */1],
          /* result */result[/* result */2]
        ];
}

function addFolderIntoNodeMap(index, editorState) {
  return AssetEditorService$WonderEditor.setNodeMap(SparseMapService$WonderCommonlib.set(index, buildFolderResult(index), AssetEditorService$WonderEditor.unsafeGetNodeMap(editorState)), editorState);
}

function buildAssetTreeNodeByIndex(index) {
  return /* record */[
          /* id */index,
          /* children : array */[]
        ];
}

function initRootAssetTree(editorState) {
  var match = AssetEditorService$WonderEditor.getAssetTree(editorState);
  if (match) {
    return /* tuple */[
            match[0],
            editorState
          ];
  } else {
    var rootIndex = AssetEditorService$WonderEditor.getIndex(editorState);
    return /* tuple */[
            /* array */[/* record */[
                /* id */rootIndex,
                /* children : array */[]
              ]],
            AssetEditorService$WonderEditor.setCurrentAssetChildrenNodeParent(rootIndex, addFolderIntoNodeMap(rootIndex, editorState))
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

function getFileTypeById(fileId, editorState) {
  var match = SparseMapService$WonderCommonlib.get(fileId, AssetEditorService$WonderEditor.unsafeGetNodeMap(editorState));
  if (match) {
    return match[0][/* type_ */1];
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getFileTypeByFileId", "the fileId:" + (String(fileId) + " not exist in nodeMap"), "", "", ""));
  }
}

function getAssetTreeFileTypeByFileType(type_) {
  switch (type_) {
    case "application/json" : 
        return /* Json */2;
    case "image/jpeg" : 
    case "image/png" : 
        return /* Image */1;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getFileTypeByFileId", "the type:" + (String(type_) + " type not exist"), "", "", ""));
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
  return _handleSpecificFuncByType(getAssetTreeFileTypeByFileType(fileInfo[/* type_ */1]), /* tuple */[
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

function handleFileByType(fileResult) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = AssetUtils$WonderEditor.increaseIndex(editorState);
  var editorState$1 = match[1];
  var newIndex = match[0];
  StateEditorService$WonderEditor.setState(AssetEditorService$WonderEditor.setNodeMap(SparseMapService$WonderCommonlib.set(newIndex, fileResult, AssetEditorService$WonderEditor.unsafeGetNodeMap(editorState$1)), editorState$1));
  return _handleSpecificFuncByType(fileResult[/* type_ */1], /* tuple */[
              (function () {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var partial_arg = AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), /* record */[
                        /* id */newIndex,
                        /* children : array */[]
                      ], AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
                  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return AssetEditorService$WonderEditor.setAsseTree(partial_arg, param);
                              }));
                }),
              (function () {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var partial_arg = AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), /* record */[
                        /* id */newIndex,
                        /* children : array */[]
                      ], AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
                  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return AssetEditorService$WonderEditor.setAsseTree(partial_arg, param);
                              }));
                })
            ]);
}

export {
  _getTreeNodeName                    ,
  buildFolderResult                   ,
  renameNodeResult                    ,
  addFolderIntoNodeMap                ,
  buildAssetTreeNodeByIndex           ,
  initRootAssetTree                   ,
  convertFileJsObjectToFileInfoRecord ,
  getFileTypeById                     ,
  getAssetTreeFileTypeByFileType      ,
  _handleSpecificFuncByType           ,
  readFileByType                      ,
  handleFileByType                    ,
  
}
/* Log-WonderLog Not a pure module */
