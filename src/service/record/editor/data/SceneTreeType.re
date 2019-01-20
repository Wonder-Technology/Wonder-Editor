type sceneTreeRecord = {
  currentSceneTreeNode: option(Wonderjs.GameObjectPrimitiveType.gameObject),
  isShowChildrenMap: WonderCommonlib.ImmutableSparseMapService.t(bool),
};