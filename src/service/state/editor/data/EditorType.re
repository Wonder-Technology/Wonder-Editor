open SceneType;

/* TODO unify source, flag :
   widget type
   */

type sourceType =
  | SceneTree
  | Asset;

type editorState = {
  sceneRecord,
  currentDragSource: (option(sourceType), option(int)),
  currentSelectSource: option(sourceType),
  loopId: int,
};