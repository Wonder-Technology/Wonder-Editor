'use strict';

import * as React                                               from "react";
import * as Js_option                                           from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact                                         from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                                       from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as FileBox$WonderEditor                                from "../../../atom_component/fileBox/ui/FileBox.js";
import * as DomHelper$WonderEditor                              from "../../../../../../../external/DomHelper.js";
import * as FolderBox$WonderEditor                              from "../../../atom_component/folderBox/ui/FolderBox.js";
import * as AssetUtils$WonderEditor                             from "../../../utils/AssetUtils.js";
import * as OptionService$WonderEditor                          from "../../../../../../../../service/primitive/OptionService.js";
import * as AssetTreeUtils$WonderEditor                         from "../../assetTree/utils/AssetTreeUtils.js";
import * as StateEditorService$WonderEditor                     from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib                    from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeMapEditorService$WonderEditor              from "../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor             from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentAssetTreeNodeEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentAssetTreeNodeEditorService.js";

function getSign() {
  return "assetChildrenNode";
}

function isIdEqualCurrentAssetTreeNodeId(currentAssetTreeNode, id) {
  if (currentAssetTreeNode) {
    return AssetUtils$WonderEditor.isIdEqual(id, currentAssetTreeNode[0]);
  } else {
    return /* false */0;
  }
}

function showSpecificTreeNodeChildren(store, dispatch, nodeMap, currentAssetTreeNode, assetTreeNodeChildren) {
  return assetTreeNodeChildren.map((function (param) {
                var id = param[/* id */0];
                var match = SparseMapService$WonderCommonlib.unsafeGet(id, nodeMap);
                var name = match[/* name */0];
                switch (match[/* type_ */1]) {
                  case 0 : 
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FolderBox$WonderEditor.make(store, dispatch, "./public/img/11.jpg", id, name, AssetTreeUtils$WonderEditor.getSign(/* () */0), isIdEqualCurrentAssetTreeNodeId(currentAssetTreeNode, id), /* array */[]));
                  case 1 : 
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FileBox$WonderEditor.make(store, dispatch, Js_option.getExn(match[/* result */2]), id, name, "assetChildrenNode", isIdEqualCurrentAssetTreeNodeId(currentAssetTreeNode, id), /* array */[]));
                  case 2 : 
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FileBox$WonderEditor.make(store, dispatch, "./public/img/12.jpg", id, name, "assetChildrenNode", isIdEqualCurrentAssetTreeNodeId(currentAssetTreeNode, id), /* array */[]));
                  
                }
              }));
}

function buildContent(store, dispatch) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  Log$WonderLog.print(/* tuple */[
        "id",
        AssetUtils$WonderEditor.getTargetTreeNodeId(editorState)
      ]);
  return showSpecificTreeNodeChildren(store, dispatch, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState), AssetCurrentAssetTreeNodeEditorService$WonderEditor.getCurrentAssetTreeNode(editorState), OptionService$WonderEditor.unsafeGet(AssetUtils$WonderEditor.getSpecificTreeNodeById(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), Log$WonderLog.print(AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState))))[/* children */1]);
}

var Method = /* module */[
  /* getSign */getSign,
  /* isIdEqualCurrentAssetTreeNodeId */isIdEqualCurrentAssetTreeNodeId,
  /* showSpecificTreeNodeChildren */showSpecificTreeNodeChildren,
  /* buildContent */buildContent
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(store, dispatch, _) {
  return React.createElement("article", {
              key: "assetChildrenNode",
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
