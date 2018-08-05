open Wonderjs;
let hasLightComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.hasDirectionLightComponent(gameObject)
  || engineState
  |> GameObjectComponentEngineService.hasPointLightComponent(gameObject);

