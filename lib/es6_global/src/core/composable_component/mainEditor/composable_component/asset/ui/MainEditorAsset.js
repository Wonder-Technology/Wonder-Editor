'use strict';

import * as Block                                        from "../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                                        from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                        from "react";
import * as Caml_obj                                     from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                                  from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                                from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Css$WonderEditor                             from "../../../../../external/Css.js";
import * as StateLogicService$WonderEditor               from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as MainEditorAssetTree$WonderEditor             from "../composable_component/assetTree/ui/MainEditorAssetTree.js";
import * as MainEditorAssetHeader$WonderEditor           from "../composable_component/header/ui/MainEditorAssetHeader.js";
import * as AssetNodeMapEditorService$WonderEditor       from "../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor      from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as MainEditorAssetChildrenNode$WonderEditor     from "../composable_component/assetChildrenNode/ui/MainEditorAssetChildrenNode.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";

import '../../../../../../../../../src/core/composable_component/mainEditor/composable_component/asset/ui/css/mainEditorAsset.css';

function clearNodeParentId() {
  return /* ClearNodeParentId */0;
}

function setNodeParentId(parentNodeId) {
  return /* SetNodeParentId */Block.__(0, [parentNodeId]);
}

function slientSetNodeParentId(parentNodeId) {
  return /* SlientSetNodeParentId */Block.__(1, [parentNodeId]);
}

var Method = /* module */[
  /* clearNodeParentId */clearNodeParentId,
  /* setNodeParentId */setNodeParentId,
  /* slientSetNodeParentId */slientSetNodeParentId
];

var component = ReasonReact.reducerComponentWithRetainedProps("MainEditorAsset");

function reducer(action, state) {
  if (typeof action === "number") {
    return /* Update */Block.__(0, [/* record */[
                /* currentNodeParentId : None */0,
                /* dragImg */state[/* dragImg */1]
              ]]);
  } else if (action.tag) {
    return /* SilentUpdate */Block.__(1, [/* record */[
                /* currentNodeParentId : Some */[action[0]],
                /* dragImg */state[/* dragImg */1]
              ]]);
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* currentNodeParentId : Some */[action[0]],
                /* dragImg */state[/* dragImg */1]
              ]]);
  }
}

function render(store, dispatch, param) {
  var state = param[/* state */4];
  var reduce = param[/* reduce */3];
  Log$WonderLog.print("render");
  return React.createElement("article", {
              key: "asset",
              className: "asset-component"
            }, React.createElement("div", {
                  className: "asset-tree"
                }, ReasonReact.element(/* None */0, /* None */0, MainEditorAssetHeader$WonderEditor.make(store, dispatch, state[/* currentNodeParentId */0], Curry._1(reduce, clearNodeParentId), /* array */[])), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetTree$WonderEditor.make(store, dispatch, /* tuple */[
                          state[/* dragImg */1],
                          state[/* currentNodeParentId */0]
                        ], Curry._1(reduce, setNodeParentId), /* array */[]))), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetChildrenNode$WonderEditor.make(store, dispatch, /* tuple */[
                      state[/* dragImg */1],
                      state[/* currentNodeParentId */0]
                    ], Curry._1(reduce, slientSetNodeParentId), /* array */[])));
}

function shouldUpdate(param) {
  var newSelf = param[/* newSelf */1];
  var oldSelf = param[/* oldSelf */0];
  return Log$WonderLog.print(Caml_obj.caml_notequal(oldSelf[/* state */4][/* currentNodeParentId */0], newSelf[/* state */4][/* currentNodeParentId */0]) || Caml_obj.caml_notequal(oldSelf[/* retainedProps */5], newSelf[/* retainedProps */5]));
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* currentNodeParentId : Some */[StateLogicService$WonderEditor.getEditorState(AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId)],
              /* dragImg */document.createElement("img")
            ];
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

