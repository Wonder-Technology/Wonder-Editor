'use strict';

import * as React                            from "react";
import * as ReasonReact                      from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                    from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as FileBox$WonderEditor             from "../../../atom_component/fileBox/ui/FileBox.js";
import * as DomHelper$WonderEditor           from "../../../../../../../external/DomHelper.js";
import * as FolderBox$WonderEditor           from "../../../atom_component/folderBox/ui/FolderBox.js";
import * as AssetUtils$WonderEditor          from "../../../utils/AssetUtils.js";
import * as AssetTreeUtils$WonderEditor      from "../../../utils/AssetTreeUtils.js";
import * as AssetEditorService$WonderEditor  from "../../../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor  from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getSign() {
  return "fileContent";
}

function showSpecificTreeNodeJson(store, dispatch, fileMap, currentFile, jsonArr) {
  return jsonArr.map((function (jsonId) {
                var param = SparseMapService$WonderCommonlib.unsafeGet(jsonId, fileMap);
                return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FileBox$WonderEditor.make(store, dispatch, "./public/img/12.jpg", jsonId, param[/* name */0], "fileContent", currentFile ? AssetUtils$WonderEditor.isIdEqual(currentFile[0], jsonId) : /* false */0, /* array */[]));
              }));
}

function showSpecificTreeNodeImage(store, dispatch, fileMap, currentFile, imgArr) {
  return imgArr.map((function (imgId) {
                var param = SparseMapService$WonderCommonlib.unsafeGet(imgId, fileMap);
                return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FileBox$WonderEditor.make(store, dispatch, param[/* result */2], imgId, param[/* name */0], "fileContent", currentFile ? AssetUtils$WonderEditor.isIdEqual(currentFile[0], imgId) : /* false */0, /* array */[]));
              }));
}

function showSpecificTreeNodeChildren(store, dispatch, currentTreeNodeId, assetTreeChildren) {
  return assetTreeChildren.map((function (param) {
                var id = param[/* id */0];
                return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FolderBox$WonderEditor.make(store, dispatch, "./public/img/11.jpg", id, param[/* name */1], AssetTreeUtils$WonderEditor.getSign(/* () */0), AssetUtils$WonderEditor.isIdEqual(currentTreeNodeId, id), /* array */[]));
              }));
}

function buildContent(store, dispatch) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var currentTreeNode = AssetUtils$WonderEditor.getSpecificTreeNodeById(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), AssetUtils$WonderEditor.getRootTreeNode(editorState));
  var currentFile = AssetEditorService$WonderEditor.getCurrentFile(editorState);
  var fileMap = AssetEditorService$WonderEditor.unsafeGetFileMap(editorState);
  if (currentTreeNode) {
    var treeNode_ = currentTreeNode[0];
    return showSpecificTreeNodeChildren(store, dispatch, treeNode_[/* id */0], treeNode_[/* children */4]).concat(showSpecificTreeNodeImage(store, dispatch, fileMap, currentFile, treeNode_[/* imgArray */2])).concat(showSpecificTreeNodeJson(store, dispatch, fileMap, currentFile, treeNode_[/* jsonArray */3]));
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("buildContent", "the treeNode:" + (String(currentTreeNode) + " not exist in assetTree"), "", "", ""));
  }
}

var Method = /* module */[
  /* getSign */getSign,
  /* showSpecificTreeNodeJson */showSpecificTreeNodeJson,
  /* showSpecificTreeNodeImage */showSpecificTreeNodeImage,
  /* showSpecificTreeNodeChildren */showSpecificTreeNodeChildren,
  /* buildContent */buildContent
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(store, dispatch, _) {
  return React.createElement("article", {
              key: "assetHeader",
              className: "asset-content"
            }, buildContent(store, dispatch));
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
