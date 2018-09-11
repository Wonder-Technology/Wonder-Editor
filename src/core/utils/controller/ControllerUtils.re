/* let _bindRunEngineStateCurrentCamemraArcballEvent = runEngineState => {
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
   }; */

/* let _unbindRunEngineStateAllArcballCameraControllerEvent = runEngineState =>
   runEngineState
   |> GameObjectComponentEngineService.getAllArcballCameraControllerComponents
   |> WonderCommonlib.ArrayService.reduceOneParam(
        (. state, component) =>
          state
          |> ArcballCameraEngineService.unbindArcballCameraControllerEvent(
               component,
             ),
        runEngineState,
      )
   |> WonderLog.Contract.ensureCheck(
        state =>
          WonderLog.(
            Contract.(
              Operators.(
                test(
                  Log.buildAssertMessage(
                    ~expect=
                      {j|all arcballCameraController component shouldn't bind event|j},
                    ~actual={j|not|j},
                  ),
                  () =>
                  state
                  |> GameObjectComponentEngineService.getAllArcballCameraControllerComponents
                  |> Js.Array.filter(component =>
                       state
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
      ); */

let run = (store, ()) => {
  SceneEditorService.setIsRun(true)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       store,
       StateHistoryService.getStateForHistory(),
     );

  /* TODO handle event */
  /* StateLogicService.getRunEngineState()
     |> _bindRunEngineStateCurrentCamemraArcballEvent
     |> StateLogicService.setRunEngineState; */

  LoopEngineService.loop() |> ignore;
};

let stop = (dispatchFunc, ()) => {
  StateEditorService.getState()
  |> LoopEditorService.getLoopId
  |> LoopEngineService.stopLoop;

  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       dispatchFunc,
       StateEngineService.unsafeGetState(),
     );

  /* StateLogicService.getRunEngineState()
     |> _unbindRunEngineStateAllArcballCameraControllerEvent
     |> StateLogicService.setRunEngineState; */

  SceneEditorService.setIsRun(false)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
};