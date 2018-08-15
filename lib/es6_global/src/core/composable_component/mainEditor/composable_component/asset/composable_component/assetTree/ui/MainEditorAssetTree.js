

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as TreeNode$WonderEditor from "../../../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetFolderNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetFolderNodeMapEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeDataEditorService.js";

function _isSelected(id) {
  return StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.getTargetTreeNodeId) === id;
}

function _isActive() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = AssetCurrentNodeDataEditorService$WonderEditor.getCurrentNodeData(editorState);
  if (match !== undefined) {
    return AssetUtils$WonderEditor.isIdEqual(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), match[/* currentNodeId */0]);
  } else {
    return false;
  }
}

function _isNotRoot(id) {
  return AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(StateEditorService$WonderEditor.getState(/* () */0)) !== id;
}

function buildAssetTreeArray(dragImg, param, assetTreeRoot) {
  var _iterateAssetTreeArray = function (onSelectFunc, onDropFunc, assetTreeArray) {
    return assetTreeArray.map((function (param) {
                  var type_ = param[/* type_ */2];
                  var id = param[/* id */0];
                  if (type_ !== 0) {
                    return null;
                  } else {
                    var match = SparseMapService$WonderCommonlib.unsafeGet(id, AssetFolderNodeMapEditorService$WonderEditor.getFolderNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
                    return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, TreeNode$WonderEditor.make(id, match[/* name */0], StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.getTargetTreeNodeId) === id, _isActive(/* () */0), dragImg, AssetUtils$WonderEditor.getWidge(/* () */0), "./public/img/12.jpg", _isNotRoot(id), Curry._1(onSelectFunc, type_), onDropFunc, AssetUtils$WonderEditor.isWidge, AssetUtils$WonderEditor.isTreeNodeRelationError, _iterateAssetTreeArray(onSelectFunc, onDropFunc, param[/* children */1]), /* array */[]));
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

function render(param, dragImg, _) {
  var dispatchFunc = param[1];
  return React.createElement("article", {
              key: "assetTreeRoot",
              className: "wonder-asset-assetTree"
            }, buildAssetTreeArray(dragImg, /* tuple */[
                  (function (param, param$1) {
                      return AssetTreeUtils$WonderEditor.onSelect(dispatchFunc, param, param$1);
                    }),
                  Curry._2(AssetTreeUtils$WonderEditor.dragNodeToFolderFunc, /* tuple */[
                        param[0],
                        dispatchFunc
                      ], /* () */0)
                ], AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))));
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
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], dragImg, self);
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
