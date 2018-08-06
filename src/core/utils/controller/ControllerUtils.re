let _bindRunEngineStateCurrentCamemraArcballEvent = runEngineState => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|all arcballCameraController is unbind event|j},
                ~actual={j|not|j},
              ),
              () =>
              runEngineState
              |> GameObjectComponentEngineService.getAllArcballCameraControllerComponents
              |> Js.Array.filter(component =>
                   runEngineState
                   |> ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                        component,
                      )
                 )
              |> Js.Array.length == 0
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  switch (
    runEngineState |> BasicCameraViewEngineService.getActiveBasicCameraView
  ) {
  | None => runEngineState
  | Some(currentBasicCameraView) =>
    let currentCameraGameObject =
      runEngineState
      |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
           currentBasicCameraView,
         );

    runEngineState
    |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
         currentCameraGameObject,
       ) ?
      runEngineState
      |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
           currentCameraGameObject,
         )
      |. ArcballCameraEngineService.bindArcballCameraControllerEvent(
           runEngineState,
         ) :
      runEngineState;
  };
};

let run = (store, ()) => {
  SceneEditorService.setIsRun(true)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       store,
       StateHistoryService.getStateForHistory(),
     );

  StateLogicService.getRunEngineState()
  |> _bindRunEngineStateCurrentCamemraArcballEvent
  |> StateLogicService.setRunEngineState;

  LoopEngineService.loop() |> ignore;
};

let stop = (dispatchFunc, ()) => {
  StateEditorService.getState()
  |> LoopEditorService.getLoopId
  |> LoopEngineService.stopLoop;

  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       dispatchFunc,
       StateLogicService.getEditEngineState(),
       StateLogicService.getRunEngineState(),
     );

  SceneEditorService.setIsRun(false)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
};