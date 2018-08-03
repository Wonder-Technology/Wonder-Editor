open Wonderjs;
let _getNotNeedComponent = () => (-100);

let hasLightComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.hasDirectionLightComponent(gameObject)
  || engineState
  |> GameObjectComponentEngineService.hasPointLightComponent(gameObject);

let getLightComponent = (_gameObject, _engineState) => _getNotNeedComponent();
