let getFromArray = (array, index) => array[index];

let triggerDragStart = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = getFromArray(domChildren, 0);
  let treeNodeUl = getFromArray(dragTreeArticle##children, treeNodeIndex);
  EventToolUI.triggerDragStartEvent(treeNodeUl, EventToolUI.buildDragEvent())
};

let triggerDragEnter = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = getFromArray(domChildren, 0);
  let treeNodeUl = getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = getFromArray(treeNodeUl##children, 0);
  EventToolUI.triggerDragEnterEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragLeave = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = getFromArray(domChildren, 0);
  let treeNodeUl = getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = getFromArray(treeNodeUl##children, 0);
  EventToolUI.triggerDragLeaveEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragOver = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = getFromArray(domChildren, 0);
  let treeNodeUl = getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = getFromArray(treeNodeUl##children, 0);
  EventToolUI.triggerDragOverEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragDrop = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = getFromArray(domChildren, 0);
  let threeTreeNodeUl = getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = getFromArray(threeTreeNodeUl##children, 0);
  EventToolUI.triggerDropEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragEnterChildren = (parentIndex, childrenIndex, domChildren) => {
  let dragTreeArticle = getFromArray(domChildren, 0);
  let treeNodeUl = getFromArray(dragTreeArticle##children, parentIndex);
  let treeNodeChildrenUl = getFromArray(treeNodeUl##children, childrenIndex);
  let treeNodeLi = getFromArray(treeNodeChildrenUl##children, 0);
  EventToolUI.triggerDragEnterEvent(treeNodeLi, EventToolUI.buildDragEvent())
};

let triggerDragDropChildren = (parentIndex, childrenIndex, domChildren) => {
  let dragTreeArticle = getFromArray(domChildren, 0);
  let treeNodeUl = getFromArray(dragTreeArticle##children, parentIndex);
  let treeNodeChildrenUl = getFromArray(treeNodeUl##children, childrenIndex);
  let treeNodeLi = getFromArray(treeNodeChildrenUl##children, 0);
  EventToolUI.triggerDropEvent(treeNodeLi, EventToolUI.buildDragEvent())
};