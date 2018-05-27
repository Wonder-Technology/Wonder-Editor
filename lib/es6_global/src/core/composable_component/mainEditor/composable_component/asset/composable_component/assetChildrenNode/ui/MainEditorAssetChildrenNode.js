'use strict';

import * as React                                        from "react";
import * as Js_option                                    from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact                                  from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as FileBox$WonderEditor                         from "../../../atom_component/fileBox/ui/FileBox.js";
import * as DomHelper$WonderEditor                       from "../../../../../../../external/DomHelper.js";
import * as FolderBox$WonderEditor                       from "../../../atom_component/folderBox/ui/FolderBox.js";
import * as AssetUtils$WonderEditor                      from "../../../utils/AssetUtils.js";
import * as OptionService$WonderEditor                   from "../../../../../../../../service/primitive/OptionService.js";
import * as AssetTreeUtils$WonderEditor                  from "../../utils/AssetTreeUtils.js";
import * as StateEditorService$WonderEditor              from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib             from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeMapEditorService$WonderEditor       from "../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor      from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";

function isIdEqualCurrentNodeId(currentNodeId, id) {
  if (currentNodeId) {
    return AssetUtils$WonderEditor.isIdEqual(id, currentNodeId[0]);
  } else {
    return /* false */0;
  }
}

function showSpecificTreeNodeChildren(store, dispatch, setNodeParentId, nodeMap, currentNodeId, assetTreeNodeChildren) {
  return assetTreeNodeChildren.map((function (param) {
                var id = param[/* id */0];
                var match = SparseMapService$WonderCommonlib.unsafeGet(id, nodeMap);
                var name = match[/* name */0];
                switch (match[/* type_ */1]) {
                  case 0 : 
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FolderBox$WonderEditor.make(store, dispatch, "./public/img/11.jpg", id, name, AssetTreeUtils$WonderEditor.getAssetTreeSign(/* () */0), (function (param) {
                                        return AssetTreeUtils$WonderEditor.onDrop(dispatch, param);
                                      }), AssetTreeUtils$WonderEditor.handleSign, AssetUtils$WonderEditor.isTreeNodeRelationError, isIdEqualCurrentNodeId(currentNodeId, id), setNodeParentId, /* array */[]));
                  case 1 : 
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FileBox$WonderEditor.make(store, dispatch, Js_option.getExn(match[/* result */2]), id, name, AssetTreeUtils$WonderEditor.getAssetTreeSign(/* () */0), isIdEqualCurrentNodeId(currentNodeId, id), /* array */[]));
                  case 2 : 
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, FileBox$WonderEditor.make(store, dispatch, "./public/img/12.jpg", id, name, AssetTreeUtils$WonderEditor.getAssetTreeSign(/* () */0), isIdEqualCurrentNodeId(currentNodeId, id), /* array */[]));
                  
                }
              }));
}

function buildContent(store, dispatch, currentNodeParentId, setNodeParentId) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return showSpecificTreeNodeChildren(store, dispatch, setNodeParentId, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState), AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId(editorState), OptionService$WonderEditor.unsafeGet(AssetUtils$WonderEditor.getSpecificTreeNodeById(AssetUtils$WonderEditor.getTargetTreeNodeId(currentNodeParentId, editorState), AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState)))[/* children */1]);
}

var Method = /* module */[
  /* isIdEqualCurrentNodeId */isIdEqualCurrentNodeId,
  /* showSpecificTreeNodeChildren */showSpecificTreeNodeChildren,
  /* buildContent */buildContent
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(store, dispatch, currentNodeParentId, setNodeParentId, _) {
  return React.createElement("article", {
              key: "assetChildrenNode",
              className: "asset-content"
            }, buildContent(store, dispatch, currentNodeParentId, setNodeParentId));
}

function make(store, dispatch, currentNodeParentId, setNodeParentId, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, currentNodeParentId, setNodeParentId, self);
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
