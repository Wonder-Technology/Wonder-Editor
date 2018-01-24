/* TODO refactor: tool */
let _getFromArray = (array, index) => array[index];

let triggerClickEvent = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  EventToolUI.triggerClickEvent(treeNodeLi)
};

let triggerDragStart = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  EventToolUI.triggerDragStartEvent(treeNodeUl, EventToolUI.buildDragEvent())
};

let triggerDragEnter = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  EventToolUI.triggerDragEnterEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragLeave = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  EventToolUI.triggerDragLeaveEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragOver = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  EventToolUI.triggerDragOverEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragDrop = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let threeTreeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(threeTreeNodeUl##children, 0);
  EventToolUI.triggerDropEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragEnterChildren = (parentIndex, childrenIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
  let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
  let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
  EventToolUI.triggerDragEnterEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragDropChildren = (parentIndex, childrenIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
  let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
  let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
  EventToolUI.triggerDropEvent(treeNodeLi, EventToolUI.buildDragEvent())
};