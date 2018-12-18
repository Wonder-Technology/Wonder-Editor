

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TreeRootAssetEditorService$WonderEditor from "./TreeRootAssetEditorService.js";

function getRootTreeNodeIsShowChildren(param) {
  return true;
}

function getTreeNodeDefaultIsShowChildren(param) {
  return false;
}

function buildAssetTreeNodeByIndex(index, type_, isShowChildren) {
  return /* record */[
          /* nodeId */index,
          /* children : array */[],
          /* type_ */type_,
          /* isShowChildren */isShowChildren
        ];
}

function isIdEqual(nodeId, targetNodeId) {
  return nodeId === targetNodeId;
}

function getSpecificTreeNodeById(nodeId, targetTreeNode) {
  var match = nodeId === targetTreeNode[/* nodeId */0];
  if (match) {
    return targetTreeNode;
  } else {
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, child) {
                    var nodeId = param[1];
                    var resultNode = param[0];
                    if (resultNode !== undefined) {
                      return /* tuple */[
                              resultNode,
                              nodeId
                            ];
                    } else {
                      return /* tuple */[
                              getSpecificTreeNodeById(nodeId, child),
                              nodeId
                            ];
                    }
                  }), /* tuple */[
                  undefined,
                  nodeId
                ], targetTreeNode[/* children */1])[0];
  }
}

function getAssetNodeFromRoot(nodeId, editorState) {
  return OptionService$WonderEditor.unsafeGet(getSpecificTreeNodeById(nodeId, OptionService$WonderEditor.unsafeGet(TreeRootAssetEditorService$WonderEditor.getAssetTreeRoot(editorState))));
}

export {
  getRootTreeNodeIsShowChildren ,
  getTreeNodeDefaultIsShowChildren ,
  buildAssetTreeNodeByIndex ,
  isIdEqual ,
  getSpecificTreeNodeById ,
  getAssetNodeFromRoot ,
  
}
/* OptionService-WonderEditor Not a pure module */
