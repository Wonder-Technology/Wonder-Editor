open WonderBsJszip;

let exportPackage = () => {
  let runEngineState = StateLogicService.getRunEngineState();
  let (state, sceneGraphArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDB(
      SceneEngineService.getSceneGameObject(runEngineState),
      Js.Nullable.null,
      runEngineState,
    );

  state |> StateLogicService.setRunEngineState;

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