let exportScene = () => {
  let engineState = StateEngineService.unsafeGetState();

  let (engineState, sceneGraphArrayBuffer) =
    HeaderExportSceneWDBUtils.generateSceneWDB(engineState);

  engineState |> StateEngineService.setState |> ignore;

  HeaderExportUtils.download(
    sceneGraphArrayBuffer,
    "Scene" ++ WDBService.getExtName(),
    "",
  );
};