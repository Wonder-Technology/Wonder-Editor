open EditorType;

let isShowMessage = ({settingRecord}) =>
  OperateSettingService.isShowMessage(settingRecord);

let isNotShowMessage = editorState => ! isShowMessage(editorState);

let setIsShowMessage = (isShowMessage, {settingRecord} as editorState) => {
  ...editorState,
  settingRecord:
    OperateSettingService.setIsShowMessage(isShowMessage, settingRecord),
};