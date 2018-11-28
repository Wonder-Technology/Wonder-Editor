open SettingType;

open EditorType;

let setSetting = (setting, editorState) => {
  let isDebug = OperateSettingService.unsafeGetIsDebug(setting);

  StateEditorService.setStateIsDebug(isDebug);
  StateEngineService.setIsDebug(isDebug) |> ignore;

  {...editorState, settingRecord: OperateSettingService.setSetting(setting)};
};