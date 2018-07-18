open EditorStateDataType;

let editorStateData = {
  editorState: CreateEditorStateEditorService.create(),
  assetState: CreateAssetStateAssetService.create(),
  isDebug: true,
  engineStateDataForEdit: StateEngineService.createStateData(),
  engineStateDataForRun: StateEngineService.createStateData(),
};