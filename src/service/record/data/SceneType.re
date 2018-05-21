type sceneRecord = {
  root: option(Wonderjs.GameObjectType.gameObject),
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject),
  diffMap: option(Js.Dict.t(int)),
  mutable isRun: bool
};