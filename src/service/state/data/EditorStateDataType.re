open EditorType;
open AssetType;

type editorStateData = {
  mutable editorState,
  mutable assetState,
  mutable isDebug: bool,
  engineStateDataForEdit: Wonderjs.StateDataMainType.stateData,
  engineStateDataForRun: Wonderjs.StateDataMainType.stateData
};