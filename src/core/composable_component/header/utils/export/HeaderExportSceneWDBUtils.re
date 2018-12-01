let generateWDB =
    (rootGameObject, imageUint8ArrayMap, generateWDBFunc, engineState) => {
  let isRun = StateEditorService.getIsRun();
  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.bindGameViewActiveCameraArcballCameraControllerEvent;

  let (engineState, _, wdbArrayBuffer) =
    generateWDBFunc(rootGameObject, imageUint8ArrayMap, engineState);

  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.unbindGameViewActiveCameraArcballCameraControllerEvent;

  (engineState, wdbArrayBuffer);
};

let generateSceneWDB = (generateWDBFunc, imageUint8ArrayMap, engineState) =>
  generateWDB(
    SceneEngineService.getSceneGameObject(engineState),
    imageUint8ArrayMap,
    generateWDBFunc,
    engineState,
  );