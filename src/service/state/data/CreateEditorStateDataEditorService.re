open EditorStateDataType;

let editorStateData = {
  editorState: CreateEditorStateEditorService.create(),
  /* editorState: CreateAssetStateEditorService.create(), */
  isDebug: true,
  engineStateDataForEdit: StateEngineService.createStateData(),
  engineStateDataForRun: StateEngineService.createStateData(),
};