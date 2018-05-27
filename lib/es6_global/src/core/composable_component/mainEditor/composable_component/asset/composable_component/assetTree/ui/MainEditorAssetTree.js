'use strict';

import * as $$Array                                      from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry                                        from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                        from "react";
import * as ReasonReact                                  from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                                from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor                        from "../../../../../../../ui/store/AppStore.js";
import * as TreeNode$WonderEditor                        from "../../../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor                       from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor                      from "../../../utils/AssetUtils.js";
import * as ArrayService$WonderEditor                    from "../../../../../../../../service/atom/ArrayService.js";
import * as AssetTreeUtils$WonderEditor                  from "../utils/AssetTreeUtils.js";
import * as StateLogicService$WonderEditor               from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor              from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib             from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetNodeMapEditorService$WonderEditor       from "../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor      from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as MainEditorAssetChildrenNode$WonderEditor     from "../../assetChildrenNode/ui/MainEditorAssetChildrenNode.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";

function handleSign(startSign) {
  if (startSign === AssetTreeUtils$WonderEditor.getSign(/* () */0)) {
    return /* true */1;
  } else {
    return +(startSign === MainEditorAssetChildrenNode$WonderEditor.Method[/* getSign */0](/* () */0));
  }
}

function onDrop(dispatch, param) {
  var currentDragSource = param[2];
  var removedId = param[1];
  var targetId = param[0];
  Log$WonderLog.print(currentDragSource);
  if (currentDragSource === MainEditorAssetChildrenNode$WonderEditor.Method[/* getSign */0](/* () */0) || currentDragSource === AssetTreeUtils$WonderEditor.getSign(/* () */0)) {
    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
    var match = AssetUtils$WonderEditor.isIdEqual(targetId, removedId);
    if (match !== 0) {
      return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
    } else {
      var match$1 = AssetUtils$WonderEditor.removeSpecificTreeNodeFromAssetTree(removedId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
      StateEditorService$WonderEditor.setState(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(targetId, match$1[1], match$1[0]), editorState));
      return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
    }
  } else {
    return Log$WonderLog.log("can\'t drop to assetTree");
  }
}

function _isSelected(currentNodeParentId, id) {
  var match = +(StateLogicService$WonderEditor.getEditorState((function (param) {
            return AssetUtils$WonderEditor.getTargetTreeNodeId(currentNodeParentId, param);
          })) === id);
  if (match !== 0) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function _isActive(currentNodeParentId) {
  var match = StateLogicService$WonderEditor.getEditorState(AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId);
  if (match) {
    var match$1 = AssetUtils$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getEditorState((function (param) {
                return AssetUtils$WonderEditor.getTargetTreeNodeId(currentNodeParentId, param);
              })), match[0]);
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
                return +(AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(editorState) !== uid);
              }));
}

function buildAssetTreeNodeArray(currentNodeParentId, onSelect, onDrop, assetTreeRoot) {
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
                    if (match$1 !== 0) {
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                      id,
                                      nodeResult[/* name */0],
                                      _isSelected(currentNodeParentId, id),
                                      _isActive(currentNodeParentId)
                                    ], /* tuple */[
                                      onSelect,
                                      onDrop,
                                      handleSign,
                                      AssetUtils$WonderEditor.isTreeNodeRelationError
                                    ], AssetTreeUtils$WonderEditor.getSign(/* () */0), /* Some */["./public/img/12.jpg"], /* Some */[_isNotRoot(id)], /* Some */[_iterateAssetTreeArray(onSelect, onDrop, children)], /* array */[]));
                    } else {
                      return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                      id,
                                      nodeResult[/* name */0],
                                      _isSelected(currentNodeParentId, id),
                                      _isActive(currentNodeParentId)
                                    ], /* tuple */[
                                      onSelect,
                                      onDrop,
                                      handleSign,
                                      AssetUtils$WonderEditor.isTreeNodeRelationError
                                    ], AssetTreeUtils$WonderEditor.getSign(/* () */0), /* Some */["./public/img/12.jpg"], /* Some */[_isNotRoot(id)], /* None */0, /* array */[]));
                    }
                  }
                }), assetTreeArray);
  };
  return _iterateAssetTreeArray(onSelect, onDrop, /* array */[assetTreeRoot]);
}

var Method = /* module */[
  /* handleSign */handleSign,
  /* onDrop */onDrop,
  /* _isSelected */_isSelected,
  /* _isActive */_isActive,
  /* _isNotRoot */_isNotRoot,
  /* buildAssetTreeNodeArray */buildAssetTreeNodeArray
];

var component = ReasonReact.statelessComponent("AssetTree");

function render(_, dispatch, currentNodeParentId, setNodeParentId, _$1) {
  return React.createElement("article", {
              key: "assetTreeRoot",
              className: "tree-content"
            }, StateLogicService$WonderEditor.getEditorState((function (editorState) {
                    return buildAssetTreeNodeArray(currentNodeParentId, (function (param) {
                                  return AssetTreeUtils$WonderEditor.onSelect(dispatch, setNodeParentId, param);
                                }), (function (param) {
                                  return onDrop(dispatch, param);
                                }), AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
                  })));
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
