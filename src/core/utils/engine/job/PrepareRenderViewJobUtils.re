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

let _unsafeGetNeedActiveBasicCameraView = (editorState, engineState) =>
  SceneViewEditorService.unsafeGetNeedActiveCamera(editorState)
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(
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
    _unsafeGetNeedActiveBasicCameraView(editorState, engineState);

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
    GameViewEditorService.getActivedBasicCameraView(editorState);

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

let _markIsRenderSceneViewGameObjects = (isRender, editorState, engineState) =>
  SceneViewEditorService.unsafeGetGridPlane(editorState)
  |> GameObjectComponentEngineService.getMeshRendererComponent(
       _,
       engineState,
     )
  |> MeshRendererEngineService.setMeshRendererIsRender(
       _,
       isRender,
       engineState,
     );

let _setSceneViewIMGUIFunc = (editorState, engineState) => {
  let engineStateCustomData =
    EditIMGUIFuncUtils.getEngineStateCustomData(editorState, engineState);
  let engineStateImguiFunc = EditIMGUIFuncUtils.getEngineStateIMGUIFunc();
  let engineState =
    switch (IMGUIEditorService.getGameViewIMGUIFunc(editorState)) {
    | None =>
      /* ManageIMGUIEngineService.setIMGUIFunc(
           (engineStateCustomData, engineStateImguiFunc) |> Obj.magic,
           Obj.magic(
             (.
               (engineStateCustomData, engineStateImguiFunc),
               apiJsObj,
               engineState,
             ) =>
             engineStateImguiFunc(. engineStateCustomData, apiJsObj, engineState)
           ),
           engineState,
         ) */

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

let prepareRenderSceneViewJob = (_, engineState) => {
  let editorState = StateEditorService.getState();
  let sceneViewRect = SceneViewEditorService.getViewRect(editorState);

  let (editorState, engineState) =
    _prepareRenderViewJob(
      sceneViewRect |> OptionService.unsafeGet,
      _activeSceneViewCamera,
      engineState,
    )
    |> _markIsRenderSceneViewGameObjects(true, editorState)
    |> _setSceneViewIMGUIFunc(editorState);

  StateEditorService.setState(editorState) |> ignore;

  engineState;
};

let _setEmptyIMGUIFunc = engineState =>
  engineState
  |> ManageIMGUIEngineService.setIMGUIFunc(
       Obj.magic(-1),
       Obj.magic((. _, apiJsObj, engineState) => engineState),
     );

let prepareRenderGameViewJob = (_, engineState) => {
  let editorState = StateEditorService.getState();
  let gameViewRect = GameViewEditorService.getViewRect(editorState);

  let engineState =
    _prepareRenderViewJob(
      gameViewRect |> OptionService.unsafeGet,
      _activeGameViewCamera,
      engineState,
    )
    |> _markIsRenderSceneViewGameObjects(false, editorState)
    |> (
      engineState =>
        IMGUIEditorService.hasGameViewIMGUIData(editorState) ?
          engineState
          |> ManageIMGUIEngineService.setIMGUIFunc(
               Obj.magic(
                 IMGUIEditorService.unsafeGetGameViewIMGUICustomData(
                   editorState,
                 ),
               ),
               Obj.magic(
                 IMGUIEditorService.unsafeGetGameViewIMGUIFunc(editorState),
               ),
             ) :
          _setEmptyIMGUIFunc(engineState)
    );

  StateEditorService.setState(editorState) |> ignore;

  engineState;
};