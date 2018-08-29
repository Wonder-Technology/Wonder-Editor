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

let doesSceneHasRemoveableCamera = () =>
  GameObjectComponentEngineService.getAllBasicCameraViewComponents
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length > 1;

let isGameObjectNotRemoveable = gameObject =>
  switch (gameObject) {
  | None => true
  | Some(gameObject) =>
    CameraEngineService.hasCameraGroup(gameObject)
    |> StateLogicService.getEngineStateToGetData ?
      ! doesSceneHasRemoveableCamera() : false
  };

let setGameObjectIsRenderIfHasMeshRenderer = (isRender, gameObject, state) => {
  let rec _iterateGameObjectArr = (gameObjectArr, state) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, gameObject) => {
           let state =
             state
             |> GameObjectComponentEngineService.hasMeshRendererComponent(
                  gameObject,
                ) ?
               state
               |> MeshRendererEngineService.setMeshRendererIsRender(
                    state
                    |> GameObjectComponentEngineService.getMeshRendererComponent(
                         gameObject,
                       ),
                    isRender,
                  ) :
               state;

           _iterateGameObjectArr(state |> getChildren(gameObject), state);
         },
         state,
       );

  _iterateGameObjectArr([|gameObject|], state);
};