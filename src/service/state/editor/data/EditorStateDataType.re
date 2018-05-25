open EditorType;

type editorStateData = {
  mutable state: editorState,
  mutable isDebug: bool,
  engineStateDataForEdit: Wonderjs.StateDataMainType.stateData,
  engineStateDataForRun: Wonderjs.StateDataMainType.stateData
};