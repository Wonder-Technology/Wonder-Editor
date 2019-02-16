  let getRenderData = (gameObject, engineState) => {
    let transform =
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        gameObject,
        engineState,
      );

    GameObjectComponentEngineService.getGeometryComponent(
      gameObject,
      engineState,
    )
    |> Js.Option.andThen((. geometry) =>
         GameObjectComponentEngineService.getBasicMaterialComponent(
           gameObject,
           engineState,
         )
         |> Js.Option.andThen((. material) =>
              GameObjectComponentEngineService.getMeshRendererComponent(
                gameObject,
                engineState,
              )
              |> Js.Option.andThen((. meshRenderer) =>
                   Some((transform, material, meshRenderer, geometry))
                 )
            )
       );
  };
