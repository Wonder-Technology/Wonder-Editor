

import * as List from "../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as UIStateAssetService$WonderEditor from "./UIStateAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "./WDBNodeAssetService.js";
import * as RootTreeAssetService$WonderEditor from "./RootTreeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "./FolderNodeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "./TextureNodeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "./MaterialNodeAssetService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "./AssetBundleNodeAssetService.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "./ScriptAttributeNodeAssetService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "./ScriptEventFunctionNodeAssetService.js";

function cata(tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var textureNodeFunc = $staropt$star !== undefined ? $staropt$star : TextureNodeAssetService$WonderEditor.buildNodeByNodeData;
  var materialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : MaterialNodeAssetService$WonderEditor.buildNodeByNodeData;
  var scriptEventFunctionNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : ScriptEventFunctionNodeAssetService$WonderEditor.buildNodeByNodeData;
  var scriptAttributeNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : ScriptAttributeNodeAssetService$WonderEditor.buildNodeByNodeData;
  var wdbNodeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : WDBNodeAssetService$WonderEditor.buildNodeByNodeData;
  var assetBundleNodeFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : AssetBundleNodeAssetService$WonderEditor.buildNodeByNodeData;
  var folderNodeFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : FolderNodeAssetService$WonderEditor.buildNodeByNodeData;
  var arg = textureNodeFunc;
  var arg$1 = materialNodeFunc;
  var arg$2 = scriptEventFunctionNodeFunc;
  var arg$3 = scriptAttributeNodeFunc;
  var arg$4 = wdbNodeFunc;
  var arg$5 = assetBundleNodeFunc;
  var arg$6 = folderNodeFunc;
  var recurse = function (param) {
    return (function (param$1) {
        return cata(param, arg, arg$1, arg$2, arg$3, arg$4, arg$5, arg$6, param$1);
      });
  };
  switch (tree.tag | 0) {
    case 0 : 
        return Curry._2(scriptEventFunctionNodeFunc, tree[0], tree[1]);
    case 1 : 
        return Curry._2(scriptAttributeNodeFunc, tree[0], tree[1]);
    case 2 : 
        return Curry._2(textureNodeFunc, tree[0], tree[1]);
    case 3 : 
        return Curry._2(materialNodeFunc, tree[0], tree[1]);
    case 4 : 
        return Curry._2(wdbNodeFunc, tree[0], tree[1]);
    case 5 : 
        return Curry._2(assetBundleNodeFunc, tree[0], tree[1]);
    case 6 : 
        return Curry._3(folderNodeFunc, tree[0], tree[1], UIStateAssetService$WonderEditor.mapChildren((function (prim, prim$1) {
                          return prim$1.map(Curry.__1(prim));
                        }), (function (__x) {
                          return recurse(__x)(/* () */0);
                        }), tree[2]));
    
  }
}

function fold(folderNodeFunc, acc, tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var seqFoldFunc = $staropt$star !== undefined ? $staropt$star : ArrayService$WonderCommonlib.reduceOneParam;
  var textureNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (acc, param, param$1) {
        return acc;
      });
  var materialNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (acc, param, param$1) {
        return acc;
      });
  var scriptEventFunctionNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (acc, param, param$1) {
        return acc;
      });
  var scriptAttributeNodeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (acc, param, param$1) {
        return acc;
      });
  var wdbNodeFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (acc, param, param$1) {
        return acc;
      });
  var assetBundleNodeFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : (function (acc, param, param$1) {
        return acc;
      });
  var recurse = function (acc, child) {
    return fold(folderNodeFunc, acc, child, seqFoldFunc, textureNodeFunc, materialNodeFunc, scriptEventFunctionNodeFunc, scriptAttributeNodeFunc, wdbNodeFunc, assetBundleNodeFunc, /* () */0);
  };
  switch (tree.tag | 0) {
    case 0 : 
        return Curry._3(scriptEventFunctionNodeFunc, acc, tree[0], tree[1]);
    case 1 : 
        return Curry._3(scriptAttributeNodeFunc, acc, tree[0], tree[1]);
    case 2 : 
        return Curry._3(textureNodeFunc, acc, tree[0], tree[1]);
    case 3 : 
        return Curry._3(materialNodeFunc, acc, tree[0], tree[1]);
    case 4 : 
        return Curry._3(wdbNodeFunc, acc, tree[0], tree[1]);
    case 5 : 
        return Curry._3(assetBundleNodeFunc, acc, tree[0], tree[1]);
    case 6 : 
        var children = tree[2];
        var localAccum = Curry._4(folderNodeFunc, acc, tree[0], tree[1], children);
        return UIStateAssetService$WonderEditor.fold(seqFoldFunc, recurse, localAccum, children);
    
  }
}

function foldWithParentFolderNode(folderNodeFunc, acc, tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var seqFoldFunc = $staropt$star !== undefined ? $staropt$star : ArrayService$WonderCommonlib.reduceOneParam;
  var textureNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var materialNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var scriptEventFunctionNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var scriptAttributeNodeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var wdbNodeFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var assetBundleNodeFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var parentFolderNode = $staropt$star$7 !== undefined ? Caml_option.valFromOption($staropt$star$7) : undefined;
  switch (tree.tag | 0) {
    case 0 : 
        return Curry._4(scriptEventFunctionNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 1 : 
        return Curry._4(scriptAttributeNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 2 : 
        return Curry._4(textureNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 3 : 
        return Curry._4(materialNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 4 : 
        return Curry._4(wdbNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 5 : 
        return Curry._4(assetBundleNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 6 : 
        var children = tree[2];
        var folderNodeData = tree[1];
        var nodeId = tree[0];
        var localAccum = Curry._5(folderNodeFunc, parentFolderNode, acc, nodeId, folderNodeData, children);
        var partial_arg = FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, folderNodeData, children);
        return UIStateAssetService$WonderEditor.fold(seqFoldFunc, (function (param, param$1) {
                      var parentFolderNode = partial_arg;
                      var acc = param;
                      var child = param$1;
                      return foldWithParentFolderNode(folderNodeFunc, acc, child, undefined, textureNodeFunc, materialNodeFunc, scriptEventFunctionNodeFunc, scriptAttributeNodeFunc, wdbNodeFunc, assetBundleNodeFunc, Caml_option.some(parentFolderNode), /* () */0);
                    }), localAccum, children);
    
  }
}

function foldWithParentFolderNodeWithoutRootNode(folderNodeFunc, acc, tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var seqFoldFunc = $staropt$star !== undefined ? $staropt$star : ArrayService$WonderCommonlib.reduceOneParam;
  var textureNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var materialNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var scriptEventFunctionNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var scriptAttributeNodeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var wdbNodeFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var assetBundleNodeFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : (function (param, acc, param$1, param$2) {
        return acc;
      });
  var parentFolderNode = $staropt$star$7 !== undefined ? $staropt$star$7 : RootTreeAssetService$WonderEditor.getRootNode(tree);
  switch (tree.tag | 0) {
    case 0 : 
        return Curry._4(scriptEventFunctionNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 1 : 
        return Curry._4(scriptAttributeNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 2 : 
        return Curry._4(textureNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 3 : 
        return Curry._4(materialNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 4 : 
        return Curry._4(wdbNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 5 : 
        return Curry._4(assetBundleNodeFunc, parentFolderNode, acc, tree[0], tree[1]);
    case 6 : 
        var children = tree[2];
        var folderNodeData = tree[1];
        var nodeId = tree[0];
        var match = FolderNodeAssetService$WonderEditor.getNodeName(folderNodeData) === RootTreeAssetService$WonderEditor.getAssetTreeRootName(/* () */0);
        var localAccum = match ? acc : Curry._5(folderNodeFunc, parentFolderNode, acc, nodeId, folderNodeData, children);
        var partial_arg = FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, folderNodeData, children);
        return UIStateAssetService$WonderEditor.fold(seqFoldFunc, (function (param, param$1) {
                      var parentFolderNode = partial_arg;
                      var acc = param;
                      var child = param$1;
                      return foldWithParentFolderNodeWithoutRootNode(folderNodeFunc, acc, child, undefined, textureNodeFunc, materialNodeFunc, scriptEventFunctionNodeFunc, scriptAttributeNodeFunc, wdbNodeFunc, assetBundleNodeFunc, parentFolderNode, /* () */0);
                    }), localAccum, children);
    
  }
}

function foldWithHandleBeforeAndAfterFoldChildren(acc, tree, textureNodeFunc, materialNodeFunc, scriptEventFunctionNodeFunc, scriptAttributeNodeFunc, wdbNodeFunc, assetBundleNodeFunc, folderNodeFunc, handleBeforeFoldChildrenFunc, handleAfterFoldChildrenFunc, $staropt$star, param) {
  var seqFoldFunc = $staropt$star !== undefined ? $staropt$star : ArrayService$WonderCommonlib.reduceOneParam;
  var recurse = function (acc, child) {
    return foldWithHandleBeforeAndAfterFoldChildren(acc, child, textureNodeFunc, materialNodeFunc, scriptEventFunctionNodeFunc, scriptAttributeNodeFunc, wdbNodeFunc, assetBundleNodeFunc, folderNodeFunc, handleBeforeFoldChildrenFunc, handleAfterFoldChildrenFunc, seqFoldFunc, /* () */0);
  };
  switch (tree.tag | 0) {
    case 0 : 
        return Curry._3(scriptEventFunctionNodeFunc, acc, tree[0], tree[1]);
    case 1 : 
        return Curry._3(scriptAttributeNodeFunc, acc, tree[0], tree[1]);
    case 2 : 
        return Curry._3(textureNodeFunc, acc, tree[0], tree[1]);
    case 3 : 
        return Curry._3(materialNodeFunc, acc, tree[0], tree[1]);
    case 4 : 
        return Curry._3(wdbNodeFunc, acc, tree[0], tree[1]);
    case 5 : 
        return Curry._3(assetBundleNodeFunc, acc, tree[0], tree[1]);
    case 6 : 
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

function filter(tree, acc, pushNodeFunc, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var predTextureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (node) {
        return false;
      });
  var predMaterialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (node) {
        return false;
      });
  var predScriptEventFunctionNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (node) {
        return false;
      });
  var predScriptAttributeNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (node) {
        return false;
      });
  var predWDBNodeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (node) {
        return false;
      });
  var predAssetBundleNodeFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (node) {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : (function (node) {
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
  var _scriptEventFunctionNodeFunc = function (acc, nodeId, nodeData) {
    return _nodeFunc(acc, ScriptEventFunctionNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData), predScriptEventFunctionNodeFunc);
  };
  var _scriptAttributeNodeFunc = function (acc, nodeId, nodeData) {
    return _nodeFunc(acc, ScriptAttributeNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData), predScriptAttributeNodeFunc);
  };
  var _wdbNodeFunc = function (acc, nodeId, nodeData) {
    return _nodeFunc(acc, WDBNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData), predWDBNodeFunc);
  };
  var _assetBundleNodeFunc = function (acc, nodeId, nodeData) {
    return _nodeFunc(acc, AssetBundleNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData), predAssetBundleNodeFunc);
  };
  var _folderNodeFunc = function (acc, nodeId, nodeData, children) {
    return _nodeFunc(acc, FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, children), predFolderNodeFunc);
  };
  return fold(_folderNodeFunc, acc, tree, undefined, _textureNodeFunc, _materialNodeFunc, _scriptEventFunctionNodeFunc, _scriptAttributeNodeFunc, _wdbNodeFunc, _assetBundleNodeFunc, /* () */0);
}

function find(tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var predTextureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (node) {
        return false;
      });
  var predMaterialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (node) {
        return false;
      });
  var predScriptEventFunctionNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (node) {
        return false;
      });
  var predScriptAttributeNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (node) {
        return false;
      });
  var predWDBNodeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (node) {
        return false;
      });
  var predAssetBundleNodeFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (node) {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : (function (node) {
        return false;
      });
  var list = filter(tree, /* [] */0, (function (node, acc) {
          return /* :: */[
                  node,
                  acc
                ];
        }), predTextureNodeFunc, predMaterialNodeFunc, predScriptEventFunctionNodeFunc, predScriptAttributeNodeFunc, predWDBNodeFunc, predAssetBundleNodeFunc, predFolderNodeFunc, /* () */0);
  if (List.length(list) === 0) {
    return undefined;
  } else {
    return list;
  }
}

function findOne(tree, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var predTextureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (node) {
        return false;
      });
  var predMaterialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (node) {
        return false;
      });
  var predScriptEventFunctionNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (node) {
        return false;
      });
  var predScriptAttributeNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (node) {
        return false;
      });
  var predWDBNodeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (node) {
        return false;
      });
  var predAssetBundleNodeFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (node) {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : (function (node) {
        return false;
      });
  return Js_option.map(List.hd, find(tree, predTextureNodeFunc, predMaterialNodeFunc, predScriptEventFunctionNodeFunc, predScriptAttributeNodeFunc, predWDBNodeFunc, predAssetBundleNodeFunc, predFolderNodeFunc, /* () */0));
}

function map(tree, folderNodeFunc, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var textureNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (param, nodeData) {
        return nodeData;
      });
  var materialNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (param, nodeData) {
        return nodeData;
      });
  var scriptEventFunctionNodeFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : (function (param, nodeData) {
        return nodeData;
      });
  var scriptAttributeNodeFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (param, nodeData) {
        return nodeData;
      });
  var wdbNodeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (param, nodeData) {
        return nodeData;
      });
  var assetBundleNodeFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (param, nodeData) {
        return nodeData;
      });
  var arg = textureNodeFunc;
  var arg$1 = materialNodeFunc;
  var arg$2 = scriptEventFunctionNodeFunc;
  var arg$3 = scriptAttributeNodeFunc;
  var arg$4 = wdbNodeFunc;
  var arg$5 = assetBundleNodeFunc;
  switch (tree.tag | 0) {
    case 0 : 
        var nodeId = tree[0];
        return /* ScriptEventFunctionNode */Block.__(0, [
                  nodeId,
                  Curry._2(scriptEventFunctionNodeFunc, nodeId, tree[1])
                ]);
    case 1 : 
        var nodeId$1 = tree[0];
        return /* ScriptAttributeNode */Block.__(1, [
                  nodeId$1,
                  Curry._2(scriptAttributeNodeFunc, nodeId$1, tree[1])
                ]);
    case 2 : 
        var nodeId$2 = tree[0];
        return /* TextureNode */Block.__(2, [
                  nodeId$2,
                  Curry._2(textureNodeFunc, nodeId$2, tree[1])
                ]);
    case 3 : 
        var nodeId$3 = tree[0];
        return /* MaterialNode */Block.__(3, [
                  nodeId$3,
                  Curry._2(materialNodeFunc, nodeId$3, tree[1])
                ]);
    case 4 : 
        var nodeId$4 = tree[0];
        return /* WDBNode */Block.__(4, [
                  nodeId$4,
                  Curry._2(wdbNodeFunc, nodeId$4, tree[1])
                ]);
    case 5 : 
        var nodeId$5 = tree[0];
        return /* AssetBundleNode */Block.__(5, [
                  nodeId$5,
                  Curry._2(assetBundleNodeFunc, nodeId$5, tree[1])
                ]);
    case 6 : 
        var nodeId$6 = tree[0];
        var match = Curry._2(folderNodeFunc, nodeId$6, tree[1]);
        return /* FolderNode */Block.__(6, [
                  nodeId$6,
                  match[1],
                  UIStateAssetService$WonderEditor.mapChildren((function (prim, prim$1) {
                          return prim$1.map(Curry.__1(prim));
                        }), (function (__x) {
                          var param = __x;
                          return map(param, folderNodeFunc, arg, arg$1, arg$2, arg$3, arg$4, arg$5, /* () */0);
                        }), UIStateAssetService$WonderEditor.buildByChangeStateType(match[0], tree[2]))
                ]);
    
  }
}

export {
  cata ,
  fold ,
  foldWithParentFolderNode ,
  foldWithParentFolderNodeWithoutRootNode ,
  foldWithHandleBeforeAndAfterFoldChildren ,
  filter ,
  find ,
  findOne ,
  map ,
  
}
/* WDBNodeAssetService-WonderEditor Not a pure module */
