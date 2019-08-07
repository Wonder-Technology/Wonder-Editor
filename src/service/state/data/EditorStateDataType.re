open EditorType;

open AssetType;

type editorStateData = {
  mutable editorState,
  mutable isDebug: bool,
  mutable isRun: bool,
  mutable isNeedLogin: bool,
};