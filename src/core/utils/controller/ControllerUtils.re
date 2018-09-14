let _checkSceneAllArcballCameraControllersNotBindEvent = engineState =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect=
              {j|scene's all arcballCameraControllers should not bind event|j},
            ~actual={j|bind|j},
          ),
          () =>
          GameObjectEngineService.getAllGameObjects(
            SceneEngineService.getSceneGameObject(engineState),
            engineState,
          )
          |> Js.Array.filter(gameObject =>
               GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                 gameObject,
                 engineState,
               )
             )
          |> Js.Array.filter(arcballCameraController =>
               ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                 arcballCameraController,
                 engineState,
               )
             )
          |> Js.Array.length == 0
        )
      )
    )
  );

let _bindGameViewActiveCameraArcballCameraControllerEvent = engineState => {
  WonderLog.Contract.requireCheck(
    () => _checkSceneAllArcballCameraControllersNotBindEvent(engineState),
    StateEditorService.getStateIsDebug(),
  );

  switch (
    GameViewEditorService.getActivedBasicCameraView(
      StateEditorService.getState(),
    )
  ) {
  | None => engineState
  | Some(activeBasicCameraView) =>
    BasicCameraViewEngineService.getBasicCameraViewGameObject(
      activeBasicCameraView,
      engineState,
    )
    |> ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponentForGameView(
         _,
         engineState,
       )
  };
};

let _unbindGameViewActiveCameraArcballCameraControllerEvent = engineState =>
  (
    switch (
      GameViewEditorService.getActivedBasicCameraView(
        StateEditorService.getState(),
      )
    ) {
    | None => engineState
    | Some(activeBasicCameraView) =>
      BasicCameraViewEngineService.getBasicCameraViewGameObject(
        activeBasicCameraView,
        engineState,
      )
      |> ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponentForGameView(
           _,
           engineState,
         )
    }
  )
  |> WonderLog.Contract.ensureCheck(
       engineState =>
         _checkSceneAllArcballCameraControllersNotBindEvent(engineState),
       StateEditorService.getStateIsDebug(),
     );

let run = (store, ()) => {
  SceneEditorService.setIsRun(true)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       store,
       StateHistoryService.getStateForHistory(),
     );

  StateEngineService.unsafeGetState()
  |> _bindGameViewActiveCameraArcballCameraControllerEvent
  |> StateEngineService.setState
  |> ignore;

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

  StateEngineService.unsafeGetState()
  |> _unbindGameViewActiveCameraArcballCameraControllerEvent
  |> StateEngineService.setState
  |> ignore;

  SceneEditorService.setIsRun(false)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
};