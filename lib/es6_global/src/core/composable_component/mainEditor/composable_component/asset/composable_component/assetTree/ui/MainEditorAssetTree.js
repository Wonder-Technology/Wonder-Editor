'use strict';

import * as $$Array                          from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as React                            from "react";
import * as ReasonReact                      from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                    from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as TreeNode$WonderEditor            from "../../../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor           from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor          from "../../../utils/AssetUtils.js";
import * as ArrayService$WonderEditor        from "../../../../../../../../service/atom/ArrayService.js";
import * as AssetTreeUtils$WonderEditor      from "../utils/AssetTreeUtils.js";
import * as StateLogicService$WonderEditor   from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor  from "../../../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor  from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function handleSign(startSign) {
  if (startSign === AssetTreeUtils$WonderEditor.getSign(/* () */0)) {
    return /* true */1;
  } else {
    return +(startSign === "assetChildrenNode");
  }
}

function onDrop(_, param) {
  Log$WonderLog.print(/* tuple */[
        param[0],
        param[1]
      ]);
  return /* () */0;
}

function _isCurrentAssetChildrenNodeParent(id) {
  var match = StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentAssetChildrenNodeParent);
  if (match) {
    var match$1 = +(match[0] === id);
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
                return +(AssetUtils$WonderEditor.getRootTreeNodeId(editorState) !== uid);
              }));
}

function buildAssetTreeArray(onSelect, onDrop, assetTree) {
  return $$Array.map((function (param) {
                var children = param[/* children */1];
                var id = param[/* id */0];
                var nodeResult = SparseMapService$WonderCommonlib.unsafeGet(id, AssetEditorService$WonderEditor.unsafeGetNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
                var match = nodeResult[/* type_ */1];
                if (match !== 0) {
                  return null;
                } else {
                  var match$1 = ArrayService$WonderEditor.hasItem(children);
                  if (match$1 !== 0) {
                    return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                    id,
                                    nodeResult[/* name */0],
                                    _isCurrentAssetChildrenNodeParent(id)
                                  ], /* tuple */[
                                    onSelect,
                                    onDrop,
                                    handleSign,
                                    AssetUtils$WonderEditor.isTreeNodeRelationError
                                  ], AssetTreeUtils$WonderEditor.getSign(/* () */0), /* Some */["./public/img/12.jpg"], /* Some */[_isNotRoot(id)], /* Some */[buildAssetTreeArray(onSelect, onDrop, children)], /* array */[]));
                  } else {
                    return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                    id,
                                    nodeResult[/* name */0],
                                    _isCurrentAssetChildrenNodeParent(id)
                                  ], /* tuple */[
                                    onSelect,
                                    onDrop,
                                    handleSign,
                                    AssetUtils$WonderEditor.isTreeNodeRelationError
                                  ], AssetTreeUtils$WonderEditor.getSign(/* () */0), /* Some */["./public/img/12.jpg"], /* Some */[_isNotRoot(id)], /* None */0, /* array */[]));
                  }
                }
              }), assetTree);
}

var Method = /* module */[
  /* handleSign */handleSign,
  /* onDrop */onDrop,
  /* _isCurrentAssetChildrenNodeParent */_isCurrentAssetChildrenNodeParent,
  /* _isNotRoot */_isNotRoot,
  /* buildAssetTreeArray */buildAssetTreeArray
];

var component = ReasonReact.statelessComponent("AssetTree");

function render(_, dispatch, _$1) {
  return React.createElement("article", {
              key: "assetTree",
              className: "tree-content"
            }, StateLogicService$WonderEditor.getEditorState((function (editorState) {
                    return buildAssetTreeArray((function (param) {
                                  return AssetTreeUtils$WonderEditor.onSelect(dispatch, param);
                                }), (function (param) {
                                  return onDrop(dispatch, param);
                                }), AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
                  })));
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
