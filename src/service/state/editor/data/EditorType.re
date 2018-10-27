open SceneType;

open AssetType;

open SceneViewType;

open GameViewType;

open EventType;

open IMGUIType;

open InspectorType;

open UIType;

open ConsoleType;

type widgetType =
  | SceneTree
  | Asset;

type editorState = {
  sceneRecord,
  assetRecord,
  sceneViewRecord,
  gameViewRecord,
  eventRecord,
  imguiRecord,
  inspectorRecord,
  uiRecord,
  consoleRecord,
  currentDragSource: (option(widgetType), option(int)),
  currentSelectSource: option(widgetType),
  loopId: int,
};