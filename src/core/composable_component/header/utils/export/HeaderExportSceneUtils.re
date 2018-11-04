let exportScene = sceneName => {
  let engineState = StateEngineService.unsafeGetState();

  let (engineState, sceneGraphArrayBuffer) =
    HeaderExportSceneWDBUtils.generateSceneWDB(engineState);

  engineState |> StateEngineService.setState |> ignore;

  HeaderExportUtils.download(
    sceneGraphArrayBuffer,
    sceneName ++ WDBService.getExtName(),
    "",
  );
};