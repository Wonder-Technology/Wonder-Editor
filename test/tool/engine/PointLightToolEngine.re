open Wonderjs;

open StateDataMainType;

let createGameObject = state => {
  open GameObjectAPI;
  open PointLightAPI;
  let (state, light) = createPointLight(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectPointLightComponent(gameObject, light);
  (state, gameObject, light);
};