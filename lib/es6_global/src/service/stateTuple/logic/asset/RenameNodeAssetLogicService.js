

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
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

function _isNameEqualDefaultMaterialName(type_, name) {
  var defaultName = type_ ? PrepareDefaultComponentLogicService$WonderEditor.getDefaultLightMaterialName(/* () */0) : PrepareDefaultComponentLogicService$WonderEditor.getDefaultBasicMaterialName(/* () */0);
  return name === defaultName;
}

function _checkParentNode(parentFolderNode, nodeName, engineState) {
  if (parentFolderNode !== undefined) {
    var match = OperateTreeAssetLogicService$WonderEditor.isNodeChildHasTargetName(nodeName, parentFolderNode, engineState);
    if (match) {
      return Result$WonderEditor.RelationResult[/* fail */1]("parent node shouldn't has the child with the same name");
    } else {
      return Result$WonderEditor.RelationResult[/* success */0](/* () */0);
    }
  } else {
    return Result$WonderEditor.RelationResult[/* success */0](/* () */0);
  }
}

function _textureNodeFunc(param, parentFolderNode, param$1, nodeId, param$2) {
  var engineState = param$1[2];
  var tree = param$1[1];
  var result = param$1[0];
  var name = param[1];
  var match = Result$WonderEditor.RelationResult[/* isSuccess */2](result) && NodeAssetService$WonderEditor.isIdEqual(nodeId, param[0]);
  if (match) {
    var result$1 = _checkParentNode(parentFolderNode, name, engineState);
    var match$1;
    match$1 = result$1.tag ? /* tuple */[
        result$1,
        engineState
      ] : /* tuple */[
        result$1,
        OperateTextureLogicService$WonderEditor.setName(param$2[/* textureComponent */0], name, engineState)
      ];
    return /* tuple */[
            match$1[0],
            tree,
            match$1[1]
          ];
  } else {
    return /* tuple */[
            result,
            tree,
            engineState
          ];
  }
}

function _materialNodeFunc(param, parentFolderNode, param$1, nodeId, param$2) {
  var type_ = param$2[/* type_ */0];
  var engineState = param$1[2];
  var tree = param$1[1];
  var result = param$1[0];
  var name = param[1];
  var match = Result$WonderEditor.RelationResult[/* isSuccess */2](result) && NodeAssetService$WonderEditor.isIdEqual(nodeId, param[0]);
  if (match) {
    var match$1 = _isNameEqualDefaultMaterialName(type_, name);
    var match$2;
    if (match$1) {
      match$2 = /* tuple */[
        Result$WonderEditor.RelationResult[/* fail */1]("material name:" + (String(name) + " shouldn\'t equal default material name")),
        engineState
      ];
    } else {
      var result$1 = _checkParentNode(parentFolderNode, name, engineState);
      match$2 = result$1.tag ? /* tuple */[
          result$1,
          engineState
        ] : /* tuple */[
          result$1,
          OperateMaterialLogicService$WonderEditor.setName(param$2[/* materialComponent */1], type_, name, engineState)
        ];
    }
    return /* tuple */[
            match$2[0],
            tree,
            match$2[1]
          ];
  } else {
    return /* tuple */[
            result,
            tree,
            engineState
          ];
  }
}

function _wdbNodeFunc(param, parentFolderNode, param$1, nodeId, nodeData) {
  var engineState = param$1[2];
  var tree = param$1[1];
  var result = param$1[0];
  var name = param[1];
  var match = Result$WonderEditor.RelationResult[/* isSuccess */2](result) && NodeAssetService$WonderEditor.isIdEqual(nodeId, param[0]);
  var match$1;
  if (match) {
    var result$1 = _checkParentNode(parentFolderNode, name, engineState);
    var match$2;
    match$2 = result$1.tag ? /* tuple */[
        result$1,
        tree
      ] : /* tuple */[
        result$1,
        OperateTreeAssetService$WonderEditor.updateNode(nodeId, WDBNodeAssetService$WonderEditor.rename(name, nodeData), WDBNodeAssetService$WonderEditor.buildNodeByNodeData, tree)
      ];
    match$1 = /* tuple */[
      match$2[0],
      match$2[1],
      engineState
    ];
  } else {
    match$1 = /* tuple */[
      result,
      tree,
      engineState
    ];
  }
  return /* tuple */[
          match$1[0],
          match$1[1],
          match$1[2]
        ];
}

function _folderNodeFunc(param, parentFolderNode, param$1, nodeId, nodeData, children) {
  var engineState = param$1[2];
  var tree = param$1[1];
  var result = param$1[0];
  var name = param[1];
  var match = Result$WonderEditor.RelationResult[/* isSuccess */2](result) && NodeAssetService$WonderEditor.isIdEqual(nodeId, param[0]);
  if (match) {
    var result$1 = _checkParentNode(parentFolderNode, name, engineState);
    var match$1;
    match$1 = result$1.tag ? /* tuple */[
        result$1,
        tree
      ] : /* tuple */[
        result$1,
        OperateTreeAssetService$WonderEditor.updateNode(nodeId, FolderNodeAssetService$WonderEditor.rename(name, nodeData), (function (param) {
                return (function (param$1) {
                    var param$2 = param$1;
                    var param$3 = children;
                    return FolderNodeAssetService$WonderEditor.buildNodeByNodeData(param, param$2, param$3);
                  });
              }), tree)
      ];
    return /* tuple */[
            match$1[0],
            match$1[1],
            engineState
          ];
  } else {
    FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, children);
    return /* tuple */[
            result,
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
  var match = IterateTreeAssetService$WonderEditor.foldWithParentFolderNode((function (param, param$1, param$2, param$3, param$4) {
          return _folderNodeFunc(partial_arg, param, param$1, param$2, param$3, param$4);
        }), /* tuple */[
        Result$WonderEditor.RelationResult[/* success */0](/* () */0),
        tree,
        param[1]
      ], tree, undefined, (function (param, param$1, param$2, param$3) {
          return _textureNodeFunc(partial_arg$1, param, param$1, param$2, param$3);
        }), (function (param, param$1, param$2, param$3) {
          return _materialNodeFunc(partial_arg$2, param, param$1, param$2, param$3);
        }), (function (param, param$1, param$2, param$3) {
          return _wdbNodeFunc(partial_arg$3, param, param$1, param$2, param$3);
        }), Js_primitive.some(undefined), /* () */0);
  var engineState = match[2];
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
                TreeAssetEditorService$WonderEditor.setTree(match[1], editorState),
                engineState
              ]);
  }
}

export {
  _isNameEqualDefaultMaterialName ,
  _checkParentNode ,
  _textureNodeFunc ,
  _materialNodeFunc ,
  _wdbNodeFunc ,
  _folderNodeFunc ,
  renameNode ,
  
}
/* OptionService-WonderEditor Not a pure module */
