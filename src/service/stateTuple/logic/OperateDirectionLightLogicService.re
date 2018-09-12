

let createDirectionLight = engineState =>
  engineState |> DirectionLightEngineService.create;

let disposeDirectionLight = (gameObject, lightComponent, engineState) =>
  engineState
  |> GameObjectComponentEngineService.disposeDirectionLightComponent(
       gameObject,
       lightComponent,
     );

let addDirectionLight = (gameObject, lightComponent, engineState) =>
  engineState
  |> GameObjectComponentEngineService.addDirectionLightComponent(
       gameObject,
       lightComponent,
     );