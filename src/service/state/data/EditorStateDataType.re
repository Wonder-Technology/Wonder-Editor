open EditorType;

open AssetType;

open Wonderjs;

type editorStateData = {
  mutable editorState,
  mutable eventEngineState: StateDataMainType.state,
  mutable isDebug: bool,
  mutable isRun: bool,
};