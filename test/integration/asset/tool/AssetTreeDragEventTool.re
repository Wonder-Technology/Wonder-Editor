let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerRootDragEnterEvent = (domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let targetLi = _getFromArray(rootUl##children, 0);
  let targetDiv = _getFromArray(targetLi##children, 0);
  BaseEventTool.triggerDragEnterEvent(targetDiv, BaseEventTool.buildDragEvent())
};

let triggerRootDropEvent = (domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let targetLi = _getFromArray(rootUl##children, 0);
  let targetDiv = _getFromArray(targetLi##children, 0);
  BaseEventTool.triggerDropEvent(targetDiv, BaseEventTool.buildDragEvent())
};

let triggerFirstLayerClickEvent = (treeNodeIndex, domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let childrenTreeNodeUl = _getFromArray(rootUl##children, treeNodeIndex);
  let targetLi = _getFromArray(childrenTreeNodeUl##children, 0);
  BaseEventTool.triggerClickEvent(targetLi)
};

let triggerFirstLayerDragStartEvent = (treeNodeIndex, domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let childrenTreeNodeUl = _getFromArray(rootUl##children, treeNodeIndex);
  BaseEventTool.triggerDragStartEvent(childrenTreeNodeUl, BaseEventTool.buildDragEvent())
};

let triggerFirstLayerDragEnterEvent = (treeNodeIndex, domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let childrenTreeNodeUl = _getFromArray(rootUl##children, treeNodeIndex);
  let targetLi = _getFromArray(childrenTreeNodeUl##children, 0);
  let targetDiv = _getFromArray(targetLi##children, 0);
  BaseEventTool.triggerDragEnterEvent(targetDiv, BaseEventTool.buildDragEvent())
};

let triggerFirstLayerDropEvent = (treeNodeIndex, domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let childrenTreeNodeUl = _getFromArray(rootUl##children, treeNodeIndex);
  let targetLi = _getFromArray(childrenTreeNodeUl##children, 0);
  let targetDiv = _getFromArray(targetLi##children, 0);
  BaseEventTool.triggerDropEvent(targetDiv, BaseEventTool.buildDragEvent())
};

let triggerSecondLayerDragStartEvent = (parentIndex, treeNodeIndex, domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let parentTreeNodeUl = _getFromArray(rootUl##children, parentIndex);
  let childrenTreeNodeUl = _getFromArray(parentTreeNodeUl##children, treeNodeIndex);
  BaseEventTool.triggerDragStartEvent(childrenTreeNodeUl, BaseEventTool.buildDragEvent())
};

let triggerSecondLayerDragEnterEvent = (parentIndex, treeNodeIndex, domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let parentTreeNodeUl = _getFromArray(rootUl##children, parentIndex);
  let childrenTreeNodeUl = _getFromArray(parentTreeNodeUl##children, treeNodeIndex);
  let targetLi = _getFromArray(childrenTreeNodeUl##children, 0);
  let targetDiv = _getFromArray(targetLi##children, 0);
  BaseEventTool.triggerDragEnterEvent(targetDiv, BaseEventTool.buildDragEvent())
};

let triggerSecondLayerDropEvent = (parentIndex, treeNodeIndex, domChildren) => {
  let treeDiv = _getFromArray(domChildren, 0);
  let treeArticle = _getFromArray(treeDiv##children, 1);
  let rootUl = _getFromArray(treeArticle##children, 0);
  let parentTreeNodeUl = _getFromArray(rootUl##children, parentIndex);
  let childrenTreeNodeUl = _getFromArray(parentTreeNodeUl##children, treeNodeIndex);
  let targetLi = _getFromArray(childrenTreeNodeUl##children, 0);
  let targetDiv = _getFromArray(targetLi##children, 0);
  BaseEventTool.triggerDropEvent(targetDiv, BaseEventTool.buildDragEvent())
};