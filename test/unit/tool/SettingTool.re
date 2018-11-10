let initSetting = editorState =>
  SetSettingEditorService.setSetting(
    {debug: Some({isDebug: true, showMessage: true})},
    editorState,
  );