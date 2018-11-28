

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as LogUtils$WonderEditor from "../../../../../../../../../../../utils/console/LogUtils.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as AssetTreeNode$WonderEditor from "../../../../../../../../../../../atom_component/dragTree/component/treeNode/AssetTreeNode.js";
import * as StringService$WonderEditor from "../../../../../../../../../../../../service/atom/StringService.js";
import * as AssetTreeUtils$WonderEditor from "../../utils/AssetTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/FolderNodeMapAssetEditorService.js";
import * as AssetDragNodeToFolderEventHandler$WonderEditor from "../../../eventHandler/AssetDragNodeToFolderEventHandler.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeDataAssetEditorService.js";

function _isSelected(nodeId) {
  return StateLogicService$WonderEditor.getEditorState(AssetTreeUtils$WonderEditor.getTargetTreeNodeId) === nodeId;
}

function _isActive() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = CurrentNodeDataAssetEditorService$WonderEditor.getCurrentNodeData(editorState);
  if (match !== undefined) {
    return TreeAssetEditorService$WonderEditor.isIdEqual(AssetTreeUtils$WonderEditor.getTargetTreeNodeId(editorState), match[/* currentNodeId */0]);
  } else {
    return false;
  }
}

function _isNotRoot(nodeId) {
  return TreeRootAssetEditorService$WonderEditor.getRootTreeNodeId(StateEditorService$WonderEditor.getState(/* () */0)) !== nodeId;
}

function handleToggleShowTreeChildren(_, dispatchFunc, targetId, isShowChildren) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(ArrayService$WonderEditor.unsafeGetFirst(AssetTreeUtils$WonderEditor.setSpecificAssetTreeNodeIsShowChildren(targetId, isShowChildren, /* array */[TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState)])), editorState));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Project */4]]
      ]);
  return /* () */0;
}

function _getNodeNameByType(param, editorState) {
  var type_ = param[/* type_ */2];
  if (type_ !== 0) {
    ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("unknown type: " + (String(type_) + ""), "", "", ""), editorState);
    return "";
  } else {
    return SparseMapService$WonderCommonlib.unsafeGet(param[/* nodeId */0], FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap(editorState))[/* name */0];
  }
}

function _sortByName(assetTreeArray, editorState) {
  return assetTreeArray.filter((function (param) {
                  return param[/* type_ */2] === /* Folder */0;
                })).sort((function (node1, node2) {
                return _getNodeNameByType(node1, editorState).charAt(0).localeCompare(_getNodeNameByType(node2, editorState).charAt(0));
              }));
}

function buildAssetTreeArray(param, param$1, assetTreeArray, editorState) {
  var onDropFunc = param$1[1];
  var onSelectFunc = param$1[0];
  var dragImg = param[2];
  var dispatchFunc = param[1];
  var store = param[0];
  var _iterateAssetTreeArray = function (assetTreeArray, editorState) {
    return _sortByName(assetTreeArray, editorState).map((function (param) {
                  var type_ = param[/* type_ */2];
                  var children = param[/* children */1];
                  var nodeId = param[/* nodeId */0];
                  if (type_ !== 0) {
                    return null;
                  } else {
                    var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
                    return ReasonReact.element(StringService$WonderEditor.intToString(nodeId), undefined, AssetTreeNode$WonderEditor.make(nodeId, match[/* name */0], StateLogicService$WonderEditor.getEditorState(AssetTreeUtils$WonderEditor.getTargetTreeNodeId) === nodeId, _isActive(/* () */0), dragImg, AssetUtils$WonderEditor.getWidget(/* () */0), "./public/img/package.png", Curry._1(onSelectFunc, type_), onDropFunc, AssetUtils$WonderEditor.isWidget, param[/* isShowChildren */3], children.filter((function (param) {
                                          return param[/* type_ */2] === /* Folder */0;
                                        })).length >= 1, AssetTreeUtils$WonderEditor.isTreeNodeRelationError, (function (param, param$1) {
                                      return handleToggleShowTreeChildren(store, dispatchFunc, param, param$1);
                                    }), _iterateAssetTreeArray(children, editorState), /* array */[]));
                  }
                }));
  };
  return _iterateAssetTreeArray(assetTreeArray, editorState);
}

var Method = /* module */[
  /* _isSelected */_isSelected,
  /* _isActive */_isActive,
  /* _isNotRoot */_isNotRoot,
  /* handleToggleShowTreeChildren */handleToggleShowTreeChildren,
  /* _getNodeNameByType */_getNodeNameByType,
  /* _sortByName */_sortByName,
  /* buildAssetTreeArray */buildAssetTreeArray
];

var component = ReasonReact.statelessComponent("AssetTree");

function render(param, dragImg, _) {
  var dispatchFunc = param[1];
  var store = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var __x = AssetTreeUtils$WonderEditor.buildAssetTreeArray(editorState);
  return React.createElement("article", {
              key: "assetTreeRoot",
              className: "wonder-asset-assetTree"
            }, buildAssetTreeArray(/* tuple */[
                  store,
                  dispatchFunc,
                  dragImg
                ], /* tuple */[
                  (function (param, param$1) {
                      return AssetTreeUtils$WonderEditor.enterFolder(dispatchFunc, param, param$1);
                    }),
                  Curry._2(AssetDragNodeToFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                        store,
                        dispatchFunc
                      ], /* () */0)
                ], __x, editorState));
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
