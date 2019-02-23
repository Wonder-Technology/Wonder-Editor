let _activeSceneViewCamera = engineState => {
  let editorState = StateEditorService.getState();
  let sceneViewRect = SceneViewEditorService.unsafeGetViewRect(editorState);

  let activeBasicCameraView =
    PrepareRenderViewJobUtils.unsafeGetSceneViewNeedActiveBasicCameraView(
      editorState,
      engineState,
    );

  PrepareRenderViewJobUtils.activeViewCamera(
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

let _setSceneViewIMGUIFunc = (editorState, engineState) => {
  let engineStateCustomData =
    SceneViewIMGUIUtils.buildCustomData(editorState, engineState);
  let engineStateImguiFunc = SceneViewIMGUIUtils.buildIMGUIFunc();
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

let prepareRenderSceneViewJob = (_, engineState) => {
  let editorState = StateEditorService.getState();
  let sceneViewRect = SceneViewEditorService.getViewRect(editorState);

  let (editorState, engineState) =
    PrepareRenderViewJobUtils.prepareRenderViewJob(
      sceneViewRect |> OptionService.unsafeGet,
      _activeSceneViewCamera,
      engineState,
    )
    |> PrepareRenderViewJobUtils.markIsRenderSceneViewGameObjects(
         true,
         editorState,
       );

  let (editorState, engineState) =
    _setSceneViewIMGUIFunc(editorState, engineState);

  StateEditorService.setState(editorState) |> ignore;

  engineState;
};