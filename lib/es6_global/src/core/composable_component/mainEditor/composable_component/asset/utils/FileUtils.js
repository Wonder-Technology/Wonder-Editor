'use strict';

import * as Curry                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                    from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AssetUtils$WonderEditor          from "./AssetUtils.js";
import * as StateLogicService$WonderEditor   from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor  from "../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor  from "../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function convertFileJsObjectToFileInfoRecord(fileObject) {
  return /* record */[
          /* name */fileObject.name,
          /* type_ */fileObject.type,
          /* file */fileObject
        ];
}

function _handleSpecificFuncByType(type_, param) {
  var handleImageFunc = param[1];
  switch (type_) {
    case "application/json" : 
        return Curry._1(param[0], /* () */0);
    case "image/jpeg" : 
    case "image/png" : 
        return Curry._1(handleImageFunc, /* () */0);
    default:
      return Log$WonderLog.error(Log$WonderLog.buildErrorMessage("readFileByType", "the specific type:" + (String(type_) + " is not find"), "", "", "fileInfo:" + (String(type_) + "")));
  }
}

function getFileTypeByFileId(fileId, editorState) {
  var match = SparseMapService$WonderCommonlib.get(fileId, AssetEditorService$WonderEditor.getFileMap(editorState));
  if (match) {
    var fileResult = match[0];
    var match$1 = fileResult[/* type_ */1];
    switch (match$1) {
      case "application/json" : 
          return /* Json */1;
      case "image/jpeg" : 
      case "image/png" : 
          return /* Image */0;
      default:
        return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getFileTypeByFileId", "the fileResult:" + (String(fileResult) + " type not exist"), "", "", ""));
    }
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getFileTypeByFileId", "the fileId:" + (String(fileId) + " not exist in fileMap"), "", "", ""));
  }
}

function readFileByType(reader, fileInfo) {
  return _handleSpecificFuncByType(fileInfo[/* type_ */1], /* tuple */[
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
  StateEditorService$WonderEditor.setState(AssetEditorService$WonderEditor.setFileMap(SparseMapService$WonderCommonlib.set(newIndex, fileResult, AssetEditorService$WonderEditor.getFileMap(editorState$1)), editorState$1));
  return _handleSpecificFuncByType(fileResult[/* type_ */1], /* tuple */[
              (function () {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var partial_arg = AssetUtils$WonderEditor.addFileIntoTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), newIndex, /* Json */1, AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
                  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return AssetEditorService$WonderEditor.setAsseTree(partial_arg, param);
                              }));
                }),
              (function () {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var partial_arg = AssetUtils$WonderEditor.addFileIntoTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), newIndex, /* Image */0, AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
                  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return AssetEditorService$WonderEditor.setAsseTree(partial_arg, param);
                              }));
                })
            ]);
}

export {
  convertFileJsObjectToFileInfoRecord ,
  _handleSpecificFuncByType           ,
  getFileTypeByFileId                 ,
  readFileByType                      ,
  handleFileByType                    ,
  
}
/* Log-WonderLog Not a pure module */
