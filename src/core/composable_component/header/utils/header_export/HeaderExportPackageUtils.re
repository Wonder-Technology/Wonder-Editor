let _generateWDB = engineState => {
  let isRun = SceneEditorService.getIsRun(StateEditorService.getState());
  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.bindGameViewActiveCameraArcballCameraControllerEvent;

  let (engineState, sceneGraphArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDB(
      SceneEngineService.getSceneGameObject(engineState),
      Js.Nullable.null,
      engineState,
    );

  let engineState =
    isRun ?
      engineState :
      engineState
      |> ArcballCameraControllerLogicService.unbindGameViewActiveCameraArcballCameraControllerEvent;

  (engineState, sceneGraphArrayBuffer);
};

let _download = [%bs.raw
  (content, filename, mimeType) => {|
   var blob = null;

  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';

  if (!!!mimeType || mimeType.length === 0) {
      blob = new Blob([content]);
  }
  else {
      blob = new Blob([content], { type: mimeType });
  }

  eleLink.href = URL.createObjectURL(blob);

  document.body.appendChild(eleLink);
  eleLink.click();

  document.body.removeChild(eleLink);

  |}
];

let exportPackage = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (engineState, sceneGraphArrayBuffer) = _generateWDB(engineState);

  let asbArrayBuffer =
    HeaderExportASBUtils.generateASB(editorState, engineState);

  let wpkArrayBuffer =
    HeaderExportWPKUtils.generateWPK(sceneGraphArrayBuffer, asbArrayBuffer);

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  _download(wpkArrayBuffer, "package" ++ WPKUtils.getExtName(), "");
};