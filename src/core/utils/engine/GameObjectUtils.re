let setParentKeepOrder = (parent, child, engineState) =>
  engineState
  |> TransformEngineService.setParentKeepOrder(
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         parent,
         engineState,
       ),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         child,
         engineState,
       ),
     );

let getParentTransform = (child, engineState) =>
  TransformEngineService.getParent(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      child,
      engineState,
    ),
    engineState,
  );

let getParentGameObject = (child, engineState) =>
  getParentTransform(child, engineState)
  |> Js.Option.map((. parentTransform) =>
       TransformEngineService.getGameObjectByTransform(
         parentTransform,
         engineState,
       )
     );

let addChild = (parent, child, engineState) =>
  TransformEngineService.setParent(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      parent,
      engineState,
    ),
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      child,
      engineState,
    ),
    engineState,
  );

let getChildren = (gameObject, engineState) =>
  TransformEngineService.getChildren(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
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

let setAllGameObjectsIsRenderIfHasMeshRenderer =
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
               |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
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