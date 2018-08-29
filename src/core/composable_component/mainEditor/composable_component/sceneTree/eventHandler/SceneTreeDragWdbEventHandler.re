open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;

  type prepareTuple = unit;
  type dataTuple = Wonderjs.GameObjectType.gameObject;

  let handleSelfLogic = ((store, dispatchFunc), (), wdbGameObjectId) => {
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