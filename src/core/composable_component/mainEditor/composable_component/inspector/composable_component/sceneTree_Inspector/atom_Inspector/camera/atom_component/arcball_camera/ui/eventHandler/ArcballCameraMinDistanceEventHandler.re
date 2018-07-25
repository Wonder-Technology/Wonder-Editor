module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), arcballCameraComponent, distance) =>
    (
      StateLogicService.getEditEngineState()
      |> StateEngineService.deepCopyForRestore,
      StateLogicService.getRunEngineState()
      |> StateEngineService.deepCopyForRestore,
    )
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|arcballCameraComponent|], type_: ArcballCamera}|],
         ArcballCameraEngineService.setArcballCameraControllerMinDistance(
           distance,
         ),
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);