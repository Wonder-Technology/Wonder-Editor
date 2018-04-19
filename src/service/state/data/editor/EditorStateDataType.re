open EditorType;

type editorStateData = {
  mutable state: editorState,
  mutable isDebug: bool,
  engineStateDataForEdit: Wonderjs.MainStateDataType.stateData,
  engineStateDataForRun: Wonderjs.MainStateDataType.stateData
};