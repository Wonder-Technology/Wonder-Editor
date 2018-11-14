open Js.Promise;

open Js.Typed_array;

let _disposeAssets = () =>
  StateLogicService.getAndSetStateToGetData(
    RemoveWholeAssetTreeAssetLogicService.deepDisposeAssetTreeRoot,
  );

let _readHeader = dataView => {
  let (version, byteOffset) = DataViewUtils.getUint32_1(. 0, dataView);

  let (sceneWDBByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. byteOffset, dataView);

  let (asbByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. byteOffset, dataView);

  (byteOffset, version, sceneWDBByteLength, asbByteLength);
};

let _readWPK = (wpk, dataView) => {
  let (byteOffset, version, sceneWDBByteLength, asbByteLength) =
    _readHeader(dataView);

  (
    version,
    wpk
    |> ArrayBuffer.slice(
         ~start=byteOffset,
         ~end_=byteOffset + sceneWDBByteLength,
       ),
    wpk
    |> ArrayBuffer.sliceFrom(
         byteOffset + (sceneWDBByteLength |> BufferUtils.alignedLength),
       ),
    dataView,
  );
};

let _initAssetTreeRoot = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (assetTree, editorState) =
    editorState |> AssetTreeUtils.initRootAssetTree(_, engineState);

  editorState
  |> TreeRootAssetEditorService.setAssetTreeRoot(assetTree)
  |> StateEditorService.setState
  |> ignore;

  engineState |> StateEngineService.setState |> ignore;

  ();
};

let _import = result => {
  WonderLog.Console.profile("dispose assets");

  let t1 = Performance.now();
  _disposeAssets();

  JobEngineService.execDisposeJob |> StateLogicService.getAndSetEngineState;

  let t2 = Performance.now();

  WonderLog.Console.profileEnd();

  _initAssetTreeRoot();

  let wpk = result |> FileReader.convertResultToArrayBuffer;

  let dataView = DataViewUtils.create(wpk);

  let (version, sceneWDB, asb, dataView) = _readWPK(wpk, dataView);

  let materialMapTupleRef =
    ref((
      WonderCommonlib.SparseMapService.createEmpty(),
      WonderCommonlib.SparseMapService.createEmpty(),
    ));

  let wdbAssetGameObjectGeometryAssetArrRef = ref([||]);

  let engineState = StateEngineService.unsafeGetState();

  let t3 = Performance.now();

  WonderLog.Log.print(("before import", t2 -. t1, t3 -. t2)) |> ignore;

  HeaderImportASBUtils.importASB(asb)
  |> WonderBsMost.Most.map(
       (((allWDBGameObjectsArr, imageUint8ArrayDataMap), materialMapTuple)) => {
       WonderLog.Console.profile("relate wdb asset");

       let t4 = Performance.now();

       ImportPackageRelateGameObjectAndAssetUtils.relateWDBAssetGameObjectsAndAssets(
         allWDBGameObjectsArr,
         materialMapTuple,
       );

       materialMapTupleRef := materialMapTuple;
       wdbAssetGameObjectGeometryAssetArrRef :=
         GeometryAssetLogicService.getGeometryAssetsFromWDBGameObjects(
           allWDBGameObjectsArr,
         )
         |> StateLogicService.getStateToGetData;
       let t5 = Performance.now();

       WonderLog.Console.profileEnd();

       WonderLog.Log.print(("relate wdb asset: ", t5 -. t4)) |> ignore;

       ();
     })
  |> WonderBsMost.Most.concat(
       MostUtils.callStreamFunc(() =>
         SceneWDBUtils.importSceneWDB(sceneWDB)
         |> WonderBsMost.Most.map(
              ((sceneGameObject, imageUint8ArrayDataMap)) => {
              let engineState = StateEngineService.unsafeGetState();

              WonderLog.Console.profile("relate scene wdb");
              let t6 = Performance.now();

              ImportPackageRelateGameObjectAndAssetUtils.relateSceneWDBGameObjectsAndAssets(
                GameObjectEngineService.getAllGameObjects(
                  sceneGameObject,
                  engineState,
                ),
                materialMapTupleRef^,
                wdbAssetGameObjectGeometryAssetArrRef^,
              );

              let t7 = Performance.now();

              WonderLog.Console.profileEnd();

              WonderLog.Log.print(("relate scene wdb: ", t7 -. t6)) |> ignore;

              ();
            })
       ),
     )
  |> WonderBsMost.Most.concat(
       MostUtils.callFunc(() => {
         let t6 = Performance.now();
         StateLogicService.getAndRefreshEngineState();

         let t7 = Performance.now();

         WonderLog.Log.print(("refresh", t7 -. t6)) |> ignore;
       }),
     );
};

let importPackage = (dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  switch (e##target##files |> Js.Dict.values |> ArrayService.getFirst) {
  | None =>
    Js.Promise.make((~resolve, ~reject) =>
      resolve(.
        dispatchFunc(
          AppStore.UpdateAction(Update([|UpdateStore.NoUpdate|])),
        ),
      )
    )
  | Some(file) =>
    let fileInfo: FileType.fileInfoType =
      file |> FileReader.convertFileJsObjectToFileInfoRecord;

    WonderBsMost.Most.fromPromise(
      Js.Promise.make((~resolve, ~reject) => {
        let reader = FileReader.createFileReader();

        FileReader.onload(reader, result =>
          resolve(.
            {
              name: fileInfo.name,
              type_: LoadAssetUtils.getUploadFileType(fileInfo.name),
              result,
            }: AssetNodeType.nodeResultType,
          )
        );

        LoadAssetUtils.readFileByTypeSync(reader, fileInfo);
      }),
    )
    |> WonderBsMost.Most.flatMap((fileResult: AssetNodeType.nodeResultType) =>
         _import(fileResult.result)
       )
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         dispatchFunc(
           AppStore.SceneTreeAction(
             SetSceneGraph(
               Some(
                 SceneGraphUtils.getSceneGraphDataFromEngine
                 |> StateLogicService.getStateToGetData,
               ),
             ),
           ),
         );
         dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
         |> resolve;
       });
  };
};