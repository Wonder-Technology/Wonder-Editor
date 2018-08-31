type sceneRecord = {
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject),
  diffMap: option(WonderCommonlib.HashMapService.t(int)),
  isRun: bool
};