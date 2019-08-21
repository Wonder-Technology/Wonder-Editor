open SettingType;

open SceneTreeType;

open AssetType;

open SceneViewType;

open GameViewType;

open EventType;

open InspectorType;

open ConsoleType;

open TransformType;

open WidgetType;

open PickingType;

open UIType;

open InspectorCanvasType;

open ImgCanvasType;

type editorState = {
  inspectorCanvasRecord,
  imgCanvasRecord,
  uiRecord,
  settingRecord,
  sceneTreeRecord,
  assetRecord,
  sceneViewRecord,
  gameViewRecord,
  eventRecord,
  inspectorRecord,
  consoleRecord,
  transformRecord,
  pickingRecord,
  currentDragSource: (option(widgetType), option(int)),
  currentSelectSource: option(widgetType),
  loopId: int,
  languageType: option(LanguageType.languageType),
};