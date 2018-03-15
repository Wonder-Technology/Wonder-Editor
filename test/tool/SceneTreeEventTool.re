let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerClickEvent = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  BaseEventTool.triggerClickEvent(treeNodeLi)
};

let triggerDragStart = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  BaseEventTool.triggerDragStartEvent(treeNodeUl, BaseEventTool.buildDragEvent())
};

let triggerDragEnter = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  BaseEventTool.triggerDragEnterEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerDragLeave = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  BaseEventTool.triggerDragLeaveEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerDragOver = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  BaseEventTool.triggerDragOverEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerDragDrop = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let threeTreeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(threeTreeNodeUl##children, 0);
  BaseEventTool.triggerDropEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerDragEnterChildren = (parentIndex, childrenIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
  let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
  let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
  BaseEventTool.triggerDragEnterEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerDragDropChildren = (parentIndex, childrenIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
  let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
  let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
  BaseEventTool.triggerDropEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};