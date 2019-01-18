type sceneTreeRecord = {
  currentSceneTreeNode: option(Wonderjs.GameObjectPrimitiveType.gameObject),
  isShowChildrenMap: WonderCommonlib.SparseMapService.t(bool),
};