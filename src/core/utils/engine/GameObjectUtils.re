let setParentKeepOrder = (parent, child, engineState) =>
  engineState
  |> TransformEngineService.setParentKeepOrder(
       GameObjectComponentEngineService.getTransformComponent(
         parent,
         engineState,
       ),
       GameObjectComponentEngineService.getTransformComponent(
         child,
         engineState,
       ),
     );

let getParent = (child, engineState) =>
  TransformEngineService.getParent(
    GameObjectComponentEngineService.getTransformComponent(
      child,
      engineState,
    ),
    engineState,
  );

let addChild = (parent, child, engineState) =>
  TransformEngineService.setParent(
    GameObjectComponentEngineService.getTransformComponent(
      parent,
      engineState,
    ),
    GameObjectComponentEngineService.getTransformComponent(
      child,
      engineState,
    ),
    engineState,
  );

let getChildren = (gameObject, engineState) =>
  TransformEngineService.getChildren(
    GameObjectComponentEngineService.getTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> Js.Array.map(transform =>
       TransformEngineService.getGameObjectByTransform(transform, engineState)
     );

let hasChildren = (gameObject, engineState) =>
  getChildren(gameObject, engineState) |> Js.Array.length > 0;

let setGameObjectIsRenderIfHasMeshRenderer =
    (isRender, gameObject, engineState) => {
  let rec _iterateGameObjectArr = (gameObjectArr, engineState) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) => {
           let engineState =
             engineState
             |> GameObjectComponentEngineService.hasMeshRendererComponent(
                  gameObject,
                ) ?
               engineState
               |> GameObjectComponentEngineService.getMeshRendererComponent(
                    gameObject,
                  )
               |. MeshRendererEngineService.setMeshRendererIsRender(
                    isRender,
                    engineState,
                  ) :
               engineState;

           _iterateGameObjectArr(
             engineState |> getChildren(gameObject),
             engineState,
           );
         },
         engineState,
       );

  _iterateGameObjectArr([|gameObject|], engineState);
};

let setGameObjectIsRenderIfHasDirectionLight =
    (isRender, gameObject, engineState) => {
  let rec _iterateGameObjectArr = (gameObjectArr, engineState) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) => {
           let engineState =
             engineState
             |> GameObjectComponentEngineService.hasDirectionLightComponent(
                  gameObject,
                ) ?
               engineState
               |> GameObjectComponentEngineService.getDirectionLightComponent(
                    gameObject,
                  )
               |. DirectionLightEngineService.setDirectionLightIsRender(
                    isRender,
                    engineState,
                  ) :
               engineState;

           _iterateGameObjectArr(
             engineState |> getChildren(gameObject),
             engineState,
           );
         },
         engineState,
       );

  _iterateGameObjectArr([|gameObject|], engineState);
};

let setGameObjectIsRenderIfHasPointLight = (isRender, gameObject, engineState) => {
  let rec _iterateGameObjectArr = (gameObjectArr, engineState) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) => {
           let engineState =
             engineState
             |> GameObjectComponentEngineService.hasPointLightComponent(
                  gameObject,
                ) ?
               engineState
               |> GameObjectComponentEngineService.getPointLightComponent(
                    gameObject,
                  )
               |. PointLightEngineService.setPointLightIsRender(
                    isRender,
                    engineState,
                  ) :
               engineState;

           _iterateGameObjectArr(
             engineState |> getChildren(gameObject),
             engineState,
           );
         },
         engineState,
       );

  _iterateGameObjectArr([|gameObject|], engineState);
};