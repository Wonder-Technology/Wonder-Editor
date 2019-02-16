open Wonderjs;

open StateDataMainType;

let createGameObject = engineState => {
  open GameObjectAPI;
  open PointLightAPI;
  let (engineState, light) = createPointLight(engineState);
  let (engineState, gameObject) = engineState |> createGameObject;
  let engineState = engineState |> addGameObjectPointLightComponent(gameObject, light);
  (engineState, gameObject, light);
};