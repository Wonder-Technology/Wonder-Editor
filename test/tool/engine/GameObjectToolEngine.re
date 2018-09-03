let createGameObject = state => {
  open Wonderjs;

  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  (
    state,
    gameObject,
    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
  );
};