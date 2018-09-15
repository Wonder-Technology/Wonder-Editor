let _getFromArray = (array, index) => ArrayService.unsafeGetNth(index, array);

let triggerClickAddBox = domChildren => {
  let gameObjectDiv = _getFromArray(domChildren, 1);
  let addBoxDiv = _getFromArray(gameObjectDiv##children, 0);
  let addBoxButton = _getFromArray(addBoxDiv##children, 0);
  BaseEventTool.triggerClickEvent(addBoxButton);
};

let triggerClickDisposeAndExecDisposeJob = domChildren => {
  let gameObjectDiv = _getFromArray(domChildren, 1);
  let disposeDiv = _getFromArray(gameObjectDiv##children, 1);
  let disposeButton = _getFromArray(disposeDiv##children, 0);
  BaseEventTool.triggerClickEvent(disposeButton);
};

let triggerClickAddEmptyGameObject = domChildren => {
  let gameObjectDiv = _getFromArray(domChildren, 5);
  let addGameObjectDiv = _getFromArray(gameObjectDiv##children, 0);
  let addGameObjectButton = _getFromArray(addGameObjectDiv##children, 0);

  BaseEventTool.triggerClickEvent(addGameObjectButton);
};

let triggerClickExport = domChildren => {
  let gameObjectDiv = _getFromArray(domChildren, 6);
  let addGameObjectDiv = _getFromArray(gameObjectDiv##children, 1);
  let addGameObjectButton = _getFromArray(addGameObjectDiv##children, 0);

  BaseEventTool.triggerClickEvent(addGameObjectButton);
};