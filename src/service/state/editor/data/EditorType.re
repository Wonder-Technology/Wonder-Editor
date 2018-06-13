open SceneType;

open AssetType;

type sourceType =
  | SceneTree
  | AssetTree;

type editorState = {
  assetRecord,
  sceneRecord,
  currentDragSource: (option(sourceType), option(int)),
  currentSelectSource: option(sourceType),
  loopId: int,
};