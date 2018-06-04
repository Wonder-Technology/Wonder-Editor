

import * as Block from "../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Css$WonderEditor from "../../../../../external/Css.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as MainEditorAssetTree$WonderEditor from "../composable_component/assetTree/ui/MainEditorAssetTree.js";
import * as MainEditorAssetHeader$WonderEditor from "../composable_component/header/ui/MainEditorAssetHeader.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as MainEditorAssetChildrenNode$WonderEditor from "../composable_component/assetChildrenNode/ui/MainEditorAssetChildrenNode.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";

Css$WonderEditor.importCss("./css/mainEditorAsset.css");

function clearNodeParentId() {
  return /* ClearNodeParentId */0;
}

function setNodeParentId(parentNodeId) {
  return /* SetNodeParentId */Block.__(0, [parentNodeId]);
}

function silentSetNodeParentId(parentNodeId) {
  return /* SilentSetNodeParentId */Block.__(1, [parentNodeId]);
}

var Method = /* module */[
  /* clearNodeParentId */clearNodeParentId,
  /* setNodeParentId */setNodeParentId,
  /* silentSetNodeParentId */silentSetNodeParentId
];

var component = ReasonReact.reducerComponentWithRetainedProps("MainEditorAsset");

function reducer(action, state) {
  if (typeof action === "number") {
    return /* Update */Block.__(0, [/* record */[
                /* currentNodeParentId : None */0,
                /* dragImg */state[/* dragImg */1]
              ]]);
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* currentNodeParentId : Some */[action[0]],
                /* dragImg */state[/* dragImg */1]
              ]]);
  }
}

function render(store, dispatchFunc, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  return React.createElement("article", {
              key: "asset",
              className: "asset-component"
            }, React.createElement("div", {
                  className: "asset-tree"
                }, ReasonReact.element(/* None */0, /* None */0, MainEditorAssetHeader$WonderEditor.make(store, dispatchFunc, state[/* currentNodeParentId */0], (function () {
                            return Curry._1(send, /* ClearNodeParentId */0);
                          }), /* array */[])), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetTree$WonderEditor.make(store, dispatchFunc, state[/* dragImg */1], state[/* currentNodeParentId */0], (function (_e) {
                            return Curry._1(send, /* SetNodeParentId */Block.__(0, [_e]));
                          }), (function (_e) {
                            return Curry._1(send, /* SilentSetNodeParentId */Block.__(1, [_e]));
                          }), /* array */[]))), ReasonReact.element(/* None */0, /* None */0, MainEditorAssetChildrenNode$WonderEditor.make(store, dispatchFunc, state[/* dragImg */1], state[/* currentNodeParentId */0], (function (_e) {
                        return Curry._1(send, /* SetNodeParentId */Block.__(0, [_e]));
                      }), (function (_e) {
                        return Curry._1(send, /* SilentSetNodeParentId */Block.__(1, [_e]));
                      }), /* array */[])));
}

function shouldUpdate(param) {
  var newSelf = param[/* newSelf */1];
  var oldSelf = param[/* oldSelf */0];
  return Log$WonderLog.print(oldSelf[/* state */1][/* currentNodeParentId */0] !== newSelf[/* state */1][/* currentNodeParentId */0] || Caml_obj.caml_notequal(oldSelf[/* retainedProps */2], newSelf[/* retainedProps */2]));
}

function make(store, dispatchFunc, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */shouldUpdate,
          /* render */(function (self) {
              return render(store, dispatchFunc, self);
            }),
          /* initialState */(function () {
              return /* record */[
                      /* currentNodeParentId : Some */[StateLogicService$WonderEditor.getEditorState(AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId)],
                      /* dragImg */document.createElement("img")
                    ];
            }),
          /* retainedProps : record */[
            /* assetTreeRoot */StateLogicService$WonderEditor.getEditorState(AssetTreeRootEditorService$WonderEditor.getAssetTreeRoot),
            /* currentNodeId */StateLogicService$WonderEditor.getEditorState(AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId),
            /* nodeMap */StateLogicService$WonderEditor.getEditorState(AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap)
          ],
          /* reducer */reducer,
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  shouldUpdate ,
  make ,
  
}
/*  Not a pure module */
