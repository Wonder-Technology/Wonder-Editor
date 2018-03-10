let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerClickAddBox = (domChildren) => {
  let gameObjectDiv = _getFromArray(domChildren,1);
  let addBoxDiv = _getFromArray(gameObjectDiv##children, 0);
  let addBoxButton = _getFromArray(addBoxDiv##children, 0);
  EventToolUI.triggerClickEvent(addBoxButton)
};

let triggerClickDispose = (domChildren) => {
  let gameObjectDiv = _getFromArray(domChildren,1);
  let disposeDiv = _getFromArray(gameObjectDiv##children, 1);
  let disposeButton = _getFromArray(disposeDiv##children, 0);
  EventToolUI.triggerClickEvent(disposeButton)
};