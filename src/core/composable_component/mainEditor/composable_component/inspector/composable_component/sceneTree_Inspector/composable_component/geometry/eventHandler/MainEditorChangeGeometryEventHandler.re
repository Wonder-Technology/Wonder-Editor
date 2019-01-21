module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (int, int);
  type return = unit;

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        currentSceneTreeNode,
        (sourceGeometry, targetGeometry),
      ) => {
    let engineState =
      StateEngineService.unsafeGetState()
      |> GameObjectComponentEngineService.removeGeometryComponent(
           currentSceneTreeNode,
           sourceGeometry,
         )
      |> GameObjectComponentEngineService.addGeometryComponent(
           currentSceneTreeNode,
           targetGeometry,
         );

    StateLogicService.refreshEngineState(engineState);
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);