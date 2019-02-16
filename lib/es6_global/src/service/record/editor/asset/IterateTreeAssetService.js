

import * as List from "../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as UIStateAssetService$WonderEditor from "./UIStateAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "./WDBNodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "./FolderNodeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "./TextureNodeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "./MaterialNodeAssetService.js";

function cata(tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var textureNodeFunc = $staropt$star !== undefined ? $staropt$star : TextureNodeAssetService$WonderEditor.buildNodeByNodeData;
  var materialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : MaterialNodeAssetService$WonderEditor.buildNodeByNodeData;
  var wdbNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : WDBNodeAssetService$WonderEditor.buildNodeByNodeData;
  var folderNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : FolderNodeAssetService$WonderEditor.buildNodeByNodeData;
  var arg = textureNodeFunc;
  var arg$1 = materialNodeFunc;
  var arg$2 = wdbNodeFunc;
  var arg$3 = folderNodeFunc;
  var recurse = function (param) {
    return (function (param$1) {
        return cata(param, arg, arg$1, arg$2, arg$3, param$1);
      });
  };
  switch (tree.tag | 0) {
    case 0 : 
        return Curry._2(textureNodeFunc, tree[0], tree[1]);
    case 1 : 
        return Curry._2(materialNodeFunc, tree[0], tree[1]);
    case 2 : 
        return Curry._2(wdbNodeFunc, tree[0], tree[1]);
    case 3 : 
        return Curry._3(folderNodeFunc, tree[0], tree[1], UIStateAssetService$WonderEditor.mapChildren((function (prim, prim$1) {
                          return prim$1.map(Curry.__1(prim));
                        }), (function (__x) {
                          return recurse(__x)(/* () */0);
                        }), tree[2]));
    
  }
}

function fold(folderNodeFunc, acc, tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var seqFoldFunc = $staropt$star !== undefined ? $staropt$star : ArrayService$WonderCommonlib.reduceOneParam;
  var textureNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (acc, _, _$1) {
        return acc;
      });
  var materialNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (acc, _, _$1) {
        return acc;
      });
  var wdbNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (acc, _, _$1) {
        return acc;
      });
  var recurse = function (acc, children) {
    return fold(folderNodeFunc, acc, children, undefined, textureNodeFunc, materialNodeFunc, wdbNodeFunc, /* () */0);
  };
  switch (tree.tag | 0) {
    case 0 : 
        return Curry._3(textureNodeFunc, acc, tree[0], tree[1]);
    case 1 : 
        return Curry._3(materialNodeFunc, acc, tree[0], tree[1]);
    case 2 : 
        return Curry._3(wdbNodeFunc, acc, tree[0], tree[1]);
    case 3 : 
        var children = tree[2];
        var localAccum = Curry._4(folderNodeFunc, acc, tree[0], tree[1], children);
        return UIStateAssetService$WonderEditor.fold(seqFoldFunc, recurse, localAccum, children);
    
  }
}

function foldWithHandleBeforeAndAfterFoldChildren(acc, tree, textureNodeFunc, materialNodeFunc, wdbNodeFunc, folderNodeFunc, handleBeforeFoldChildrenFunc, handleAfterFoldChildrenFunc, $staropt$star, _) {
  var seqFoldFunc = $staropt$star !== undefined ? $staropt$star : ArrayService$WonderCommonlib.reduceOneParam;
  var recurse = function (acc, children) {
    return foldWithHandleBeforeAndAfterFoldChildren(acc, children, textureNodeFunc, materialNodeFunc, wdbNodeFunc, folderNodeFunc, handleBeforeFoldChildrenFunc, handleAfterFoldChildrenFunc, seqFoldFunc, /* () */0);
  };
  switch (tree.tag | 0) {
    case 0 : 
        return Curry._3(textureNodeFunc, acc, tree[0], tree[1]);
    case 1 : 
        return Curry._3(materialNodeFunc, acc, tree[0], tree[1]);
    case 2 : 
        return Curry._3(wdbNodeFunc, acc, tree[0], tree[1]);
    case 3 : 
        var children = tree[2];
        var folderNodeData = tree[1];
        var nodeId = tree[0];
        var localAccum = Curry._4(folderNodeFunc, acc, nodeId, folderNodeData, children);
        var match = Curry._1(handleBeforeFoldChildrenFunc, localAccum);
        if (match) {
          return localAccum;
        } else {
          return Curry._4(handleAfterFoldChildrenFunc, nodeId, folderNodeData, children, UIStateAssetService$WonderEditor.fold(seqFoldFunc, recurse, localAccum, children));
        }
    
  }
}

function filter(tree, acc, pushNodeFunc, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var predTextureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return false;
      });
  var predMaterialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function () {
        return false;
      });
  var predWDBNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function () {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function () {
        return false;
      });
  var _nodeFunc = function (acc, node, predNodeFunc) {
    var match = Curry._1(predNodeFunc, node);
    if (match) {
      return Curry._2(pushNodeFunc, node, acc);
    } else {
      return acc;
    }
  };
  var _textureNodeFunc = function (acc, nodeId, nodeData) {
    return _nodeFunc(acc, TextureNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData), predTextureNodeFunc);
  };
  var _materialNodeFunc = function (acc, nodeId, nodeData) {
    return _nodeFunc(acc, MaterialNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData), predMaterialNodeFunc);
  };
  var _wdbNodeFunc = function (acc, nodeId, nodeData) {
    return _nodeFunc(acc, WDBNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData), predWDBNodeFunc);
  };
  var _folderNodeFunc = function (acc, nodeId, nodeData, children) {
    return _nodeFunc(acc, FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, children), predFolderNodeFunc);
  };
  return fold(_folderNodeFunc, acc, tree, undefined, _textureNodeFunc, _materialNodeFunc, _wdbNodeFunc, /* () */0);
}

function find(tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var predTextureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return false;
      });
  var predMaterialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function () {
        return false;
      });
  var predWDBNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function () {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function () {
        return false;
      });
  var list = filter(tree, /* [] */0, (function (node, acc) {
          return /* :: */[
                  node,
                  acc
                ];
        }), predTextureNodeFunc, predMaterialNodeFunc, predWDBNodeFunc, predFolderNodeFunc, /* () */0);
  if (List.length(list) === 0) {
    return undefined;
  } else {
    return list;
  }
}

function findOne(tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var predTextureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return false;
      });
  var predMaterialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function () {
        return false;
      });
  var predWDBNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function () {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function () {
        return false;
      });
  return Js_option.map(List.hd, find(tree, predTextureNodeFunc, predMaterialNodeFunc, predWDBNodeFunc, predFolderNodeFunc, /* () */0));
}

function map(tree, folderNodeFunc, $staropt$star, $staropt$star$1, $staropt$star$2, _) {
  var textureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (_, nodeData) {
        return nodeData;
      });
  var materialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (_, nodeData) {
        return nodeData;
      });
  var wdbNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (_, nodeData) {
        return nodeData;
      });
  var arg = textureNodeFunc;
  var arg$1 = materialNodeFunc;
  var arg$2 = wdbNodeFunc;
  switch (tree.tag | 0) {
    case 0 : 
        var nodeId = tree[0];
        return /* TextureNode */Block.__(0, [
                  nodeId,
                  Curry._2(textureNodeFunc, nodeId, tree[1])
                ]);
    case 1 : 
        var nodeId$1 = tree[0];
        return /* MaterialNode */Block.__(1, [
                  nodeId$1,
                  Curry._2(materialNodeFunc, nodeId$1, tree[1])
                ]);
    case 2 : 
        var nodeId$2 = tree[0];
        return /* WDBNode */Block.__(2, [
                  nodeId$2,
                  Curry._2(wdbNodeFunc, nodeId$2, tree[1])
                ]);
    case 3 : 
        var nodeId$3 = tree[0];
        var match = Curry._2(folderNodeFunc, nodeId$3, tree[1]);
        return /* FolderNode */Block.__(3, [
                  nodeId$3,
                  match[1],
                  UIStateAssetService$WonderEditor.mapChildren((function (prim, prim$1) {
                          return prim$1.map(Curry.__1(prim));
                        }), (function (__x) {
                          var param = __x;
                          return map(param, folderNodeFunc, arg, arg$1, arg$2, /* () */0);
                        }), UIStateAssetService$WonderEditor.buildByChangeStateType(match[0], tree[2]))
                ]);
    
  }
}

export {
  cata ,
  fold ,
  foldWithHandleBeforeAndAfterFoldChildren ,
  filter ,
  find ,
  findOne ,
  map ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
