open EditorType;

open HotKeysType;

open SettingType;

let getHotKeys = ({settingRecord}) =>
  OperateSettingService.getHotKeys(settingRecord);
