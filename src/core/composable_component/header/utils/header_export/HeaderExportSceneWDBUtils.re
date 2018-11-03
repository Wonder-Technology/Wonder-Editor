let generateWDB = (rootGameObject, engineState) => {
  let isRun = SceneEditorService.getIsRun(StateEditorService.getState());
  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.bindGameViewActiveCameraArcballCameraControllerEvent;

  /* TODO optimize: pass imageUint8ArrayMap?(imageUint8ArrayMap can't work???need fix or not pass?) */
  let (engineState, _, wdbArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDB(
      rootGameObject,
      Js.Nullable.null,
      engineState,
    );

  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.unbindGameViewActiveCameraArcballCameraControllerEvent;

  (engineState, wdbArrayBuffer);
};

let generateSceneWDB = engineState =>
  generateWDB(
    SceneEngineService.getSceneGameObject(engineState),
    engineState,
  );