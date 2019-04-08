open SettingType;

open SceneTreeType;

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

open UIType;

open InspectorCanvasType;

type editorState = {
  inspectorCanvasRecord,
  uiRecord,
  settingRecord,
  sceneTreeRecord,
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
  languageType: option(LanguageType.languageType),
};