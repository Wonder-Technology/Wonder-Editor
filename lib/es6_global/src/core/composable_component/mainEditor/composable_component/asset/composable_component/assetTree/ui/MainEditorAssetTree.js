'use strict';

import * as $$Array                                 from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry                                   from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                   from "react";
import * as ReasonReact                             from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                           from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor                   from "../../../../../../../ui/store/AppStore.js";
import * as TreeNode$WonderEditor                   from "../../../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor                  from "../../../../../../../external/DomHelper.js";
import * as FileUtils$WonderEditor                  from "../../../utils/FileUtils.js";
import * as AssetUtils$WonderEditor                 from "../../../utils/AssetUtils.js";
import * as ArrayService$WonderEditor               from "../../../../../../../../service/atom/ArrayService.js";
import * as StateLogicService$WonderEditor          from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor         from "../../../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor         from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as CurrentSourceEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentSourceEditorService.js";
import * as MainEditorAssetFileContent$WonderEditor from "../../fileContent/ui/MainEditorAssetFileContent.js";

function onSelect(dispatch, id) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          return CurrentSourceEditorService$WonderEditor.setCurrentSource(/* AssetTree */1, AssetEditorService$WonderEditor.setCurrentTreeNode(id, editorState));
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function _getSign() {
  return "assetTree";
}

function handleSign(startSign) {
  if (startSign === "assetTree") {
    return /* true */1;
  } else {
    return +(startSign === MainEditorAssetFileContent$WonderEditor.Method[/* getSign */0](/* () */0));
  }
}

function handleFileToFolder(dispatch, targetTreeNodeId, fileId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var fileType = FileUtils$WonderEditor.getFileTypeByFileId(fileId, editorState);
  var removedTreeNodeId = AssetUtils$WonderEditor.getTargetTreeNodeId(editorState);
  var match = AssetUtils$WonderEditor.isIdEqual(targetTreeNodeId, removedTreeNodeId);
  if (match !== 0) {
    return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  } else {
    var partial_arg = AssetUtils$WonderEditor.addFileIntoTargetTreeNode(targetTreeNodeId, fileId, fileType, AssetUtils$WonderEditor.removeFileFromTargetTreeNode(targetTreeNodeId, fileId, fileType, AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState)));
    StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
            return AssetEditorService$WonderEditor.setAsseTree(partial_arg, param);
          }));
    return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  }
}

function handleFolderToFolder(dispatch, targetId, removedId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var assetTree = AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState);
  var match = AssetUtils$WonderEditor.isIdEqual(targetId, removedId);
  if (match !== 0) {
    return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  } else {
    var match$1 = AssetUtils$WonderEditor.removeSpecificTreeNodeFromAssetTree(removedId, assetTree);
    StateEditorService$WonderEditor.setState(AssetEditorService$WonderEditor.setAsseTree(AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(targetId, match$1[1], match$1[0]), editorState));
    return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  }
}

function onDrop(dispatch, param) {
  var currentSign = param[2];
  var removedId = param[1];
  var targetId = param[0];
  if (currentSign === "assetTree") {
    return handleFolderToFolder(dispatch, targetId, removedId);
  } else if (currentSign === MainEditorAssetFileContent$WonderEditor.Method[/* getSign */0](/* () */0)) {
    return handleFileToFolder(dispatch, targetId, removedId);
  } else {
    return Log$WonderLog.log("can\'t drop to AssetTree");
  }
}

function _isCurrentTreeNode(id) {
  var match = StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentTreeNode);
  if (match) {
    var match$1 = +(match[0] === id);
    if (match$1 !== 0) {
      return /* true */1;
    } else {
      return /* false */0;
    }
  } else {
    return /* false */0;
  }
}

function _isNotRoot(uid) {
  return StateLogicService$WonderEditor.getEditorState((function (editorState) {
                return +(AssetUtils$WonderEditor.getRootTreeNodeId(editorState) !== uid);
              }));
}

function buildAssetTreeArray(onSelect, onDrop, assetTree) {
  return $$Array.map((function (param) {
                var children = param[/* children */4];
                var name = param[/* name */1];
                var id = param[/* id */0];
                var match = ArrayService$WonderEditor.hasItem(children);
                if (match !== 0) {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  id,
                                  name,
                                  _isCurrentTreeNode(id)
                                ], /* tuple */[
                                  onSelect,
                                  onDrop,
                                  handleSign,
                                  AssetUtils$WonderEditor.isTreeNodeRelationError
                                ], "assetTree", /* Some */["./public/img/12.jpg"], /* Some */[_isNotRoot(id)], /* Some */[buildAssetTreeArray(onSelect, onDrop, children)], /* array */[]));
                } else {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  id,
                                  name,
                                  _isCurrentTreeNode(id)
                                ], /* tuple */[
                                  onSelect,
                                  onDrop,
                                  handleSign,
                                  AssetUtils$WonderEditor.isTreeNodeRelationError
                                ], "assetTree", /* Some */["./public/img/12.jpg"], /* Some */[_isNotRoot(id)], /* None */0, /* array */[]));
                }
              }), assetTree);
}

var Method = /* module */[
  /* onSelect */onSelect,
  /* _getSign */_getSign,
  /* handleSign */handleSign,
  /* handleFileToFolder */handleFileToFolder,
  /* handleFolderToFolder */handleFolderToFolder,
  /* onDrop */onDrop,
  /* _isCurrentTreeNode */_isCurrentTreeNode,
  /* _isNotRoot */_isNotRoot,
  /* buildAssetTreeArray */buildAssetTreeArray
];

var component = ReasonReact.statelessComponent("AssetTree");

function render(_, dispatch, _$1) {
  return React.createElement("article", {
              key: "assetTree",
              className: "tree-content"
            }, StateLogicService$WonderEditor.getEditorState((function (editorState) {
                    return buildAssetTreeArray((function (param) {
                                  return onSelect(dispatch, param);
                                }), (function (param) {
                                  return onDrop(dispatch, param);
                                }), AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
                  })));
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  render    ,
  make      ,
  
}
/* component Not a pure module */
