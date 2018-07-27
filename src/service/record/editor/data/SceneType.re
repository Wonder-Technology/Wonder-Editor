type sceneRecord = {
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject),
  diffMap: option(Js.Dict.t(int)),
  isRun: bool
};