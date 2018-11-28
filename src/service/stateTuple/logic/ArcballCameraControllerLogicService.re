let bindArcballCameraControllerEventForSceneView =
    (cameraController, engineState) => {
  let (
    engineState,
    pointDownHandleFunc,
    pointUpHandleFunc,
    pointDragHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  ) =
    ArcballCameraEngineService.prepareBindEvent(
      cameraController,
      engineState,
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointDownEventName(),
      ~handleFunc=pointDownHandleFunc,
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointUpEventName(),
      ~handleFunc=pointUpHandleFunc,
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointDragEventName(),
      ~handleFunc=pointDragHandleFunc,
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointScaleEventName(),
      ~handleFunc=pointScaleHandleFunc,
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onKeyboardEvent(
      ~eventName=EventType.KeyDown_editor |> Obj.magic,
      ~handleFunc=keydownHandleFunc,
      ~state=engineState,
      (),
    );

  engineState;
};

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
               ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                 arcballCameraController,
                 engineState,
               )
             )
          |> Js.Array.length == 0
        )
      )
    )
  );

let bindGameViewActiveCameraArcballCameraControllerEvent = engineState => {
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

let unbindGameViewActiveCameraArcballCameraControllerEvent = engineState =>
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