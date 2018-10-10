open SceneType;

open MaterialType;

open AssetType;

open SceneViewType;

open GameViewType;

open EventType;

open IMGUIType;

open InspectorType;

type widgetType =
  | SceneTree
  | Asset;

type editorState = {
  sceneRecord,
  assetRecord,
  materialRecord,
  sceneViewRecord,
  gameViewRecord,
  eventRecord,
  imguiRecord,
  inspectorRecord,
  currentDragSource: (option(widgetType), option(int)),
  currentSelectSource: option(widgetType),
  loopId: int,
};