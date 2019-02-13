open Wonderjs;

open StateDataMainType;

let createGameObject = state => {
  open GameObjectAPI;
  open DirectionLightAPI;

  let (state, light) = createDirectionLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state |> addGameObjectDirectionLightComponent(gameObject, light);
  (state, gameObject, light);
};