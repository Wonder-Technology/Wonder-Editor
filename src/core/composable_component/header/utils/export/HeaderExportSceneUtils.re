let _generateSceneWDB = (editorState, engineState) =>
  HeaderExportSceneWDBUtils.generateSceneWDB(
    true,
    GenerateSceneGraphEngineService.generateWDB,
    Js.Nullable.return(
      Uint8ArrayAssetEditorService.buildImageUint8ArrayMap(editorState),
    ),
    engineState,
  );

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
        _generateSceneWDB(editorState, engineState);

      engineState |> StateEngineService.setState |> ignore;

      HeaderExportUtils.download(
        sceneGraphArrayBuffer,
        sceneName ++ WDBService.getExtName(),
        "",
      );
    };
};