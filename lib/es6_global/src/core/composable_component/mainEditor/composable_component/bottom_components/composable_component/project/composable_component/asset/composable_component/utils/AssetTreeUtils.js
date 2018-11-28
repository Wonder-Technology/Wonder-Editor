

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../service/atom/ArrayService.js";
import * as AssetIdUtils$WonderEditor from "../../utils/AssetIdUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as OptionService$WonderEditor from "../../../../../../../../../../../service/primitive/OptionService.js";
import * as AssetNodeUtils$WonderEditor from "../../utils/AssetNodeUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FolderNodeUtils$WonderEditor from "../../utils/FolderNodeUtils.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as IndexAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/IndexAssetEditorService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/FolderNodeMapAssetEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";
import * as MaterialNodeMapAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/MaterialNodeMapAssetLogicService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/CurrentNodeDataAssetEditorService.js";
import * as IterateAssetTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/IterateAssetTreeAssetEditorService.js";
import * as CurrentNodeParentIdAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/CurrentNodeParentIdAssetEditorService.js";

function enterFolder(dispatchFunc, nodeType, nodeId) {
  StateEditorService$WonderEditor.setState(CurrentNodeParentIdAssetEditorService$WonderEditor.setCurrentNodeParentId(nodeId, CurrentNodeDataAssetEditorService$WonderEditor.setCurrentNodeData(/* record */[
                /* currentNodeId */nodeId,
                /* nodeType */nodeType
              ], StateEditorService$WonderEditor.getState(/* () */0))));
  StateEditorService$WonderEditor.setState(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0))));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */1]]
      ]);
  return /* () */0;
}

function buildAssetTreeArray(editorState) {
  return /* array */[TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState)];
}

function setSpecificAssetTreeNodeIsShowChildren(targetId, isShowChildren, assetTreeArray) {
  return assetTreeArray.map((function (treeNode) {
                var match = treeNode[/* nodeId */0] === targetId;
                if (match) {
                  return /* record */[
                          /* nodeId */treeNode[/* nodeId */0],
                          /* children */treeNode[/* children */1],
                          /* type_ */treeNode[/* type_ */2],
                          /* isShowChildren */isShowChildren
                        ];
                } else {
                  return /* record */[
                          /* nodeId */treeNode[/* nodeId */0],
                          /* children */setSpecificAssetTreeNodeIsShowChildren(targetId, isShowChildren, treeNode[/* children */1]),
                          /* type_ */treeNode[/* type_ */2],
                          /* isShowChildren */treeNode[/* isShowChildren */3]
                        ];
                }
              }));
}

function updateAssetTreeArrayData(assetTreeArray, editorState) {
  return TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(ArrayService$WonderEditor.unsafeGetFirst(assetTreeArray), editorState);
}

function setSpecificAssetTreeNodeIsShowChildrenFromEditorState(targetId, isShowChildren, editorState) {
  var assetTreeArray = setSpecificAssetTreeNodeIsShowChildren(targetId, isShowChildren, /* array */[TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState)]);
  return TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(ArrayService$WonderEditor.unsafeGetFirst(assetTreeArray), editorState);
}

function initRootAssetTree(editorState, engineState) {
  var match = TreeRootAssetEditorService$WonderEditor.getAssetTreeRoot(editorState);
  if (match !== undefined) {
    return /* tuple */[
            match,
            editorState
          ];
  } else {
    var editorState$1 = IndexAssetEditorService$WonderEditor.increaseIndex(editorState);
    var rootIndex = IndexAssetEditorService$WonderEditor.getIndex(editorState$1);
    return /* tuple */[
            TreeAssetEditorService$WonderEditor.buildAssetTreeNodeByIndex(rootIndex, /* Folder */0, TreeAssetEditorService$WonderEditor.getRootTreeNodeIsShowChildren(/* () */0)),
            FolderNodeUtils$WonderEditor.addFolderIntoNodeMap(rootIndex, undefined, FolderNodeUtils$WonderEditor.getAssetTreeRootName(/* () */0), /* tuple */[
                  editorState$1,
                  engineState
                ])
          ];
  }
}

function getTargetTreeNodeId(editorState) {
  var match = CurrentNodeParentIdAssetEditorService$WonderEditor.getCurrentNodeParentId(editorState);
  if (match !== undefined) {
    return match;
  } else {
    return TreeRootAssetEditorService$WonderEditor.getRootTreeNodeId(editorState);
  }
}

function insertSourceTreeNodeToTargetTreeNodeChildren(targetNodeId, newTreeNode, assetTreeRoot) {
  var _iterateInsertIntoAssetTree = function (targetNodeId, newTreeNode, assetTreeArr) {
    return assetTreeArr.map((function (treeNode) {
                  var children = treeNode[/* children */1];
                  var match = TreeAssetEditorService$WonderEditor.isIdEqual(treeNode[/* nodeId */0], targetNodeId);
                  if (match) {
                    return /* record */[
                            /* nodeId */treeNode[/* nodeId */0],
                            /* children */ArrayService$WonderEditor.push(newTreeNode, children.slice()),
                            /* type_ */treeNode[/* type_ */2],
                            /* isShowChildren */treeNode[/* isShowChildren */3]
                          ];
                  } else {
                    return /* record */[
                            /* nodeId */treeNode[/* nodeId */0],
                            /* children */_iterateInsertIntoAssetTree(targetNodeId, newTreeNode, children),
                            /* type_ */treeNode[/* type_ */2],
                            /* isShowChildren */treeNode[/* isShowChildren */3]
                          ];
                  }
                }));
  };
  return ArrayService$WonderEditor.unsafeGetFirst(_iterateInsertIntoAssetTree(targetNodeId, newTreeNode, /* array */[assetTreeRoot]));
}

function createNodeAndAddToTargetNodeChildren(targetTreeNode, nodeId, type_, editorState) {
  return TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(insertSourceTreeNodeToTargetTreeNodeChildren(targetTreeNode, TreeAssetEditorService$WonderEditor.buildAssetTreeNodeByIndex(nodeId, type_, TreeAssetEditorService$WonderEditor.getTreeNodeDefaultIsShowChildren(/* () */0)), TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState)), editorState);
}

function _isSourceTreeNodeBeTargetParent(targetNodeId, sourceTreeNode) {
  var match = TreeAssetEditorService$WonderEditor.isIdEqual(targetNodeId, sourceTreeNode[/* nodeId */0]);
  if (match) {
    return true;
  } else {
    return ArrayService$WonderCommonlib.reduceOneParam((function (result, child) {
                  if (result) {
                    return true;
                  } else {
                    return _isSourceTreeNodeBeTargetParent(targetNodeId, child);
                  }
                }), false, sourceTreeNode[/* children */1]);
  }
}

function _isTargetTreeNodeBeSourceParent(targetTreeNode, sourceNodeId) {
  var match = targetTreeNode[/* children */1].filter((function (child) {
          return TreeAssetEditorService$WonderEditor.isIdEqual(child[/* nodeId */0], sourceNodeId);
        })).length >= 1;
  if (match) {
    return true;
  } else {
    return false;
  }
}

function checkAssetNodeName(param, targetNodeId, type_, param$1, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var sourceNodeId = param[0];
  var match = IterateAssetTreeAssetEditorService$WonderEditor.getChildrenNameAndIdArr(targetNodeId, type_, /* tuple */[
              editorState,
              engineState
            ]).filter((function (param) {
              return param[1] !== sourceNodeId;
            })).map((function (param) {
            return param[0];
          })).includes(param[1]);
  if (match) {
    return Curry._1(param$1[0], /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    return Curry._1(param$1[1], /* tuple */[
                editorState,
                engineState
              ]);
  }
}

function _isTargetTreeNodeHasSameNameChild(isWarn, targetNodeId, sourceNodeId, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = OptionService$WonderEditor.unsafeGet(TreeAssetEditorService$WonderEditor.getSpecificTreeNodeById(sourceNodeId, OptionService$WonderEditor.unsafeGet(TreeRootAssetEditorService$WonderEditor.getAssetTreeRoot(editorState))));
  var type_ = match[/* type_ */2];
  var sourceNodeName = AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(type_, /* tuple */[
        (function (param) {
            return FolderNodeMapAssetEditorService$WonderEditor.getFolderName(sourceNodeId, param);
          }),
        (function (param) {
            return OperateTextureLogicService$WonderEditor.getTextureBaseName(sourceNodeId, param);
          }),
        (function (param) {
            return MaterialNodeMapAssetLogicService$WonderEditor.getMaterialBaseName(sourceNodeId, engineState, param);
          }),
        (function (param) {
            return WDBNodeMapAssetEditorService$WonderEditor.getWDBBaseName(sourceNodeId, param);
          })
      ], editorState);
  return checkAssetNodeName(/* tuple */[
              sourceNodeId,
              sourceNodeName
            ], targetNodeId, type_, /* tuple */[
              (function (param) {
                  if (isWarn) {
                    ConsoleUtils$WonderEditor.warn("the asset can't has the same name !", param[0]);
                  }
                  return true;
                }),
              (function () {
                  return false;
                })
            ], /* tuple */[
              editorState,
              engineState
            ]);
}

function isTreeNodeRelationError(isWarn, targetNodeId, sourceNodeId, param) {
  var editorState = param[0];
  var match = TreeAssetEditorService$WonderEditor.isIdEqual(targetNodeId, sourceNodeId);
  if (match) {
    return true;
  } else {
    var match$1 = _isSourceTreeNodeBeTargetParent(targetNodeId, OptionService$WonderEditor.unsafeGet(TreeAssetEditorService$WonderEditor.getSpecificTreeNodeById(sourceNodeId, TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState))));
    if (match$1 || _isTargetTreeNodeBeSourceParent(OptionService$WonderEditor.unsafeGet(TreeAssetEditorService$WonderEditor.getSpecificTreeNodeById(targetNodeId, TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState))), sourceNodeId)) {
      return true;
    } else {
      return _isTargetTreeNodeHasSameNameChild(isWarn, targetNodeId, sourceNodeId, /* tuple */[
                  editorState,
                  param[1]
                ]);
    }
  }
}

function rebuildRootAssetTree(parentFolderNodeId, pathName, param) {
  var editorState = param[0];
  var match = TreeRootAssetEditorService$WonderEditor.getAssetTreeRoot(editorState);
  if (match !== undefined) {
    return /* tuple */[
            TreeRootAssetEditorService$WonderEditor.getRootTreeNodeId(editorState),
            editorState
          ];
  } else {
    var match$1 = AssetIdUtils$WonderEditor.generateAssetId(editorState);
    var rootIndex = match$1[1];
    var editorState$1 = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(TreeAssetEditorService$WonderEditor.buildAssetTreeNodeByIndex(rootIndex, /* Folder */0, TreeAssetEditorService$WonderEditor.getRootTreeNodeIsShowChildren(/* () */0)), match$1[0]);
    var editorState$2 = FolderNodeUtils$WonderEditor.addFolderIntoNodeMap(rootIndex, parentFolderNodeId, pathName, /* tuple */[
          editorState$1,
          param[1]
        ]);
    return /* tuple */[
            rootIndex,
            editorState$2
          ];
  }
}

function rebuildFolder(parentFolderNodeId, pathName, param) {
  var engineState = param[1];
  var editorState = param[0];
  var resultArr = IterateAssetTreeAssetEditorService$WonderEditor.getChildrenNameAndIdArr(OptionService$WonderEditor.unsafeGet(parentFolderNodeId), /* Folder */0, /* tuple */[
          editorState,
          engineState
        ]).filter((function (param) {
          return pathName === param[0];
        }));
  var match = resultArr.length === 0;
  if (match) {
    var match$1 = AssetIdUtils$WonderEditor.generateAssetId(editorState);
    var newIndex = match$1[1];
    var editorState$1 = FolderNodeUtils$WonderEditor.addFolderIntoNodeMap(newIndex, parentFolderNodeId, pathName, /* tuple */[
          match$1[0],
          engineState
        ]);
    var editorState$2 = createNodeAndAddToTargetNodeChildren(OptionService$WonderEditor.unsafeGet(parentFolderNodeId), newIndex, /* Folder */0, editorState$1);
    return /* tuple */[
            newIndex,
            editorState$2
          ];
  } else {
    var match$2 = ArrayService$WonderEditor.unsafeGetFirst(resultArr);
    return /* tuple */[
            match$2[1],
            editorState
          ];
  }
}

export {
  enterFolder ,
  buildAssetTreeArray ,
  setSpecificAssetTreeNodeIsShowChildren ,
  updateAssetTreeArrayData ,
  setSpecificAssetTreeNodeIsShowChildrenFromEditorState ,
  initRootAssetTree ,
  getTargetTreeNodeId ,
  insertSourceTreeNodeToTargetTreeNodeChildren ,
  createNodeAndAddToTargetNodeChildren ,
  _isSourceTreeNodeBeTargetParent ,
  _isTargetTreeNodeBeSourceParent ,
  checkAssetNodeName ,
  _isTargetTreeNodeHasSameNameChild ,
  isTreeNodeRelationError ,
  rebuildRootAssetTree ,
  rebuildFolder ,
  
}
/* AppStore-WonderEditor Not a pure module */
