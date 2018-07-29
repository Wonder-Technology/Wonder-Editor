open EditorStateDataType;

let editorStateData = {
  editorState: CreateEditorStateEditorService.create(),
  isDebug: true,
  engineStateDataForEdit: StateEngineService.createStateData(),
  engineStateDataForRun: StateEngineService.createStateData(),
};