type sceneRecord = {
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject),
  isShowChildrenMap: WonderCommonlib.SparseMapService.t(bool),
};