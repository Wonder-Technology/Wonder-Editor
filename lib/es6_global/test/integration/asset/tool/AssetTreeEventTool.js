

import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.getNth(index, array);
}

function clickRootAssetTreeNode(domChildren) {
  var treeDiv = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.getNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.getNth(0, array$1);
  var array$2 = rootUl.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(0, array$2));
}

function clickAssetTreeNode(index, domChildren) {
  var treeDiv = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = treeDiv.children;
  var treeArticle = ArrayService$WonderEditor.getNth(1, array);
  var array$1 = treeArticle.children;
  var rootUl = ArrayService$WonderEditor.getNth(0, array$1);
  var array$2 = rootUl.children;
  var targetUl = ArrayService$WonderEditor.getNth(index, array$2);
  var array$3 = targetUl.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(0, array$3));
}

function clickAssetTreeChildrenNode(index, domChildren) {
  var content = ArrayService$WonderEditor.getNth(1, domChildren);
  var array = content.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(index, array));
}

function triggerAddFolderClick(domChildren) {
  var treeDiv = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = treeDiv.children;
  var headerArticle = ArrayService$WonderEditor.getNth(0, array);
  var array$1 = headerArticle.children;
  var headerItem = ArrayService$WonderEditor.getNth(0, array$1);
  var array$2 = headerItem.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(0, array$2));
}

function triggerRemoveNodeClick(domChildren) {
  var treeDiv = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = treeDiv.children;
  var headerArticle = ArrayService$WonderEditor.getNth(0, array);
  var array$1 = headerArticle.children;
  var headerItem = ArrayService$WonderEditor.getNth(1, array$1);
  var array$2 = headerItem.children;
  return BaseEventTool$WonderEditor.triggerClickEvent(ArrayService$WonderEditor.getNth(0, array$2));
}

export {
  _getFromArray ,
  clickRootAssetTreeNode ,
  clickAssetTreeNode ,
  clickAssetTreeChildrenNode ,
  triggerAddFolderClick ,
  triggerRemoveNodeClick ,
  
}
/* ArrayService-WonderEditor Not a pure module */
