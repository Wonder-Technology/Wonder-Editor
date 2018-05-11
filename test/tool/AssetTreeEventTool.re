let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerRootDragEnterEvent = (domChildren) => {
  let rootTreeNodeUl = _getFromArray(domChildren, 0);
  let treeNodeLi = _getFromArray(rootTreeNodeUl##children, 0);
  BaseEventTool.triggerDragEnterEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerRootDropEvent = (domChildren) => {
  let rootTreeNodeUl = _getFromArray(domChildren, 0);
  let treeNodeLi = _getFromArray(rootTreeNodeUl##children, 0);
  BaseEventTool.triggerDropEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerFirstLayerClickEvent = (treeNodeIndex, domChildren) => {
  let rootTreeNodeUl = _getFromArray(domChildren, 0);
  let childrenTreeNodeUl = _getFromArray(rootTreeNodeUl##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(childrenTreeNodeUl##children, 0);
  BaseEventTool.triggerClickEvent(treeNodeLi)
};

let triggerFirstLayerDragStartEvent = (treeNodeIndex, domChildren) => {
  let rootTreeNodeUl = _getFromArray(domChildren, 0);
  let childrenTreeNodeUl = _getFromArray(rootTreeNodeUl##children, treeNodeIndex);
  BaseEventTool.triggerDragStartEvent(childrenTreeNodeUl, BaseEventTool.buildDragEvent())
};

let triggerFirstLayerDragEnterEvent = (treeNodeIndex, domChildren) => {
  let rootTreeNodeUl = _getFromArray(domChildren, 0);
  let childrenTreeNodeUl = _getFromArray(rootTreeNodeUl##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(childrenTreeNodeUl##children, 0);
  BaseEventTool.triggerDragEnterEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerFirstLayerDropEvent = (treeNodeIndex, domChildren) => {
  let rootTreeNodeUl = _getFromArray(domChildren, 0);
  let childrenTreeNodeUl = _getFromArray(rootTreeNodeUl##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(childrenTreeNodeUl##children, 0);
  BaseEventTool.triggerDropEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerSecondLayerDragStartEvent = (parentIndex, treeNodeIndex, domChildren) => {
  let rootTreeNodeUl = _getFromArray(domChildren, 0);
  let parentTreeNodeUl = _getFromArray(rootTreeNodeUl##children, parentIndex);
  let childrenTreeNodeUl = _getFromArray(parentTreeNodeUl##children, treeNodeIndex);
  BaseEventTool.triggerDragStartEvent(childrenTreeNodeUl, BaseEventTool.buildDragEvent())
};

let triggerSecondLayerDragEnterEvent = (parentIndex, treeNodeIndex, domChildren) => {
  let rootTreeNodeUl = _getFromArray(domChildren, 0);
  let parentTreeNodeUl = _getFromArray(rootTreeNodeUl##children, parentIndex);
  let childrenTreeNodeUl = _getFromArray(parentTreeNodeUl##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(childrenTreeNodeUl##children, 0);
  BaseEventTool.triggerDragEnterEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};

let triggerSecondLayerDropEvent = (parentIndex, treeNodeIndex, domChildren) => {
  let rootTreeNodeUl = _getFromArray(domChildren, 0);
  let parentTreeNodeUl = _getFromArray(rootTreeNodeUl##children, parentIndex);
  let childrenTreeNodeUl = _getFromArray(parentTreeNodeUl##children, treeNodeIndex);
  let treeNodeLi = _getFromArray(childrenTreeNodeUl##children, 0);
  BaseEventTool.triggerDropEvent(treeNodeLi, BaseEventTool.buildDragEvent())
};