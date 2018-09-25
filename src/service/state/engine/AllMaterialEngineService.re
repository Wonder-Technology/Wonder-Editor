let getGameObjectsFromGameObjectMaterialComponent = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    GameObjectComponentEngineService.getBasicMaterialComponent(
      gameObject,
      engineState,
    )
    |> BasicMaterialEngineService.getBasicMaterialGameObjects(_, engineState) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      GameObjectComponentEngineService.getLightMaterialComponent(
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