'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var SelectTreeUtils$WonderEditor = require("../../../src/core/atom_component/selectTree/utils/SelectTreeUtils.js");
var NodeSelectTreeService$WonderEditor = require("../../../src/service/record/ui/selectTree/NodeSelectTreeService.js");
var ValueNodeSelectTreeService$WonderEditor = require("../../../src/service/record/ui/selectTree/ValueNodeSelectTreeService.js");
var FolderNodeSelectTreeService$WonderEditor = require("../../../src/service/record/ui/selectTree/FolderNodeSelectTreeService.js");
var IterateTreeSelectTreeService$WonderEditor = require("../../../src/service/record/ui/selectTree/IterateTreeSelectTreeService.js");

function filter(tree, acc, pushNodeFunc, $staropt$star, $staropt$star$1, param) {
  var predValueNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (node) {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (node) {
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
  var _valueNodeFunc = function (acc, nodeId, nodeData) {
    return _nodeFunc(acc, ValueNodeSelectTreeService$WonderEditor.buildNodeByNodeData(nodeId, nodeData), predValueNodeFunc);
  };
  var _folderNodeFunc = function (acc, nodeId, nodeData, children) {
    return _nodeFunc(acc, FolderNodeSelectTreeService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, children), predFolderNodeFunc);
  };
  return IterateTreeSelectTreeService$WonderEditor.fold(_folderNodeFunc, acc, tree, _valueNodeFunc, /* () */0);
}

function find(tree, $staropt$star, $staropt$star$1, param) {
  var predValueNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (node) {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (node) {
        return false;
      });
  var list = filter(tree, /* [] */0, (function (node, acc) {
          return /* :: */[
                  node,
                  acc
                ];
        }), predValueNodeFunc, predFolderNodeFunc, /* () */0);
  if (List.length(list) === 0) {
    return undefined;
  } else {
    return list;
  }
}

function findOne(tree, $staropt$star, $staropt$star$1, param) {
  var predValueNodeFunc = $staropt$star !== undefined ? $staropt$star : (function (node) {
        return false;
      });
  var predFolderNodeFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (node) {
        return false;
      });
  return Js_option.map(List.hd, find(tree, predValueNodeFunc, predFolderNodeFunc, /* () */0));
}

function findNodeByName(targetNodeName, tree) {
  var predNodeFunc = function (node) {
    return NodeSelectTreeService$WonderEditor.getNodeName(node) === targetNodeName;
  };
  return findOne(tree, predNodeFunc, predNodeFunc, /* () */0);
}

function setSelectForSelectTree(isSelect, nodeName, tree) {
  return SelectTreeUtils$WonderEditor.setSelectForSelectTree(tree, isSelect, OptionService$WonderEditor.unsafeGet(findNodeByName(nodeName, tree)));
}

exports.filter = filter;
exports.find = find;
exports.findOne = findOne;
exports.findNodeByName = findNodeByName;
exports.setSelectForSelectTree = setSelectForSelectTree;
/* OptionService-WonderEditor Not a pure module */
