open EditorType;

open SettingType;

let initSetting = editorState =>
  SetSettingEditorService.setSetting(
    {
      debug: Some({isDebug: true, showMessage: true}),
      redoUndo: Some({maxStackSize: 50}),
      hotKeys: [||],
    },
    editorState,
  );

let setMaxStackSize = (maxStackSize, {settingRecord} as editorState) =>
  SetSettingEditorService.setSetting(
    {...settingRecord, redoUndo: Some({maxStackSize: maxStackSize})},
    editorState,
  );