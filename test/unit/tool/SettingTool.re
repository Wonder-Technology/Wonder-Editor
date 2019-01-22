open EditorType;

open SettingType;

let initSetting = editorState =>
  SetSettingEditorService.setSetting(
    {
      debug: Some({isDebug: true, showMessage: true}),
      redoUndo: Some({maxStackSize: 50}),
      hotKeys:
        Some({
          redo: [|"ctrl+y"|],
          undo: [|"ctrl+z"|],
          duplicate: [|"ctrl+d"|],
          delete: [|"delete"|],
        }),
    },
    editorState,
  );

let setMaxStackSize = (maxStackSize, {settingRecord} as editorState) =>
  SetSettingEditorService.setSetting(
    {...settingRecord, redoUndo: Some({maxStackSize: maxStackSize})},
    editorState,
  );