open EditorType;

let _computeAspect = ((_, _, width, height)) =>
  (width |> NumberType.convertIntToFloat)
  /. (height |> NumberType.convertIntToFloat);

let _activeViewCamera =
    (
      viewRect,
      viewActiveBasicCameraView,
      viewActivePerspectiveCameraProjection,
      engineState,
    ) => {
  let engineState =
    switch (
      PerspectiveCameraProjectionEngineService.getPerspectiveCameraAspect(
        viewActivePerspectiveCameraProjection,
        engineState,
      )
    ) {
    | None =>
      PerspectiveCameraProjectionEngineService.setPerspectiveCameraAspect(
        _computeAspect(viewRect),
        viewActivePerspectiveCameraProjection,
        engineState,
      )
      |> PerspectiveCameraProjectionEngineService.updatePerspectiveCameraProjection
      |> PerspectiveCameraProjectionEngineService.removePerspectiveCameraAspect(
           viewActivePerspectiveCameraProjection,
         )
      |> PerspectiveCameraProjectionEngineService.markPerspectiveCameraProjectionNotDirty(
           viewActivePerspectiveCameraProjection,
         )
    | Some(_) => engineState
    };

  BasicCameraViewEngineService.activeBasicCameraView(
    viewActiveBasicCameraView,
    engineState,
  );
};

let _unsafeGetActiveBasicCameraView = (editorState, engineState) =>
  SceneViewEditorService.unsafeGetActiveCamera(editorState)
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(
       _,
       engineState,
     )
  |> WonderLog.Contract.ensureCheck(
       basicCameraViewComponent =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|is active|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 BasicCameraViewEngineService.isActiveBasicCameraView(
                   basicCameraViewComponent,
                   engineState,
                 )
                 |> assertTrue
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

let _activeSceneViewCamera = engineState => {
  let editorState = StateEditorService.getState();
  let sceneViewRect = SceneViewEditorService.unsafeGetViewRect(editorState);

  let activeBasicCameraView =
    _unsafeGetActiveBasicCameraView(editorState, engineState);

  _activeViewCamera(
    sceneViewRect,
    activeBasicCameraView,
    activeBasicCameraView
    |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
         _,
         engineState,
       )
    |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
         _,
         engineState,
       ),
    engineState,
  );
};

let _activeGameViewCamera = engineState => {
  let editorState = StateEditorService.getState();
  let gameViewRect = GameViewEditorService.unsafeGetViewRect(editorState);

  let activeBasicCameraView =
    SceneEngineService.getSceneActiveBasicCameraView(
      SceneEngineService.getSceneGameObject(engineState),
      engineState,
    );

  switch (activeBasicCameraView) {
  | None => engineState
  | Some(activeBasicCameraView) =>
    _activeViewCamera(
      gameViewRect,
      activeBasicCameraView,
      activeBasicCameraView
      |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
           _,
           engineState,
         )
      |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
           _,
           engineState,
         ),
      engineState,
    )
  };
};

let _prepareRenderViewJob =
    ((_, _, width, height) as viewRect, _activeViewCameraFunc, engineState) =>
  engineState
  |> DeviceManagerEngineService.setViewport(viewRect)
  |> DeviceManagerEngineService.setScissorTest(true)
  |> DeviceManagerEngineService.setScissor(viewRect)
  |> _activeViewCameraFunc
  |> ManageIMGUIEngineService.sendUniformProjectionMatData((width, height));

let prepareRenderSceneViewJob = (_, engineState) => {
  let sceneViewRect =
    SceneViewEditorService.getViewRect(StateEditorService.getState());

  _prepareRenderViewJob(
    sceneViewRect |> OptionService.unsafeGet,
    _activeSceneViewCamera,
    engineState,
  );
};

let prepareRenderGameViewJob = (_, engineState) => {
  let gameViewRect =
    GameViewEditorService.getViewRect(StateEditorService.getState());

  _prepareRenderViewJob(
    gameViewRect |> OptionService.unsafeGet,
    _activeGameViewCamera,
    engineState,
  );
};