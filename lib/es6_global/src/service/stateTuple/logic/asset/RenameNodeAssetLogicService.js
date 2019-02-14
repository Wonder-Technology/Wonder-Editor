

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Result$WonderEditor from "../../../../module/Result.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../record/editor/asset/WDBNodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../record/editor/asset/FolderNodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../state/editor/asset/TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";
import * as OperateTreeAssetService$WonderEditor from "../../../record/editor/asset/OperateTreeAssetService.js";
import * as OperateTextureLogicService$WonderEditor from "../OperateTextureLogicService.js";
import * as OperateMaterialLogicService$WonderEditor from "../material/OperateMaterialLogicService.js";
import * as OperateTreeAssetLogicService$WonderEditor from "./OperateTreeAssetLogicService.js";
import * as PrepareDefaultComponentLogicService$WonderEditor from "../PrepareDefaultComponentLogicService.js";

function _renameTextureNode(name, param, engineState) {
  return OperateTextureLogicService$WonderEditor.setName(param[/* textureComponent */0], name, engineState);
}

function _isNameEqualDefaultMaterialName(type_, name) {
  var defaultName = type_ ? PrepareDefaultComponentLogicService$WonderEditor.getDefaultLightMaterialName(/* () */0) : PrepareDefaultComponentLogicService$WonderEditor.getDefaultBasicMaterialName(/* () */0);
  return name === defaultName;
}

function _renameMaterialNode(name, param, engineState) {
  var type_ = param[/* type_ */0];
  var match = _isNameEqualDefaultMaterialName(type_, name);
  if (match) {
    return /* tuple */[
            Result$WonderEditor.RelationResult[/* fail */1]("material name:" + (String(name) + " shouldn\'t equal default material name")),
            engineState
          ];
  } else {
    return /* tuple */[
            Result$WonderEditor.RelationResult[/* success */0](/* () */0),
            OperateMaterialLogicService$WonderEditor.setName(param[/* materialComponent */1], type_, name, engineState)
          ];
  }
}

function _checkParentNode(parentNode, updatedData, engineState, getNodeNameFunc) {
  if (parentNode !== undefined) {
    var match = OperateTreeAssetLogicService$WonderEditor.isNodeChildHasTargetName(Curry._1(getNodeNameFunc, updatedData), parentNode, engineState);
    if (match) {
      return Result$WonderEditor.RelationResult[/* fail */1]("parent node shouldn't has the child with the same name");
    } else {
      return Result$WonderEditor.RelationResult[/* success */0](/* () */0);
    }
  } else {
    return Result$WonderEditor.RelationResult[/* success */0](/* () */0);
  }
}

function _textureNodeFunc(param, param$1, nodeId, nodeData) {
  var engineState = param$1[3];
  var tree = param$1[2];
  var parentNode = param$1[1];
  var result = param$1[0];
  var match = Result$WonderEditor.RelationResult[/* isSuccess */2](result) && NodeAssetService$WonderEditor.isIdEqual(nodeId, param[0]);
  if (match) {
    var engineState$1 = _renameTextureNode(param[1], nodeData, engineState);
    return /* tuple */[
            Result$WonderEditor.RelationResult[/* success */0](/* () */0),
            parentNode,
            tree,
            engineState$1
          ];
  } else {
    return /* tuple */[
            result,
            parentNode,
            tree,
            engineState
          ];
  }
}

function _materialNodeFunc(param, param$1, nodeId, nodeData) {
  var engineState = param$1[3];
  var tree = param$1[2];
  var parentNode = param$1[1];
  var result = param$1[0];
  var match = Result$WonderEditor.RelationResult[/* isSuccess */2](result) && NodeAssetService$WonderEditor.isIdEqual(nodeId, param[0]);
  if (match) {
    var match$1 = _renameMaterialNode(param[1], nodeData, engineState);
    return /* tuple */[
            match$1[0],
            parentNode,
            tree,
            match$1[1]
          ];
  } else {
    return /* tuple */[
            result,
            parentNode,
            tree,
            engineState
          ];
  }
}

function _wdbNodeFunc(param, param$1, nodeId, nodeData) {
  var engineState = param$1[3];
  var tree = param$1[2];
  var parentNode = param$1[1];
  var result = param$1[0];
  var match = Result$WonderEditor.RelationResult[/* isSuccess */2](result) && NodeAssetService$WonderEditor.isIdEqual(nodeId, param[0]);
  if (match) {
    var updatedNodeData = WDBNodeAssetService$WonderEditor.rename(param[1], nodeData);
    return /* tuple */[
            _checkParentNode(parentNode, updatedNodeData, engineState, WDBNodeAssetService$WonderEditor.getNodeName),
            parentNode,
            OperateTreeAssetService$WonderEditor.updateNode(nodeId, updatedNodeData, WDBNodeAssetService$WonderEditor.buildNodeByNodeData, tree),
            engineState
          ];
  } else {
    return /* tuple */[
            result,
            parentNode,
            tree,
            engineState
          ];
  }
}

function _folderNodeFunc(param, param$1, nodeId, nodeData, children) {
  var engineState = param$1[3];
  var tree = param$1[2];
  var result = param$1[0];
  var match = Result$WonderEditor.RelationResult[/* isSuccess */2](result) && NodeAssetService$WonderEditor.isIdEqual(nodeId, param[0]);
  if (match) {
    var updatedNodeData = FolderNodeAssetService$WonderEditor.rename(param[1], nodeData);
    var node = FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, updatedNodeData, children);
    return /* tuple */[
            _checkParentNode(param$1[1], updatedNodeData, engineState, FolderNodeAssetService$WonderEditor.getNodeName),
            node,
            OperateTreeAssetService$WonderEditor.updateNode(nodeId, updatedNodeData, (function (param) {
                    return (function (param$1) {
                        var param$2 = param$1;
                        var param$3 = children;
                        return FolderNodeAssetService$WonderEditor.buildNodeByNodeData(param, param$2, param$3);
                      });
                  }), tree),
            engineState
          ];
  } else {
    var node$1 = FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, children);
    return /* tuple */[
            result,
            node$1,
            tree,
            engineState
          ];
  }
}

function renameNode(targetNodeId, name, param) {
  var editorState = param[0];
  var tree = TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState);
  var partial_arg = /* tuple */[
    targetNodeId,
    name
  ];
  var partial_arg$1 = /* tuple */[
    targetNodeId,
    name
  ];
  var partial_arg$2 = /* tuple */[
    targetNodeId,
    name
  ];
  var partial_arg$3 = /* tuple */[
    targetNodeId,
    name
  ];
  var match = IterateTreeAssetService$WonderEditor.fold((function (param, param$1, param$2, param$3) {
          return _folderNodeFunc(partial_arg, param, param$1, param$2, param$3);
        }), /* tuple */[
        Result$WonderEditor.RelationResult[/* success */0](/* () */0),
        undefined,
        tree,
        param[1]
      ], tree, undefined, (function (param, param$1, param$2) {
          return _textureNodeFunc(partial_arg$1, param, param$1, param$2);
        }), (function (param, param$1, param$2) {
          return _materialNodeFunc(partial_arg$2, param, param$1, param$2);
        }), (function (param, param$1, param$2) {
          return _wdbNodeFunc(partial_arg$3, param, param$1, param$2);
        }), /* () */0);
  var engineState = match[3];
  var result = match[0];
  if (result.tag) {
    return Result$WonderEditor.SameDataResult[/* fail */1](/* tuple */[
                OptionService$WonderEditor.unsafeGet(result[0]),
                /* tuple */[
                  TreeAssetEditorService$WonderEditor.setTree(tree, editorState),
                  engineState
                ]
              ]);
  } else {
    return Result$WonderEditor.SameDataResult[/* success */0](/* tuple */[
                TreeAssetEditorService$WonderEditor.setTree(match[2], editorState),
                engineState
              ]);
  }
}

export {
  _renameTextureNode ,
  _isNameEqualDefaultMaterialName ,
  _renameMaterialNode ,
  _checkParentNode ,
  _textureNodeFunc ,
  _materialNodeFunc ,
  _wdbNodeFunc ,
  _folderNodeFunc ,
  renameNode ,
  
}
/* OptionService-WonderEditor Not a pure module */
