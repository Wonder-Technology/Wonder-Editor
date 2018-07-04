open SceneType;

type sourceType =
  | SceneTree
  | AssetTree;

type editorState = {
  sceneRecord,
  currentDragSource: (option(sourceType), option(int)),
  currentSelectSource: option(sourceType),
  loopId: int,
};