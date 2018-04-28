'use strict';

import * as Log$WonderLog                   from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$WonderEditor       from "../../../../../../service/atom/ArrayService.js";
import * as StateLogicService$WonderEditor  from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor from "../../../../../../service/state/editor/AssetEditorService.js";

function increaseIndex(editorState) {
  var nextIndex = AssetEditorService$WonderEditor.getIndex(editorState) + 1 | 0;
  return /* tuple */[
          nextIndex,
          AssetEditorService$WonderEditor.setIndex(nextIndex, editorState)
        ];
}

function getRootTreeNodeId(editorState) {
  var match = AssetEditorService$WonderEditor.getAssetTree(editorState);
  if (match) {
    return ArrayService$WonderEditor.getFirst(match[0])[/* id */0];
  } else {
    return 0;
  }
}

function getTargetTreeNodeId(editorState) {
  var match = AssetEditorService$WonderEditor.getCurrentTreeNode(editorState);
  if (match) {
    return match[0];
  } else {
    return getRootTreeNodeId(editorState);
  }
}

function _getTreeNodeName(index) {
  var match = +(index === StateLogicService$WonderEditor.getEditorState(getRootTreeNodeId));
  if (match !== 0) {
    return "Asset";
  } else {
    return "newFolder";
  }
}

function buildAssetTreeNodeByIndex(index) {
  return /* record */[
          /* id */index,
          /* name */_getTreeNodeName(index),
          /* imgArray : int array */[],
          /* children : array */[]
        ];
}

function buildAssetTree(editorState) {
  var match = AssetEditorService$WonderEditor.getAssetTree(editorState);
  if (match) {
    return match[0];
  } else {
    return /* array */[buildAssetTreeNodeByIndex(AssetEditorService$WonderEditor.getIndex(editorState))];
  }
}

function insertNewTreeNodeToTargetTreeNode(targetId, newTreeNode, assetTree) {
  return assetTree.map((function (treeNode) {
                var children = treeNode[/* children */3];
                var match = +(treeNode[/* id */0] === targetId);
                if (match !== 0) {
                  return /* record */[
                          /* id */treeNode[/* id */0],
                          /* name */treeNode[/* name */1],
                          /* imgArray */treeNode[/* imgArray */2],
                          /* children */ArrayService$WonderEditor.push(newTreeNode, children.slice())
                        ];
                } else {
                  return /* record */[
                          /* id */treeNode[/* id */0],
                          /* name */treeNode[/* name */1],
                          /* imgArray */treeNode[/* imgArray */2],
                          /* children */insertNewTreeNodeToTargetTreeNode(targetId, newTreeNode, children)
                        ];
                }
              }));
}

function addFileIntoTargetTreeNode(targetId, fileId, type_, assetTree) {
  return assetTree.map((function (treeNode) {
                var match = +(treeNode[/* id */0] === targetId);
                if (match !== 0) {
                  if (type_ !== 0) {
                    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addFileIntoTargetTreeNode", "the type:" + (String(type_) + " not exist"), "", "", "type:" + (String(type_) + "")));
                  } else {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* name */treeNode[/* name */1],
                            /* imgArray */ArrayService$WonderEditor.push(fileId, treeNode[/* imgArray */2].slice()),
                            /* children */treeNode[/* children */3]
                          ];
                  }
                } else {
                  return /* record */[
                          /* id */treeNode[/* id */0],
                          /* name */treeNode[/* name */1],
                          /* imgArray */treeNode[/* imgArray */2],
                          /* children */addFileIntoTargetTreeNode(targetId, fileId, type_, treeNode[/* children */3])
                        ];
                }
              }));
}

export {
  increaseIndex                     ,
  getRootTreeNodeId                 ,
  getTargetTreeNodeId               ,
  _getTreeNodeName                  ,
  buildAssetTreeNodeByIndex         ,
  buildAssetTree                    ,
  insertNewTreeNodeToTargetTreeNode ,
  addFileIntoTargetTreeNode         ,
  
}
/* Log-WonderLog Not a pure module */
