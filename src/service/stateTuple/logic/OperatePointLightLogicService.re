

let createPointLight = engineState =>
  engineState |> PointLightEngineService.create;

let disposePointLight = (gameObject, lightComponent, engineState) =>
  engineState
  |> GameObjectComponentEngineService.disposePointLightComponent(
       gameObject,
       lightComponent,
     );

let addPointLight = (gameObject, lightComponent, engineState) =>
  engineState
  |> GameObjectComponentEngineService.addPointLightComponent(
       gameObject,
       lightComponent,
     );