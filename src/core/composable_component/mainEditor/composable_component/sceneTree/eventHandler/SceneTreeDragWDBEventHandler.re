module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;

  let _storeCloneGameObjectInMap =
      (gameObjectUid, cloneGameObjectArr, editorState) => {
    let resultArr =
      cloneGameObjectArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. resultArr, gameObjectLayerArr) =>
             resultArr |> Js.Array.concat(gameObjectLayerArr),
           [||],
         );

    editorState
    |> AssetClonedGameObjectMapEditorService.setResult(
         gameObjectUid,
         resultArr,
       );
  };

  let handleSelfLogic = ((store, dispatchFunc), (), wdbGameObjectUid) => {
    let engineState = StateEngineService.unsafeGetState();

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

    let allClonedGameObjectLightMaterials =
      GameObjectEngineService.getAllLightMaterials(
        flatCloneGameObjectArr,
        engineState,
      );

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
    |> _storeCloneGameObjectInMap(wdbGameObjectUid, cloneGameObjectArr)
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

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);