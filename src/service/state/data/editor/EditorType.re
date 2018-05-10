open SceneType;

open AssetType;

type sourceType =
  | SceneTree
  | AssetTree
  | AssetFile;

type editorState = {
  assetRecord,
  sceneRecord,
  currentSign: string,
  currentSource: option(sourceType),
  loopId: int
};