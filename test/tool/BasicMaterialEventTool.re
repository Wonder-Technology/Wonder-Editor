let _getFromArray = (array, index) =>
  ArrayService.unsafeGetNth(index, array);

let getDefaultSceneTreeInspectorDomIndex = () => 3;

let triggerFileDragStartEvent = (index, domChildren) => {
  let content = _getFromArray(domChildren, 1);
  let fileArticle = _getFromArray(content##children, index);
  let file = _getFromArray(fileArticle##children, 0);
  BaseEventTool.triggerDragStartEvent(file, BaseEventTool.buildDragEvent());
};

let _getTriggerTextureDivWithSceneTreeInspectorDomIndex =
    (domChildren, sceneTreeInspectorDomIndex) => {
  let sceneTreeInspector = _getFromArray(domChildren, 0);
  let renderGroupDiv =
    _getFromArray(sceneTreeInspector##children, sceneTreeInspectorDomIndex);
  let renderGroupArticle = _getFromArray(renderGroupDiv##children, 1);
  let materialDiv = _getFromArray(renderGroupArticle##children, 2);
  let materialBox = _getFromArray(materialDiv##children, 1);
  let div = _getFromArray(materialBox##children, 2);
  let materialArticle = _getFromArray(div##children, 0);
  let textureDiv = _getFromArray(materialArticle##children, 1);

  textureDiv;
};

let _getTriggerTextureDiv = domChildren =>
  _getTriggerTextureDivWithSceneTreeInspectorDomIndex(
    domChildren,
    getDefaultSceneTreeInspectorDomIndex(),
  );

let triggerTextureDragEnterEventWithSceneTreeInspectorDomIndex =
    (sceneTreeInspectorDomIndex, domChildren) => {
  let textureDiv =
    _getTriggerTextureDivWithSceneTreeInspectorDomIndex(
      domChildren,
      sceneTreeInspectorDomIndex,
    );
  let div = _getFromArray(textureDiv##children, 0);
  BaseEventTool.triggerDragEnterEvent(div, BaseEventTool.buildDragEvent());
};

let triggerTextureDragEnterEvent = domChildren =>
  triggerTextureDragEnterEventWithSceneTreeInspectorDomIndex(3, domChildren);

let triggerTextureDragLeaveEvent = domChildren => {
  let textureDiv = _getTriggerTextureDiv(domChildren);
  let div = _getFromArray(textureDiv##children, 0);
  BaseEventTool.triggerDragLeaveEvent(div, BaseEventTool.buildDragEvent());
};

let triggerTextureDragDropEventWithSceneTreeInspectorDomIndex =
    (sceneTreeInspectorDomIndex, domChildren) => {
  let textureDiv =
    _getTriggerTextureDivWithSceneTreeInspectorDomIndex(
      domChildren,
      sceneTreeInspectorDomIndex,
    );
  let div = _getFromArray(textureDiv##children, 0);
  BaseEventTool.triggerDropEvent(div, BaseEventTool.buildDragEvent());
};

let triggerTextureDragDropEvent = domChildren =>
  triggerTextureDragDropEventWithSceneTreeInspectorDomIndex(
    getDefaultSceneTreeInspectorDomIndex(),
    domChildren,
  );

let triggerRemoveTextureClickEvent = domChildren => {
  let textureDiv = _getTriggerTextureDiv(domChildren);
  let button = _getFromArray(textureDiv##children, 3);
  BaseEventTool.triggerClickEvent(button);
};