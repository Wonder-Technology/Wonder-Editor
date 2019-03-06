

import * as List from "../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_format from "../../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../record/editor/asset/FolderNodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../state/editor/asset/TreeAssetEditorService.js";
import * as IndexAssetEditorService$WonderEditor from "../../../state/editor/asset/IndexAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";
import * as OperateTreeAssetService$WonderEditor from "../../../record/editor/asset/OperateTreeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "./NodeNameAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../state/editor/asset/OperateTreeAssetEditorService.js";

function addFolderNodesToTreeByPath(path, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = OperateTreeAssetService$WonderEditor.addFolderNodesToTreeByPath(path, (function (param) {
          return (function (param$1) {
              var param$2 = param$1;
              var param$3 = engineState;
              return NodeNameAssetLogicService$WonderEditor.isNodeEqualByName(param, param$2, param$3);
            });
        }), TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), IndexAssetEditorService$WonderEditor.getNodeIndex(editorState));
  return /* tuple */[
          TreeAssetEditorService$WonderEditor.setTree(match[0], IndexAssetEditorService$WonderEditor.setNodeIndex(match[1], editorState)),
          match[2]
        ];
}

function getNodeNameById(nodeId, tree, engineState) {
  return Js_option.map((function (node) {
                return NodeNameAssetLogicService$WonderEditor.getNodeName(node, engineState);
              }), OperateTreeAssetService$WonderEditor.findNodeById(nodeId, tree));
}

function _includeTargetChild(folderNode, targetChild, isNodeEqualFunc) {
  return Js_option.isSome(OperateTreeAssetService$WonderEditor.findTargetChild(folderNode, targetChild, isNodeEqualFunc));
}

function _isTargetNodeHasSameNameChild(sourceNode, targetNode, engineState) {
  return _includeTargetChild(targetNode, sourceNode, (function (param) {
                return (function (param$1) {
                    var param$2 = param$1;
                    var param$3 = engineState;
                    return NodeNameAssetLogicService$WonderEditor.isNodeEqualByName(param, param$2, param$3);
                  });
              }));
}

function _canFindOne(predTextureNodeFunc, predMaterialNodeFunc, predWDBNodeFunc, predFolderNodeFunc, tree) {
  return List.length(IterateTreeAssetService$WonderEditor.filter(tree, /* [] */0, (function (node, acc) {
                    return /* :: */[
                            node,
                            acc
                          ];
                  }), predTextureNodeFunc, predMaterialNodeFunc, predWDBNodeFunc, predFolderNodeFunc, /* () */0)) > 0;
}

function _isSourceNodeBeOneOfAllParentsOfTargetNode(sourceNode, targetNode) {
  var match = FolderNodeAssetService$WonderEditor.isFolderNode(sourceNode);
  if (match) {
    var _nodeFunc = function (node) {
      return NodeAssetService$WonderEditor.isNodeEqualById(node, targetNode);
    };
    return _canFindOne(_nodeFunc, _nodeFunc, _nodeFunc, _nodeFunc, sourceNode);
  } else {
    return false;
  }
}

function _isTargetNodeBeSourceNodeParent(sourceNode, targetNode) {
  var match = FolderNodeAssetService$WonderEditor.isFolderNode(targetNode);
  if (match) {
    return _includeTargetChild(targetNode, sourceNode, NodeAssetService$WonderEditor.isNodeEqualById);
  } else {
    return false;
  }
}

function checkNodeRelation(sourceNodeId, targetNodeId, param) {
  var editorState = param[0];
  var sourceNode = OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(sourceNodeId, editorState);
  var targetNode = OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(targetNodeId, editorState);
  var match = !FolderNodeAssetService$WonderEditor.isFolderNode(targetNode);
  if (match) {
    return /* Fail */Block.__(1, ["target node should be folder"]);
  } else {
    var match$1 = NodeAssetService$WonderEditor.isNodeEqualById(sourceNode, targetNode);
    if (match$1) {
      return /* Fail */Block.__(1, ["source and target node shouldn't be the same"]);
    } else {
      var match$2 = _isSourceNodeBeOneOfAllParentsOfTargetNode(sourceNode, targetNode);
      if (match$2) {
        return /* Fail */Block.__(1, ["source node shouldn't be one of all parents of the target node"]);
      } else {
        var match$3 = _isTargetNodeBeSourceNodeParent(sourceNode, targetNode);
        if (match$3) {
          return /* Fail */Block.__(1, ["target node shouldn't be the parent of the source node"]);
        } else {
          var match$4 = _isTargetNodeHasSameNameChild(sourceNode, targetNode, param[1]);
          if (match$4) {
            return /* Fail */Block.__(1, ["target node shouldn't has the child with the same name of the source node"]);
          } else {
            return /* Success */Block.__(0, [/* () */0]);
          }
        }
      }
    }
  }
}

function isNodeChildHasTargetName(targetName, node, engineState) {
  return Js_option.isSome(Caml_option.undefined_to_opt(FolderNodeAssetService$WonderEditor.getChildrenNodes(node).find((function (child) {
                        return NodeNameAssetLogicService$WonderEditor.isTargetNameNode(child, targetName, engineState);
                      }))));
}

function _buildUniqueName(name) {
  var match = (/(.+)[\s](\d+)$/).exec(name);
  if (match !== null) {
    var postfix = String(Caml_format.caml_int_of_string(Caml_array.caml_array_get(match, 2)) + 1 | 0);
    return Caml_array.caml_array_get(match, 1) + (" " + postfix);
  } else {
    return name + " 1";
  }
}

function getUniqueNodeName(_name, parentFolderNode, engineState) {
  while(true) {
    var name = _name;
    var match = isNodeChildHasTargetName(name, parentFolderNode, engineState);
    if (match) {
      _name = _buildUniqueName(name);
      continue ;
    } else {
      return name;
    }
  };
}

export {
  addFolderNodesToTreeByPath ,
  getNodeNameById ,
  _includeTargetChild ,
  _isTargetNodeHasSameNameChild ,
  _canFindOne ,
  _isSourceNodeBeOneOfAllParentsOfTargetNode ,
  _isTargetNodeBeSourceNodeParent ,
  checkNodeRelation ,
  isNodeChildHasTargetName ,
  _buildUniqueName ,
  getUniqueNodeName ,
  
}
/* FolderNodeAssetService-WonderEditor Not a pure module */
