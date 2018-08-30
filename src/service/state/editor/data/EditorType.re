open SceneType;

open AssetType;

open InspectorType;

open GameObjectType;

type widgetType =
  | SceneTree
  | Asset;

type editorState = {
  sceneRecord,
  assetRecord,
  inspectorRecord,
  gameObjectRecord,
  currentDragSource: (option(widgetType), option(int)),
  currentSelectSource: option(widgetType),
  loopId: int,
};