open SceneType;

type widgetType =
  | SceneTree
  | Asset;

type editorState = {
  sceneRecord,
  currentDragSource: (option(widgetType), option(int)),
  currentSelectSource: option(widgetType),
  loopId: int,
};