

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as TreeNode$WonderEditor from "../../../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";

function _isSelected(id) {
  return StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.getTargetTreeNodeId) === id;
}

function _isActive() {
  var match = StateLogicService$WonderEditor.getEditorState(AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId);
  if (match) {
    return AssetUtils$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.getTargetTreeNodeId), match[0]);
  } else {
    return false;
  }
}

function _isNotRoot(id) {
  return StateLogicService$WonderEditor.getEditorState((function (editorState) {
                return AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(editorState) !== id;
              }));
}

function buildAssetTreeArray(dragImg, param, assetTreeRoot) {
  var nodeMap = AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(StateEditorService$WonderEditor.getState(/* () */0));
  var _iterateAssetTreeArray = function (onSelectFunc, onDropFunc, assetTreeArray) {
    return assetTreeArray.map((function (param) {
                  var id = param[/* id */0];
                  var nodeResult = SparseMapService$WonderCommonlib.unsafeGet(id, nodeMap);
                  var match = nodeResult[/* type_ */1];
                  if (match !== 0) {
                    return null;
                  } else {
                    return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                    id,
                                    nodeResult[/* name */0],
                                    StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.getTargetTreeNodeId) === id,
                                    _isActive(/* () */0),
                                    dragImg,
                                    AssetTreeUtils$WonderEditor.getFlag(/* () */0),
                                    /* Some */["./public/img/12.jpg"],
                                    /* Some */[_isNotRoot(id)]
                                  ], /* tuple */[
                                    onSelectFunc,
                                    onDropFunc,
                                    AssetTreeUtils$WonderEditor.handleFlag,
                                    AssetUtils$WonderEditor.isTreeNodeRelationError
                                  ], _iterateAssetTreeArray(onSelectFunc, onDropFunc, param[/* children */1]), /* array */[]));
                  }
                }));
  };
  return _iterateAssetTreeArray(param[0], param[1], /* array */[assetTreeRoot]);
}

var Method = /* module */[
  /* _isSelected */_isSelected,
  /* _isActive */_isActive,
  /* _isNotRoot */_isNotRoot,
  /* buildAssetTreeArray */buildAssetTreeArray
];

var component = ReasonReact.statelessComponent("AssetTree");

function render(_, dragImg, dispatchFunc, _$1) {
  return React.createElement("article", {
              key: "assetTreeRoot",
              className: "tree-content"
            }, StateLogicService$WonderEditor.getEditorState((function (editorState) {
                    return buildAssetTreeArray(dragImg, /* tuple */[
                                (function (param) {
                                    return AssetTreeUtils$WonderEditor.onSelect(dispatchFunc, param);
                                  }),
                                (function (param) {
                                    return AssetTreeUtils$WonderEditor.onDrop(dispatchFunc, param);
                                  })
                              ], AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
                  })));
}

function make(store, dispatchFunc, dragImg, _) {
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
              return render(store, dragImg, dispatchFunc, self);
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
