let exportPackage = (packageName) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (engineState, sceneGraphArrayBuffer) =
    HeaderExportSceneWDBUtils.generateSceneWDB(engineState);

  let asbArrayBuffer =
    HeaderExportASBUtils.generateASB(editorState, engineState);

  let wpkArrayBuffer =
    HeaderExportWPKUtils.generateWPK(sceneGraphArrayBuffer, asbArrayBuffer);

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  HeaderExportUtils.download(
    wpkArrayBuffer,
    packageName ++ WPKService.getExtName(),
    "",
  );
};