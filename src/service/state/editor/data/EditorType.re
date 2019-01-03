open SettingType;

open SceneType;

open AssetType;

open SceneViewType;

open GameViewType;

open EventType;

open IMGUIType;

open InspectorType;

open ConsoleType;

open TransformType;

open WidgetType;

open PickingType;

type editorState = {
  settingRecord,
  sceneRecord,
  assetRecord,
  sceneViewRecord,
  gameViewRecord,
  eventRecord,
  imguiRecord,
  inspectorRecord,
  consoleRecord,
  transformRecord,
  pickingRecord,
  currentDragSource: (option(widgetType), option(int)),
  currentSelectSource: option(widgetType),
  loopId: int,
};