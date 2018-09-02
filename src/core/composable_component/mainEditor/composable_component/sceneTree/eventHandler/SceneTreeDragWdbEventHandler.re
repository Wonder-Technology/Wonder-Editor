open DiffType;

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
    let (cloneGameObjectArr, editEngineState, runEngineState) =
      (
        StateLogicService.getEditEngineState(),
        StateLogicService.getRunEngineState(),
      )
      |> OperateGameObjectLogicService.cloneGameObject(
           wdbGameObjectUid,
           1,
           true,
         );
    let clonedWdbGameObject =
      cloneGameObjectArr |> ArrayService.getFirst |> ArrayService.getFirst;

    let (editEngineState, runEngineState) =
      (editEngineState, runEngineState)
      |> StateLogicService.handleFuncWithDiff(
           [|
             {
               arguments: [|clonedWdbGameObject|],
               type_: DiffType.GameObject,
             },
           |],
           GameObjectUtils.setGameObjectIsRenderIfHasMeshRenderer(true),
         )
      |> StateLogicService.handleFuncWithDiff(
           [|
             {
               arguments: [|clonedWdbGameObject|],
               type_: DiffType.GameObject,
             },
           |],
           SceneEngineService.addSceneChild,
         );

    StateEditorService.getState()
    |> GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
         [|clonedWdbGameObject|],
         runEngineState,
       )
    |> _storeCloneGameObjectInMap(wdbGameObjectUid, cloneGameObjectArr)
    |> StateEditorService.setState
    |> ignore;

    StateLogicService.refreshEditAndRunEngineState(
      editEngineState,
      runEngineState,
    );

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