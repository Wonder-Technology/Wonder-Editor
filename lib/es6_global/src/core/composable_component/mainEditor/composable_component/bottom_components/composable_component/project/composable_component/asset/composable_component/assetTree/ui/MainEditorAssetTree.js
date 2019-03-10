

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as AssetTreeNode$WonderEditor from "../../../../../../../../../../../atom_component/dragTree/component/treeNode/AssetTreeNode.js";
import * as OptionService$WonderEditor from "../../../../../../../../../../../../service/primitive/OptionService.js";
import * as StringService$WonderEditor from "../../../../../../../../../../../../service/atom/StringService.js";
import * as FolderNodeUtils$WonderEditor from "../../utils/FolderNodeUtils.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as AssetWidgetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/widget/AssetWidgetService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as RootTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/RootTreeAssetEditorService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as AssetDragNodeToFolderEventHandler$WonderEditor from "../../../eventHandler/AssetDragNodeToFolderEventHandler.js";

function _isSelected(selectedFolderNodeIdInAssetTree, nodeId) {
  return NodeAssetService$WonderEditor.isIdEqual(nodeId, selectedFolderNodeIdInAssetTree);
}

function _isActive(selectedFolderNodeIdInAssetTree, currentNodeId, editorState) {
  return OptionService$WonderEditor.andThenWithDefault((function (currentNodeId) {
                return NodeAssetService$WonderEditor.isIdEqual(currentNodeId, selectedFolderNodeIdInAssetTree);
              }), false, currentNodeId);
}

function handleToggleShowTreeChildren(uiState, dispatchFunc, targetId, isShowChildren) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  StateEditorService$WonderEditor.setState(OperateTreeAssetEditorService$WonderEditor.setNodeIsShowChildren(targetId, isShowChildren, editorState));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Project */4]]
      ]);
  return /* () */0;
}

function _sortByName(folderNodes) {
  return folderNodes.sort((function (node1, node2) {
                return FolderNodeAssetService$WonderEditor.getNodeName(FolderNodeAssetService$WonderEditor.getNodeData(node1)).charAt(0).localeCompare(FolderNodeAssetService$WonderEditor.getNodeName(FolderNodeAssetService$WonderEditor.getNodeData(node2)).charAt(0));
              }));
}

function _doesFolderNodeHasNotFolderChildren(folderNode) {
  return FolderNodeAssetService$WonderEditor.getChildrenNodes(folderNode).filter(FolderNodeAssetService$WonderEditor.isFolderNode).length > 0;
}

function _build(param, allFolderNodes, param$1, param$2, editorState) {
  var onDropFunc = param$2[1];
  var onSelectFunc = param$2[0];
  var dragImg = param$1[2];
  var dispatchFunc = param$1[1];
  var uiState = param$1[0];
  var currentNodeId = param[1];
  var selectedFolderNodeIdInAssetTree = param[0];
  return _sortByName(allFolderNodes).map((function (folderNode) {
                var nodeId = NodeAssetService$WonderEditor.getNodeId(folderNode);
                var name = FolderNodeAssetService$WonderEditor.getNodeName(FolderNodeAssetService$WonderEditor.getNodeData(folderNode));
                return ReasonReact.element(StringService$WonderEditor.intToString(nodeId), undefined, AssetTreeNode$WonderEditor.make(nodeId, name, NodeAssetService$WonderEditor.isIdEqual(nodeId, selectedFolderNodeIdInAssetTree), _isActive(selectedFolderNodeIdInAssetTree, currentNodeId, editorState), dragImg, AssetWidgetService$WonderEditor.getWidget(/* () */0), "./public/img/package.png", onSelectFunc, onDropFunc, AssetWidgetService$WonderEditor.isWidget, FolderNodeAssetService$WonderEditor.getIsShowChildren(folderNode), _doesFolderNodeHasNotFolderChildren(folderNode), OperateTreeAssetLogicService$WonderEditor.checkNodeRelation, (function (param, param$1) {
                                  return handleToggleShowTreeChildren(uiState, dispatchFunc, param, param$1);
                                }), _build(/* tuple */[
                                    selectedFolderNodeIdInAssetTree,
                                    currentNodeId
                                  ], FolderNodeAssetService$WonderEditor.getChildrenNodes(folderNode).filter(FolderNodeAssetService$WonderEditor.isFolderNode), /* tuple */[
                                    uiState,
                                    dispatchFunc,
                                    dragImg
                                  ], /* tuple */[
                                    onSelectFunc,
                                    onDropFunc
                                  ], editorState), /* array */[]));
              }));
}

function buildAssetTreeArray(param, param$1, editorState) {
  var selectedFolderNodeIdInAssetTree = TreeAssetEditorService$WonderEditor.getSelectedFolderNodeIdInAssetTree(editorState);
  var currentNodeId = CurrentNodeIdAssetEditorService$WonderEditor.getCurrentNodeId(editorState);
  return _build(/* tuple */[
              selectedFolderNodeIdInAssetTree,
              currentNodeId
            ], /* array */[RootTreeAssetEditorService$WonderEditor.getRootNode(editorState)], /* tuple */[
              param[0],
              param[1],
              param[2]
            ], /* tuple */[
              param$1[0],
              param$1[1]
            ], editorState);
}

var Method = /* module */[
  /* _isSelected */_isSelected,
  /* _isActive */_isActive,
  /* handleToggleShowTreeChildren */handleToggleShowTreeChildren,
  /* _sortByName */_sortByName,
  /* _doesFolderNodeHasNotFolderChildren */_doesFolderNodeHasNotFolderChildren,
  /* _build */_build,
  /* buildAssetTreeArray */buildAssetTreeArray
];

var component = ReasonReact.statelessComponent("AssetTree");

function render(param, dragImg, _self) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return React.createElement("article", {
              key: "assetTreeRoot",
              className: "wonder-asset-assetTree"
            }, buildAssetTreeArray(/* tuple */[
                  uiState,
                  dispatchFunc,
                  dragImg
                ], /* tuple */[
                  (function (param) {
                      return FolderNodeUtils$WonderEditor.enterFolder(dispatchFunc, param);
                    }),
                  Curry._2(AssetDragNodeToFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                        uiState,
                        dispatchFunc
                      ], /* () */0)
                ], editorState));
}

function make(uiState, dispatchFunc, dragImg, _children) {
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
                          uiState,
                          dispatchFunc
                        ], dragImg, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
