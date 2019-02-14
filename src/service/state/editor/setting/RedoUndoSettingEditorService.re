open EditorType;

let unsafeGetMaxStackSize = ({settingRecord}) =>
  OperateSettingService.unsafeGetMaxStackSize(settingRecord);