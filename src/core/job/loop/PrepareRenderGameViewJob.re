let _unactiveAllBasicCameraViews = (editorState, engineState) => (
  editorState,
  PrepareRenderViewJobUtils.unsafeGetSceneViewNeedActiveBasicCameraView(
    editorState,
    engineState,
  )
  |> BasicCameraViewEngineService.unactiveBasicCameraView(_, engineState),
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
        PrepareRenderViewJobUtils.activeViewCamera(
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

let _clearExecFuncDataArr = engineState =>
  engineState |> ExecIMGUIEngineService.clearExecFuncDataArr;

let prepareRenderGameViewJob = (_, engineState) => {
  let editorState = StateEditorService.getState();
  let gameViewRect = GameViewEditorService.getViewRect(editorState);

  let (editorState, engineState) =
    PrepareRenderViewJobUtils.prepareRenderViewJob(
      gameViewRect |> OptionService.unsafeGet,
      _activeGameViewCamera,
      engineState,
    )
    |> PrepareRenderViewJobUtils.markIsRenderSceneViewGameObjects(
         false,
         editorState,
       )
    |> (
      ((editorState, engineState)) =>
        /* TODO fix after add imgui func assets */
        /* IMGUIEditorService.hasGameViewIMGUIData(editorState) ?
           (
             editorState,
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
                ),
           ) :
           (editorState, _clearExecFuncDataArr(engineState)) */
        (editorState, _clearExecFuncDataArr(engineState))
    );

  StateEditorService.setState(editorState) |> ignore;

  engineState;
};