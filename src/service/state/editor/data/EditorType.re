open SceneType;

open AssetType;

type widgetType =
  | SceneTree
  | Asset;

type editorState = {
  sceneRecord,
  assetRecord,
  currentDragSource: (option(widgetType), option(int)),
  currentSelectSource: option(widgetType),
  loopId: int,
};