open Js.Promise;

let handleSceneWDB = wdbArrayBuffer =>
  SceneWDBUtils.importSceneWDB(wdbArrayBuffer)
  |> WonderBsMost.Most.tap(((gameObject, _)) =>
       StateEngineService.unsafeGetState()
       |> ShaderEngineService.clearShaderCache
       |> GameObjectEngineService.initAllGameObjects(gameObject)
       |> StateLogicService.refreshEngineState
     );

let _getUploadAssetType = name => {
  open NodeAssetType;

  let extname = FileNameService.getExtName(name);

  switch (extname) {
  | ".wdb" => LoadWDB
  | _ =>
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description={j|the loaded type is error|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
    |> StateLogicService.getEditorState;

    LoadError;
  };
};

let _readWDBByTypeSync = (reader, fileInfo: FileType.fileInfoType) =>
  FileReader.readAsArrayBuffer(reader, fileInfo.file);

let load = (dispatchFunc, event) => {
  open NodeAssetType;
  open FileType;

  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  EventHelper.preventDefault(e);

  switch (
    e##target##files
    |> Js.Dict.values
    |> Js.Array.map(FileReader.convertFileJsObjectToFileInfoRecord)
    |> ArrayService.getFirst
  ) {
  | None =>
    Js.Promise.make((~resolve, ~reject) =>
      resolve(.
        dispatchFunc(
          AppStore.UpdateAction(Update([|UpdateStore.NoUpdate|])),
        ),
      )
    )
  | Some(wdbInfo) =>
    WonderBsMost.Most.just(wdbInfo)
    |> WonderBsMost.Most.flatMap(wdbInfo =>
         WonderBsMost.Most.fromPromise(
           Js.Promise.make((~resolve, ~reject) => {
             let reader = FileReader.createFileReader();

             FileReader.onload(reader, result =>
               resolve(. {
                 name: wdbInfo.name,
                 type_: _getUploadAssetType(wdbInfo.name),
                 result,
               })
             );

             _readWDBByTypeSync(reader, wdbInfo);
           }),
         )
       )
    |> WonderBsMost.Most.flatMap((wdbResult: nodeResultType) =>
         wdbResult.result
         |> FileReader.convertResultToArrayBuffer
         |> handleSceneWDB
       )
    |> WonderBsMost.Most.drain
    |> then_(_ =>
         dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
         |> resolve
       )
  };
};

let loadSceneWDB =
    (~arrayBuffer, ~dispatchFunc=TestTool.getDispatch(), ~fileName="Wdb", ()) => {
  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  load(dispatchFunc, BaseEventTool.buildWDBFileEvent(fileName, arrayBuffer))
  |> then_(() => uploadedWDBNodeId |> resolve);
};