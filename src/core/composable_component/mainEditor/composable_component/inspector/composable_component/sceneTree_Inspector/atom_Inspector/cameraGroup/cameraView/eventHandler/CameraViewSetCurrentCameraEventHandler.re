open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = int;

  let handleSelfLogic = ((store, dispatchFunc), (), basicCameraView) => {
    StateLogicService.getRunEngineState()
    |> BasicCameraViewEngineService.activeBasicCameraView(basicCameraView)
    |> DirectorEngineService.loopBody(0.)
    |> StateLogicService.setRunEngineState;

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);