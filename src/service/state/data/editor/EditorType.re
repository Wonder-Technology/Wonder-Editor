open SceneType;
open AssetType;

type editorState = {
  assetRecord,
  sceneRecord,
  currentSign:string,
  loopId: int
};