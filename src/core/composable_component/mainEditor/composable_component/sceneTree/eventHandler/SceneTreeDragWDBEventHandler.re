

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
    let (cloneGameObjectArr, engineState) =
      StateEngineService.unsafeGetState()
      |> OperateGameObjectLogicService.cloneGameObject(
           wdbGameObjectUid,
           1,
           true,
         );
    let clonedWDBGameObject =
      cloneGameObjectArr
      |> ArrayService.unsafeGetFirst
      |> ArrayService.unsafeGetFirst;

    let engineState =
      engineState
      |> GameObjectUtils.setGameObjectIsRenderIfHasMeshRenderer(
           true,
           clonedWDBGameObject,
         )
      |> SceneEngineService.addSceneChild(clonedWDBGameObject);

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