open SceneType;

open AssetType;

type sourceType =
  | SceneTree
  | AssetTree;

type editorState = {
  assetRecord,
  sceneRecord,
  currentDragSource: (string, option(int)),
  currentSelectSource: option(sourceType),
  loopId: int
};
