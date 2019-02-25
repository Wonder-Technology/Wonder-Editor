open EditorType;

open SettingType;

let setSetting =
    (
      ~editorState=StateEditorService.getState(),
      ~debug=Some({isDebug: true, showMessage: true}),
      ~redoUndo=Some({maxStackSize: 50}),
      ~hotKeys=[|
                 {name: "focus", values: [|"f"|]},
                 {name: "redo", values: [|"ctrl+y"|]},
                 {name: "undo", values: [|"ctrl+z"|]},
                 {name: "duplicate", values: [|"ctrl+d"|]},
                 {name: "delete", values: [|"delete"|]},
               |],
      (),
    ) =>
  SetSettingEditorService.setSetting(
    {debug, redoUndo, hotKeys},
    editorState,
  );

let initSetting = editorState => setSetting(~editorState, ());

let setMaxStackSize = (maxStackSize, {settingRecord} as editorState) =>
  SetSettingEditorService.setSetting(
    {...settingRecord, redoUndo: Some({maxStackSize: maxStackSize})},
    editorState,
  );