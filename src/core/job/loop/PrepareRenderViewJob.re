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

let _unsafeGetSceneViewNeedActiveBasicCameraView = (editorState, engineState) =>
  SceneViewEditorService.unsafeGetNeedActiveCamera(editorState)
  |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
       _,
       engineState,
     );
/* |> WonderLog.Contract.ensureCheck(
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
   ); */

let _activeSceneViewCamera = engineState => {
  let editorState = StateEditorService.getState();
  let sceneViewRect = SceneViewEditorService.unsafeGetViewRect(editorState);

  let activeBasicCameraView =
    _unsafeGetSceneViewNeedActiveBasicCameraView(editorState, engineState);

  _activeViewCamera(
    sceneViewRect,
    activeBasicCameraView,
    activeBasicCameraView
    |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
         _,
         engineState,
       )
    |> GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
         _,
         engineState,
       ),
    engineState,
  );
};

let _unactiveAllBasicCameraViews = (editorState, engineState) => (
  editorState,
  _unsafeGetSceneViewNeedActiveBasicCameraView(editorState, engineState)
  |> BasicCameraViewEngineService.unactiveBasicCameraView(_, engineState),
  /* GameObjectComponentEngineService.getAllBasicCameraViewComponents(
       engineState,
     ) */
);

let _activeGameViewCamera = engineState => {
  let editorState = StateEditorService.getState();
  let gameViewRect = GameViewEditorService.unsafeGetViewRect(editorState);

  let activeBasicCameraView =
    GameViewEditorService.getActivedBasicCameraView(editorState);

  let (editorState, engineState) =
    switch (activeBasicCameraView) {
    | None => _unactiveAllBasicCameraViews(editorState, engineState)
    | Some(activeBasicCameraView) => (
        editorState,
        _activeViewCamera(
          gameViewRect,
          activeBasicCameraView,
          activeBasicCameraView
          |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
               _,
               engineState,
             )
          |> GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
               _,
               engineState,
             ),
          engineState,
        ),
      )
    };

  editorState |> StateEditorService.setState |> ignore;

  engineState;
};

let _prepareRenderViewJob =
    ((_, _, width, height) as viewRect, _activeViewCameraFunc, engineState) =>
  engineState
  |> DeviceManagerEngineService.setViewport(viewRect)
  |> DeviceManagerEngineService.setScissorTest(true)
  |> DeviceManagerEngineService.setScissor(viewRect)
  |> _activeViewCameraFunc
  |> ManageIMGUIEngineService.sendUniformProjectionMatData((width, height));

let _markIsRenderSceneViewGameObjects = (isRender, editorState, engineState) => (
  editorState,
  SceneViewEditorService.unsafeGetGridPlane(editorState)
  |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
       _,
       engineState,
     )
  |> MeshRendererEngineService.setMeshRendererIsRender(
       _,
       isRender,
       engineState,
     ),
);

let _setSceneViewIMGUIFunc = (editorState, engineState) => {
  let engineStateCustomData =
    EditIMGUIFuncUtils.getEngineStateCustomData(editorState, engineState);
  let engineStateImguiFunc = EditIMGUIFuncUtils.getEngineStateIMGUIFunc();
  let engineState =
    switch (IMGUIEditorService.getGameViewIMGUIFunc(editorState)) {
    | None =>
      ManageIMGUIEngineService.setIMGUIFunc(
        engineStateCustomData |> Obj.magic,
        Obj.magic(engineStateImguiFunc),
        engineState,
      )
    | Some(gameViewIMGUIFunc) =>
      ManageIMGUIEngineService.setIMGUIFunc(
        (
          (engineStateCustomData, engineStateImguiFunc),
          (
            gameViewIMGUIFunc,
            IMGUIEditorService.unsafeGetGameViewIMGUICustomData(editorState),
          ),
        )
        |> Obj.magic,
        Obj.magic(
          (.
            (
              (engineStateCustomData, engineStateImguiFunc),
              (gameViewIMGUIFunc, gameViewCustomData),
            ),
            apiJsObj,
            engineState,
          ) => {
          let engineState =
            engineStateImguiFunc(.
              engineStateCustomData,
              apiJsObj,
              engineState,
            );

          gameViewIMGUIFunc(. gameViewCustomData, apiJsObj, engineState);
        }),
        engineState,
      )
    };

  (editorState, engineState);
};
