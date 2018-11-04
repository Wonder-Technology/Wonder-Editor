module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;

  let _checkLightCount = (gameObject, engineState) => {
    let result =
      (
        GameObjectEngineService.getAllDirectionLights(
          GameObjectEngineService.getAllGameObjects(gameObject, engineState),
          engineState,
        )
        |> Js.Array.length
      )
      +
      DirectionLightEngineService.getLightCount(engineState) > DirectionLightEngineService.getBufferMaxCount() ?
        {
          ConsoleUtils.warn(
            MainEditorLightUtils.getDirectionLightExceedMaxCountMessage(),
          );

          false;
        } :
        (
          GameObjectEngineService.getAllPointLights(
            GameObjectEngineService.getAllGameObjects(
              gameObject,
              engineState,
            ),
            engineState,
          )
          |> Js.Array.length
        )
        +
        PointLightEngineService.getLightCount(engineState) > PointLightEngineService.getBufferMaxCount() ?
          {
            ConsoleUtils.warn(
              MainEditorLightUtils.getPointLightExceedMaxCountMessage(),
            );

            false;
          } :
          true;

    (engineState, result);
  };

  let handleSelfLogic = ((store, dispatchFunc), (), wdbGameObjectUid) => {
    let engineState = StateEngineService.unsafeGetState();

    switch (_checkLightCount(wdbGameObjectUid, engineState)) {
    | (engineState, false) =>
      engineState |> StateEngineService.setState |> ignore;
      ();
    | (engineState, true) =>
      let (cloneGameObjectArr, engineState) =
        engineState
        |> OperateGameObjectLogicService.cloneGameObject(
             wdbGameObjectUid,
             1,
             true,
           );
      let flatCloneGameObjectArr =
        cloneGameObjectArr
        |> OperateGameObjectLogicService.getFlattenClonedGameObjectArr;

      let clonedWDBGameObject =
        flatCloneGameObjectArr |> ArrayService.unsafeGetFirst;

      let engineState =
        engineState |> SceneEngineService.addSceneChild(clonedWDBGameObject);

      let engineState =
        engineState
        |> LightMaterialEngineService.reInitAllLightMaterialsAndClearShaderCache(
             SceneEngineService.getSceneAllLightMaterials(engineState),
           );

      StateEditorService.getState()
      |> GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
           [|clonedWDBGameObject|],
           engineState,
         )
      /* |> _storeCloneGameObjectInMap(wdbGameObjectUid, cloneGameObjectArr) */
      |> StateEditorService.setState
      |> ignore;

      StateLogicService.refreshEngineState(engineState);

      dispatchFunc(
        AppStore.SceneTreeAction(
          SetSceneGraph(
            Some(
              SceneTreeUtils.getSceneGraphDataFromEngine
              |> StateLogicService.getStateToGetData,
            ),
          ),
        ),
      )
      |> ignore;

      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
      |> ignore;
    };
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);