open WonderBsJszip;

let exportPackage = () => {
  let engineState = StateEngineService.unsafeGetState();
  let (engineState, sceneGraphArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDB(
      SceneEngineService.getSceneGameObject(engineState),
      Js.Nullable.null,
      engineState,
    );

  engineState |> StateEngineService.setState;

  Zip.create()
  |. Zip.write(
       ~options=Options.makeWriteOptions(~binary=true, ()),
       "fck.wdb",
       `trustme(
         sceneGraphArrayBuffer |> TypeArrayType.newBlobFromArrayBuffer,
       ),
     )
  |. Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions())
  |> Js.Promise.then_(content =>
       FileSaver.saveAs(content, "aaa.zip") |> Js.Promise.resolve
     )
  |> ignore;
};