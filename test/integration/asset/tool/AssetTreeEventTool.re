let _getFromArray = (array, index) => ArrayService.getNth(index, array);
let clickRootAssetTreeNode = ( domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let targetLi = _getFromArray(rootUl##children, 0);
  BaseEventTool.triggerClickEvent(targetLi)
};

let clickAssetTreeNode = (index, domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let targetUl = _getFromArray(rootUl##children, index);
  let targetLi = _getFromArray(targetUl##children, 0);
  BaseEventTool.triggerClickEvent(targetLi)
};
let clickAssetTreeChildrenNode = (index, domChildren) => {
  let content = _getFromArray(domChildren, 1);
  let fileArticle = _getFromArray(content##children, index);
  BaseEventTool.triggerClickEvent(fileArticle)
};

let triggerAddFolderClick = (domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let headerArticle = _getFromArray(treeDiv##children, 0);
  let headerItem = _getFromArray(headerArticle##children, 0);
  let button = _getFromArray(headerItem##children, 0);
  BaseEventTool.triggerClickEvent(button)
};

let triggerRemoveNodeClick = (domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let headerArticle = _getFromArray(treeDiv##children, 0);
  let headerItem = _getFromArray(headerArticle##children, 1);
  let button = _getFromArray(headerItem##children, 0);
  BaseEventTool.triggerClickEvent(button)
};