let unsafeGetMaterialComponent = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
      gameObject,
      engineState,
    ) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
        gameObject,
        engineState,
      ) :
      WonderLog.Log.fatal(
        LogUtils.buildFatalMessage(
          
          ~description=
            {j|gameObject:$gameObject should has material component|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );

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