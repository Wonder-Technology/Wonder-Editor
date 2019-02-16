open EditorType;

open SettingType;
let initSetting = editorState =>
  SetSettingEditorService.setSetting(
    {
      debug: Some({isDebug: true, showMessage: true}),
      redoUndo: Some({maxStackSize: 50}),
      hotKeys: [|
        {name: "focus", values: [|"f"|]},
        {name: "redo", values: [|"ctrl+y"|]},
        {name: "undo", values: [|"ctrl+z"|]},
        {name: "duplicate", values: [|"ctrl+d"|]},
        {name: "delete", values: [|"delete"|]},
      |],
    },
    editorState,
  );

let setMaxStackSize = (maxStackSize, {settingRecord} as editorState) =>
  SetSettingEditorService.setSetting(
    {...settingRecord, redoUndo: Some({maxStackSize: maxStackSize})},
    editorState,
  );