let exportScene = sceneName => {
  let editorState = StateEditorService.getState();

  StateEditorService.getIsRun() ?
    {
      ConsoleUtils.warn(
        "should export scene when stop, but now is run!",
        editorState,
      );

      ();
    } :
    {
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
};