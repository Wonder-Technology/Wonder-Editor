open WonderBsJszip;

let exportPackage = () => {
  let runEngineState = StateLogicService.getRunEngineState();
  let (state, sceneGraphArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDB(
      SceneEngineService.getSceneGameObject(runEngineState),
      Js.Nullable.null,
      runEngineState,
    );
  let sceneGraphBlob =
    sceneGraphArrayBuffer
    |> WonderLog.Log.print
    |> TypeArrayType.newBlobFromArrayBuffer;
  WonderLog.Log.print(sceneGraphBlob) |> ignore;

  state |> StateLogicService.setRunEngineState;

  Zip.create()
  |. Zip.write(
       ~options=Options.makeWriteOptions(~binary=true, ()),
       "fck.wdb",
       `trustme(sceneGraphBlob),
     )
  |. Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions())
  |> Js.Promise.then_(content =>
       FileSaver.saveAs(content, "aaa.zip") |> Js.Promise.resolve
     )
  |> ignore;
};