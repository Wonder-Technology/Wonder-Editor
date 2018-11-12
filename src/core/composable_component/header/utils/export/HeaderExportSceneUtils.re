let exportScene = sceneName => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (engineState, sceneGraphArrayBuffer) =
    HeaderExportSceneWDBUtils.generateSceneWDB(editorState, engineState);

  engineState |> StateEngineService.setState |> ignore;

  HeaderExportUtils.download(
    sceneGraphArrayBuffer,
    sceneName ++ WDBService.getExtName(),
    "",
  );
};