open SceneType;
open AssetType;

type editorState = {
  assetRecord,
  sceneRecord,
  currentTree:string,
  loopId: int
};