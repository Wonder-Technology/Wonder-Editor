let _markLastSceneCameraToBeActive =
    (gameObject, targetRemoveBasicCameraView, editorState, engineState) =>
  switch (
    engineState
    |> SceneEngineService.getSceneAllBasicCameraViews
    |> Js.Array.filter(component => component != targetRemoveBasicCameraView)
    |> ArrayService.getLast
  ) {
  | None => (
      GameViewEditorService.removeActivedBasicCameraView(editorState),
      engineState,
    )
  | Some(lastBasicCameraView) =>
    let engineState =
      SceneEditorService.getIsRun(editorState) ?
        ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponentForGameView(
          lastBasicCameraView
          |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
               _,
               engineState,
             ),
          engineState,
        ) :
        engineState;

    (
      GameViewEditorService.setActivedBasicCameraView(
        lastBasicCameraView,
        editorState,
      ),
      engineState,
    );
  };

let handleForRemoveCameraGroup = (gameObject, editorState, engineState) => {
  let targetRemoveBasicCameraView =
    engineState
    |> GameObjectComponentEngineService.getBasicCameraViewComponent(
         gameObject,
       );

  GameViewEditorService.isActiveBasicCameraView(
    targetRemoveBasicCameraView,
    editorState,
  ) ?
    {
      let engineState =
        SceneEditorService.getIsRun(editorState) ?
          ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponentForGameView(
            gameObject,
            engineState,
          ) :
          engineState;

      _markLastSceneCameraToBeActive(
        gameObject,
        targetRemoveBasicCameraView,
        editorState,
        engineState,
      );
    } :
    (editorState, engineState);
};