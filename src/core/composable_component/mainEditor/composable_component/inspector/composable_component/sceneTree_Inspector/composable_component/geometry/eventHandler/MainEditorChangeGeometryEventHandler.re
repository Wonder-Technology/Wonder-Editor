module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (int, int);

  let handleSelfLogic =
      (
        (store, dispatchFunc),
        currentSceneTreeNode,
        (sourceGeometry, targetGeometry),
      ) => {
    let (editEngineState, runEngineState) =
      (
        StateLogicService.getEditEngineState(),
        StateLogicService.getRunEngineState(),
      )
      |> StateLogicService.handleFuncWithDiff(
           [|
             {arguments: [|currentSceneTreeNode|], type_: GameObject},
             {arguments: [|sourceGeometry|], type_: Geometry},
           |],
           GameObjectComponentEngineService.removeGeometryComponent,
         )
      |> StateLogicService.handleFuncWithDiff(
           [|
             {arguments: [|currentSceneTreeNode|], type_: GameObject},
             {arguments: [|targetGeometry|], type_: Geometry},
           |],
           GameObjectComponentEngineService.addGeometryComponent,
         );

    StateLogicService.refreshEditAndRunEngineState(
      editEngineState,
      runEngineState,
    );
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);