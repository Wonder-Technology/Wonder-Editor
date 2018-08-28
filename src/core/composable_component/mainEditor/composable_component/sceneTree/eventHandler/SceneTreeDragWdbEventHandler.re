open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;

  let handleSelfLogic = ((store, dispatchFunc), (), wdbGameObjectId) => {
    WonderLog.Log.print("what fck") |> ignore;

    let (cloneGameObject, editEngineState, runEngineState) =
      (
        StateLogicService.getEditEngineState(),
        StateLogicService.getRunEngineState(),
      )
      |> OperateGameObjectLogicService.cloneGameObject(
           wdbGameObjectId,
           1,
           true,
         );
    let clonedWdbGameObject =
      cloneGameObject |> ArrayService.getFirst |> ArrayService.getFirst;

    WonderLog.Log.print((
      "cloned gameObject",
      clonedWdbGameObject,
      StateLogicService.getEditEngineComponent(
        DiffType.GameObject,
        clonedWdbGameObject,
      ),
    ))
    |> ignore;
    editEngineState
    |> GameObjectEngineService.getGameObjectName(
         StateLogicService.getEditEngineComponent(
           DiffType.GameObject,
           clonedWdbGameObject,
         ),
       )
    |> WonderLog.Log.print;

    runEngineState
    |> GameObjectEngineService.getGameObjectName(clonedWdbGameObject)
    |> WonderLog.Log.print;

    /* let (editEngineState, runEngineState) =
         (editEngineState, runEngineState)
         |> StateLogicService.handleFuncWithDiff(
              [|{arguments: clonedWdbGameObject, type_: DiffType.GameObject}|],
              SceneEngineService.addSceneChild,
            );

       StateLogicService.refreshEditAndRunEngineState(
         editEngineState,
         runEngineState,
       ); */
    /*
     dispatchFunc(
       AppStore.SceneTreeAction(
         SetSceneGraph(
           Some(
             SceneTreeUtils.buildSceneGraphDataWithNewGameObject(
               clonedWdbGameObject,
               store |> StoreUtils.unsafeGetSceneGraphDataFromStore,
             )
             |> StateLogicService.getEngineStateToGetData,
           ),
         ),
       ),
     )
     |> ignore; */

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);