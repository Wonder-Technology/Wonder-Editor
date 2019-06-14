

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ValueNodeSelectTreeService$WonderEditor from "./ValueNodeSelectTreeService.js";
import * as FolderNodeSelectTreeService$WonderEditor from "./FolderNodeSelectTreeService.js";

function cata(tree, $staropt$star, $staropt$star$1, param) {
  var valueNodeFunc = $staropt$star !== undefined ? $staropt$star : ValueNodeSelectTreeService$WonderEditor.buildNodeByNodeData;
  var folderNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : FolderNodeSelectTreeService$WonderEditor.buildNodeByNodeData;
  var arg = valueNodeFunc;
  var arg$1 = folderNodeFunc;
  if (tree.tag) {
    return Curry._2(valueNodeFunc, tree[0], tree[1]);
  } else {
    return Curry._3(folderNodeFunc, tree[0], tree[1], tree[2].map((function (node) {
                      return cata(node, arg, arg$1, /* () */0);
                    })));
  }
}

function fold(folderNodeFunc, acc, tree, $staropt$star, param) {
  var valueNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (acc, param, param$1) {
        return acc;
      });
  if (tree.tag) {
    return Curry._3(valueNodeFunc, acc, tree[0], tree[1]);
  } else {
    var children = tree[2];
    var localAccum = Curry._4(folderNodeFunc, acc, tree[0], tree[1], children);
    return ArrayService$WonderCommonlib.reduceOneParam((function (acc, child) {
                  var acc$1 = acc;
                  var child$1 = child;
                  return fold(folderNodeFunc, acc$1, child$1, valueNodeFunc, /* () */0);
                }), localAccum, children);
  }
}

export {
  cata ,
  fold ,
  
}
/* FolderNodeSelectTreeService-WonderEditor Not a pure module */
