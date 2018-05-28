'use strict';

import * as Block                                        from "../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                        from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                        from "react";
import * as Caml_obj                                     from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                                  from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor                             from "../../../../../external/Css.js";
import * as StateLogicService$WonderEditor               from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as MainEditorAssetTree$WonderEditor             from "../composable_component/assetTree/ui/MainEditorAssetTree.js";
import * as MainEditorAssetHeader$WonderEditor           from "../composable_component/header/ui/MainEditorAssetHeader.js";
import * as AssetNodeMapEditorService$WonderEditor       from "../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor      from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as MainEditorAssetChildrenNode$WonderEditor     from "../composable_component/assetChildrenNode/ui/MainEditorAssetChildrenNode.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";

Css$WonderEditor.importCss("./css/mainEditorAsset.css");

function clearNodeParentId() {
  return /* ClearNodeParentId */0;
}

function setNodeParentId(parentNodeId) {
  return /* SetNodeParentId */[parentNodeId];
}

var Method = /* module */[
  /* clearNodeParentId */clearNodeParentId,
  /* setNodeParentId */setNodeParentId
];

var component = ReasonReact.reducerComponentWithRetainedProps("MainEditorAsset");

function reducer(action, _) {
  if (action) {
    return /* Update */Block.__(0, [/* record */[/* currentNodeParentId : Some */[action[0]]]]);
  } else {
    return /* Update */Block.__(0, [/* record */[/* currentNodeParentId : None */0]]);
  }
}

function render(store, dispatch, param) {
  var state = param[/* state */4];
  var reduce = param[/* reduce */3];
  return React.createElement("article", {
              key: "asset",
              className: "asset-component"
            }, React.createElement("div", {
                  className: "asset-tree"
                }, ReasonReact.element(/* None */0, /* None */0, MainEditorAssetHeader$WonderEditor.make(store, dispatch, state[/* currentNodeParentId */0], Curry._1(reduce, clearNodeParentId), /* array */[])), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetTree$WonderEditor.make(store, dispatch, state[/* currentNodeParentId */0], Curry._1(reduce, setNodeParentId), /* array */[]))), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetChildrenNode$WonderEditor.make(store, dispatch, state[/* currentNodeParentId */0], Curry._1(reduce, setNodeParentId), /* array */[])));
}

function shouldUpdate(param) {
  var newSelf = param[/* newSelf */1];
  var oldSelf = param[/* oldSelf */0];
  if (Caml_obj.caml_notequal(oldSelf[/* state */4][/* currentNodeParentId */0], newSelf[/* state */4][/* currentNodeParentId */0])) {
    return /* true */1;
  } else {
    return Caml_obj.caml_notequal(oldSelf[/* retainedProps */5], newSelf[/* retainedProps */5]);
  }
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* currentNodeParentId : Some */[StateLogicService$WonderEditor.getEditorState(AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId)]];
    });
  newrecord[/* retainedProps */11] = /* record */[
    /* assetTreeRoot */StateLogicService$WonderEditor.getEditorState(AssetTreeRootEditorService$WonderEditor.getAssetTreeRoot),
    /* currentNodeId */StateLogicService$WonderEditor.getEditorState(AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId),
    /* nodeMap */StateLogicService$WonderEditor.getEditorState(AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap)
  ];
  newrecord[/* reducer */12] = reducer;
  return newrecord;
}

export {
  Method       ,
  component    ,
  reducer      ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/*  Not a pure module */
