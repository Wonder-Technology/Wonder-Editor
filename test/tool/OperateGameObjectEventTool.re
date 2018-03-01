let _getFromArray = (array, index) => OperateArrayUtils.getNth(index, array);

let triggerClickAddBox = (domChildren) => {
  let addBoxDiv = _getFromArray(domChildren, 2);
  let addBoxButton = _getFromArray(addBoxDiv##children, 0);
  EventToolUI.triggerClickEvent(addBoxButton)
};

let triggerClickDispose = (domChildren) => {
  let addBoxDiv = _getFromArray(domChildren, 3);
  let addBoxButton = _getFromArray(addBoxDiv##children, 0);
  EventToolUI.triggerClickEvent(addBoxButton)
};