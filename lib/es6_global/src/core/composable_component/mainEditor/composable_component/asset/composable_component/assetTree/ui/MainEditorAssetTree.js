

import * as $$Array from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as TreeNode$WonderEditor from "../../../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../service/atom/ArrayService.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";

function _isSelected(currentNodeParentId, id) {
  var match = StateLogicService$WonderEditor.getEditorState((function (param) {
          return AssetUtils$WonderEditor.getTargetTreeNodeId(currentNodeParentId, param);
        })) === id;
  if (match) {
    return true;
  } else {
    return false;
  }
}

function _isActive(currentNodeParentId) {
  var match = StateLogicService$WonderEditor.getEditorState(AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId);
  if (match) {
    var match$1 = AssetUtils$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getEditorState((function (param) {
                return AssetUtils$WonderEditor.getTargetTreeNodeId(currentNodeParentId, param);
              })), match[0]);
    if (match$1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function _isNotRoot(uid) {
  return StateLogicService$WonderEditor.getEditorState((function (editorState) {
                return AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(editorState) !== uid;
              }));
}

function buildAssetTreeNodeArray(param, param$1, assetTreeRoot) {
  var dragImg = param[1];
  var currentNodeParentId = param[0];
  var _iterateAssetTreeArray = function (onSelect, onDrop, assetTreeArray) {
    return $$Array.map((function (param) {
                  var children = param[/* children */1];
                  var id = param[/* id */0];
                  var nodeResult = SparseMapService$WonderCommonlib.unsafeGet(id, AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
                  var match = nodeResult[/* type_ */1];
                  if (match !== 0) {
                    return null;
                  } else {
                    var match$1 = ArrayService$WonderEditor.hasItem(children);
                    if (match$1) {
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                      id,
                                      nodeResult[/* name */0],
                                      _isSelected(currentNodeParentId, id),
                                      _isActive(currentNodeParentId),
                                      dragImg,
                                      AssetTreeUtils$WonderEditor.getAssetTreeSign(/* () */0),
                                      /* Some */["./public/img/12.jpg"],
                                      /* Some */[_isNotRoot(id)]
                                    ], /* tuple */[
                                      onSelect,
                                      onDrop,
                                      AssetTreeUtils$WonderEditor.handleSign,
                                      AssetUtils$WonderEditor.isTreeNodeRelationError
                                    ], /* Some */[_iterateAssetTreeArray(onSelect, onDrop, children)], /* array */[]));
                    } else {
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                      id,
                                      nodeResult[/* name */0],
                                      _isSelected(currentNodeParentId, id),
                                      _isActive(currentNodeParentId),
                                      dragImg,
                                      AssetTreeUtils$WonderEditor.getAssetTreeSign(/* () */0),
                                      /* Some */["./public/img/12.jpg"],
                                      /* Some */[_isNotRoot(id)]
                                    ], /* tuple */[
                                      onSelect,
                                      onDrop,
                                      AssetTreeUtils$WonderEditor.handleSign,
                                      AssetUtils$WonderEditor.isTreeNodeRelationError
                                    ], /* None */0, /* array */[]));
                    }
                  }
                }), assetTreeArray);
  };
  return _iterateAssetTreeArray(param$1[0], param$1[1], /* array */[assetTreeRoot]);
}

var Method = /* module */[
  /* _isSelected */_isSelected,
  /* _isActive */_isActive,
  /* _isNotRoot */_isNotRoot,
  /* buildAssetTreeNodeArray */buildAssetTreeNodeArray
];

var component = ReasonReact.statelessComponent("AssetTree");

function render(_, param, param$1, _$1) {
  var silentSetNodeParentId = param$1[2];
  var setNodeParentId = param$1[1];
  var dispatchFunc = param$1[0];
  var currentNodeParentId = param[1];
  var dragImg = param[0];
  return React.createElement("article", {
              key: "assetTreeRoot",
              className: "tree-content"
            }, StateLogicService$WonderEditor.getEditorState((function (editorState) {
                    var partial_arg = /* tuple */[
                      setNodeParentId,
                      silentSetNodeParentId,
                      dispatchFunc
                    ];
                    return buildAssetTreeNodeArray(/* tuple */[
                                currentNodeParentId,
                                dragImg
                              ], /* tuple */[
                                (function (param) {
                                    return AssetTreeUtils$WonderEditor.onSelect(partial_arg, param);
                                  }),
                                (function (param) {
                                    return AssetTreeUtils$WonderEditor.onDrop(dispatchFunc, param);
                                  })
                              ], AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
                  })));
}

function make(store, dispatchFunc, dragImg, currentNodeParentId, setNodeParentId, silentSetNodeParentId, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(store, /* tuple */[
                          dragImg,
                          currentNodeParentId
                        ], /* tuple */[
                          dispatchFunc,
                          setNodeParentId,
                          silentSetNodeParentId
                        ], self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
