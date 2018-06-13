let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerClickEvent = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  BaseEventTool.triggerClickEvent(treeNodeLi);
};

let triggerDragStart = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  BaseEventTool.triggerDragStartEvent(
    treeNodeUl,
    BaseEventTool.buildDragEvent(),
  );
};

let triggerDragEnter = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  let div = _getFromArray(treeNodeLi##children, 0);
  BaseEventTool.triggerDragEnterEvent(div, BaseEventTool.buildDragEvent());
};

let triggerDragLeave = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  let div = _getFromArray(treeNodeLi##children, 0);
  BaseEventTool.triggerDragLeaveEvent(div, BaseEventTool.buildDragEvent());
};

let triggerDragOver = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(treeNodeUl##children, 0);
  let div = _getFromArray(treeNodeLi##children, 0);
  BaseEventTool.triggerDragOverEvent(div, BaseEventTool.buildDragEvent());
};

let triggerDragDrop = (treeNodeIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let threeTreeNodeUl =
    _getFromArray(dragTreeArticle##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(threeTreeNodeUl##children, 0);
  let div = _getFromArray(treeNodeLi##children, 0);
  BaseEventTool.triggerDropEvent(div, BaseEventTool.buildDragEvent());
};

let triggerDragEnterChildren = (parentIndex, childrenIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
  let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
  let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
  let div = _getFromArray(treeNodeLi##children, 0);
  BaseEventTool.triggerDragEnterEvent(div, BaseEventTool.buildDragEvent());
};

let triggerDragDropChildren = (parentIndex, childrenIndex, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let treeNodeUl = _getFromArray(dragTreeArticle##children, parentIndex);
  let treeNodeChildrenUl = _getFromArray(treeNodeUl##children, childrenIndex);
  let treeNodeLi = _getFromArray(treeNodeChildrenUl##children, 0);
  let div = _getFromArray(treeNodeLi##children, 0);
  BaseEventTool.triggerDropEvent(div, BaseEventTool.buildDragEvent());
};

let triggerDragEnterDiv = (index, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let div = _getFromArray(dragTreeArticle##children, index);
  BaseEventTool.triggerDragEnterEvent(div, BaseEventTool.buildDragEvent());
};
let triggerDragLeaveDiv = (index, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let div = _getFromArray(dragTreeArticle##children, index);
  BaseEventTool.triggerDragLeaveEvent(div, BaseEventTool.buildDragEvent());
};
let triggerDragDropDiv = (index, domChildren) => {
  let dragTreeArticle = _getFromArray(domChildren, 0);
  let div = _getFromArray(dragTreeArticle##children, index);
  BaseEventTool.triggerDropEvent(div, BaseEventTool.buildDragEvent());
};