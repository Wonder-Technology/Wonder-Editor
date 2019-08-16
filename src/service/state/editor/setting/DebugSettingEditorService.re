open EditorType;

open HotKeysType;

open SettingType;

let getIsTestLocal = ({settingRecord}) =>
  OperateSettingService.unsafeGetIsTestLocal(settingRecord);

let getIsDebug = ({settingRecord}) =>
  OperateSettingService.unsafeGetIsDebug(settingRecord);