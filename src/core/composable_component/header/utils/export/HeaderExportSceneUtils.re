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
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  StateEditorService.getIsRun() ?
    {
      ConsoleUtils.warn(
        LanguageUtils.getMessageLanguageDataByType(
          "should-in-stop",
          languageType,
        ),
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