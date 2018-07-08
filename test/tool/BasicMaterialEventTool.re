let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerFileDragStartEvent = (index, domChildren) => {
  let content = _getFromArray(domChildren, 1);
  let fileArticle = _getFromArray(content##children, index);
  let file = _getFromArray(fileArticle##children, 0);
  BaseEventTool.triggerDragStartEvent(file, BaseEventTool.buildDragEvent());
};

let _getTriggerTextureDragEventData = domChildren => {
  let sceneTreeInspector = _getFromArray(domChildren, 0);
  let materialBox = _getFromArray(sceneTreeInspector##children, 2);
  let materialArticle = _getFromArray(materialBox##children, 1);
  let textureDiv = _getFromArray(materialArticle##children, 1);

  textureDiv;
};

let triggerTextureDragEnterEvent = domChildren => {
  let sceneTreeInspector = _getFromArray(domChildren, 0);
  let materialBox = _getFromArray(sceneTreeInspector##children, 2);
  let materialArticle = _getFromArray(materialBox##children, 1);
  let textureDiv = _getFromArray(materialArticle##children, 1);
  let div = _getFromArray(textureDiv##children, 0);
  BaseEventTool.triggerDragEnterEvent(div, BaseEventTool.buildDragEvent());
};

let triggerTextureDragLeaveEvent = domChildren => {
  let sceneTreeInspector = _getFromArray(domChildren, 0);
  let materialBox = _getFromArray(sceneTreeInspector##children, 2);
  let materialArticle = _getFromArray(materialBox##children, 1);
  let textureDiv = _getFromArray(materialArticle##children, 1);
  let div = _getFromArray(textureDiv##children, 0);
  BaseEventTool.triggerDragLeaveEvent(div, BaseEventTool.buildDragEvent());
};
let triggerTextureDragDropEvent = domChildren => {
  let sceneTreeInspector = _getFromArray(domChildren, 0);
  let materialBox = _getFromArray(sceneTreeInspector##children, 2);
  let materialArticle = _getFromArray(materialBox##children, 1);
  let textureDiv = _getFromArray(materialArticle##children, 1);
  let div = _getFromArray(textureDiv##children, 0);
  BaseEventTool.triggerDropEvent(div, BaseEventTool.buildDragEvent());
};
let triggerRemoveTextureClickEvent = domChildren => {
  let sceneTreeInspector = _getFromArray(domChildren, 0);
  let materialBox = _getFromArray(sceneTreeInspector##children, 2);
  let materialArticle = _getFromArray(materialBox##children, 1);
  let textureDiv = _getFromArray(materialArticle##children, 1);
  let button = _getFromArray(textureDiv##children, 3);
  BaseEventTool.triggerClickEvent(button);
};