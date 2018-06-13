

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AssetUtils$WonderEditor from "./AssetUtils.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
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

function getAssetTreeAssetNodeTypeByFileType(type_) {
  switch (type_) {
    case "application/json" : 
        return /* Json */2;
    case "image/jpeg" : 
    case "image/png" : 
        return /* Image */1;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getAssetTreeAssetNodeTypeByFileType", "the type:" + (String(type_) + " not exist"), "", "", ""));
  }
}

function _handleSpecificFuncByType(type_, param) {
  switch (type_) {
    case 0 : 
        throw [
              Caml_builtin_exceptions.match_failure,
              [
                "AssetTreeNodeUtils.re",
                56,
                2
              ]
            ];
    case 1 : 
        return Curry._1(param[1], /* () */0);
    case 2 : 
        return Curry._1(param[0], /* () */0);
    
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
  StateEditorService$WonderEditor.setState(createNodeAndAddToCurrentNodeParent(newIndex, AssetNodeMapEditorService$WonderEditor.setResult(newIndex, fileResult, editorState)));
  return /* () */0;
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
