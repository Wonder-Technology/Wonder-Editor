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

function getRootTreeNode(editorState) {
  return ArrayService$WonderEditor.getFirst(AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
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

function isIdEqual(id, targetId) {
  return +(id === targetId);
}

function isTargetIdEqualRootId(editorState) {
  return +(getTargetTreeNodeId(editorState) === getRootTreeNodeId(editorState));
}

function getSpecificTreeNodeById(id, node) {
  var match = +(id === node[/* id */0]);
  if (match !== 0) {
    return /* Some */[node];
  } else {
    return node[/* children */4].reduce((function (resultNode, child) {
                  if (resultNode) {
                    return resultNode;
                  } else {
                    return getSpecificTreeNodeById(id, child);
                  }
                }), /* None */0);
  }
}

function removeFileAndInsertFile(targetTreeNodeId, removedTreeNodeId, fileId, fileType, assetTree) {
  Log$WonderLog.print(/* tuple */[
        targetTreeNodeId,
        removedTreeNodeId,
        fileId
      ]);
  return assetTree.map((function (treeNode) {
                var id = treeNode[/* id */0];
                var jsonArray = treeNode[/* jsonArray */3];
                var imgArray = treeNode[/* imgArray */2];
                if (id === targetTreeNodeId) {
                  if (fileType !== 0) {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* name */treeNode[/* name */1],
                            /* imgArray */treeNode[/* imgArray */2],
                            /* jsonArray */ArrayService$WonderEditor.push(fileId, jsonArray.slice()),
                            /* children */treeNode[/* children */4]
                          ];
                  } else {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* name */treeNode[/* name */1],
                            /* imgArray */ArrayService$WonderEditor.push(fileId, imgArray.slice()),
                            /* jsonArray */treeNode[/* jsonArray */3],
                            /* children */treeNode[/* children */4]
                          ];
                  }
                } else if (id === removedTreeNodeId) {
                  if (fileType !== 0) {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* name */treeNode[/* name */1],
                            /* imgArray */treeNode[/* imgArray */2],
                            /* jsonArray */jsonArray.slice().filter((function (id) {
                                    return +(id !== fileId);
                                  })),
                            /* children */treeNode[/* children */4]
                          ];
                  } else {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* name */treeNode[/* name */1],
                            /* imgArray */imgArray.slice().filter((function (id) {
                                    return +(id !== fileId);
                                  })),
                            /* jsonArray */treeNode[/* jsonArray */3],
                            /* children */treeNode[/* children */4]
                          ];
                  }
                } else {
                  return /* record */[
                          /* id */treeNode[/* id */0],
                          /* name */treeNode[/* name */1],
                          /* imgArray */treeNode[/* imgArray */2],
                          /* jsonArray */treeNode[/* jsonArray */3],
                          /* children */removeFileAndInsertFile(targetTreeNodeId, removedTreeNodeId, fileId, fileType, treeNode[/* children */4])
                        ];
                }
              }));
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
          /* jsonArray : int array */[],
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

function removeSpecificTreeNodeFromAssetTree(targetId, assetTree) {
  var _iterateAssetTree = function (targetId, assetTree, newAssetTree, removedTreeNode) {
    return assetTree.reduce((function (param, treeNode) {
                  var newAssetTree = param[0];
                  var match = +(treeNode[/* id */0] === targetId);
                  if (match !== 0) {
                    return /* tuple */[
                            newAssetTree,
                            /* Some */[treeNode]
                          ];
                  } else {
                    var match$1 = _iterateAssetTree(targetId, treeNode[/* children */4], /* array */[], param[1]);
                    return /* tuple */[
                            ArrayService$WonderEditor.push(/* record */[
                                  /* id */treeNode[/* id */0],
                                  /* name */treeNode[/* name */1],
                                  /* imgArray */treeNode[/* imgArray */2],
                                  /* jsonArray */treeNode[/* jsonArray */3],
                                  /* children */match$1[0]
                                ], newAssetTree),
                            match$1[1]
                          ];
                  }
                }), /* tuple */[
                newAssetTree,
                removedTreeNode
              ]);
  };
  var match = _iterateAssetTree(targetId, assetTree, /* array */[], /* None */0);
  var match$1 = match[1];
  if (match$1) {
    return /* tuple */[
            match[0],
            match$1[0]
          ];
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("removeSpecificTreeNodeFromAssetTree", "\n     the removed treenode " + (String(targetId) + " is not exist "), "", "", ""));
  }
}

function insertNewTreeNodeToTargetTreeNode(targetId, newTreeNode, assetTree) {
  return assetTree.map((function (treeNode) {
                var children = treeNode[/* children */4];
                var match = +(treeNode[/* id */0] === targetId);
                if (match !== 0) {
                  return /* record */[
                          /* id */treeNode[/* id */0],
                          /* name */treeNode[/* name */1],
                          /* imgArray */treeNode[/* imgArray */2],
                          /* jsonArray */treeNode[/* jsonArray */3],
                          /* children */ArrayService$WonderEditor.push(newTreeNode, children.slice())
                        ];
                } else {
                  return /* record */[
                          /* id */treeNode[/* id */0],
                          /* name */treeNode[/* name */1],
                          /* imgArray */treeNode[/* imgArray */2],
                          /* jsonArray */treeNode[/* jsonArray */3],
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
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* name */treeNode[/* name */1],
                            /* imgArray */treeNode[/* imgArray */2],
                            /* jsonArray */ArrayService$WonderEditor.push(fileId, treeNode[/* jsonArray */3].slice()),
                            /* children */treeNode[/* children */4]
                          ];
                  } else {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* name */treeNode[/* name */1],
                            /* imgArray */ArrayService$WonderEditor.push(fileId, treeNode[/* imgArray */2].slice()),
                            /* jsonArray */treeNode[/* jsonArray */3],
                            /* children */treeNode[/* children */4]
                          ];
                  }
                } else {
                  return /* record */[
                          /* id */treeNode[/* id */0],
                          /* name */treeNode[/* name */1],
                          /* imgArray */treeNode[/* imgArray */2],
                          /* jsonArray */treeNode[/* jsonArray */3],
                          /* children */addFileIntoTargetTreeNode(targetId, fileId, type_, treeNode[/* children */4])
                        ];
                }
              }));
}

export {
  increaseIndex                       ,
  getRootTreeNode                     ,
  getRootTreeNodeId                   ,
  getTargetTreeNodeId                 ,
  isIdEqual                           ,
  isTargetIdEqualRootId               ,
  getSpecificTreeNodeById             ,
  removeFileAndInsertFile             ,
  _getTreeNodeName                    ,
  buildAssetTreeNodeByIndex           ,
  buildAssetTree                      ,
  removeSpecificTreeNodeFromAssetTree ,
  insertNewTreeNodeToTargetTreeNode   ,
  addFileIntoTargetTreeNode           ,
  
}
/* Log-WonderLog Not a pure module */
