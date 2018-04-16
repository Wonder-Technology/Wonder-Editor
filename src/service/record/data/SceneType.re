type sceneRecord = {
  root: option(Wonderjs.GameObjectType.gameObject),
  currentGameObject: option(Wonderjs.GameObjectType.gameObject),
  diffMap: option(Js.Dict.t(int)),
  mutable isRun: bool
};