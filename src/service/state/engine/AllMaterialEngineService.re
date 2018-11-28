let getMaterialComponent = (gameObject, (editorState, engineState)) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    GameObjectComponentEngineService.getBasicMaterialComponent(
      gameObject,
      engineState,
    ) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      GameObjectComponentEngineService.getLightMaterialComponent(
        gameObject,
        engineState,
      ) :
      {
        ConsoleUtils.error(
          LogUtils.buildErrorMessage(
            ~description=
              {j|gameObject:$gameObject should has material component|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
          editorState,
        );

        None;
      };