let getGameObjectsFromGameObjectMaterialComponent = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
      gameObject,
      engineState,
    )
    |> BasicMaterialEngineService.getBasicMaterialGameObjects(_, engineState) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
        gameObject,
        engineState,
      )
      |> LightMaterialEngineService.getLightMaterialGameObjects(
           _,
           engineState,
         ) :
      None;

let unsafeGetGameObjectsFromGameObjectMaterialComponentAndCopy =
    (gameObject, engineState) =>
  getGameObjectsFromGameObjectMaterialComponent(gameObject, engineState)
  |> OptionService.unsafeGet
|> Js.Array.copy;