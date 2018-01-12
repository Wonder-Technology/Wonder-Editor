open Wonderjs;

/* TODO use immutable state */
type sceneData = {
  mutable scene: option(GameObjectType.gameObject),
  mutable currentGameObject: option(GameObjectType.gameObject)
};