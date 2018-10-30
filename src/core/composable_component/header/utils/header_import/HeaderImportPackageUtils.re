open Js.Promise;

open Js.Typed_array;

let _disposeAssets = () =>
  StateEditorService.getState()
  |> AssetTreeEditorService.deepDisposeAssetTreeRoot
  |> StateEditorService.setState;

let _readHeader = dataView => {
  let (sceneWDBByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. 0, dataView);

  let (asbByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. byteOffset, dataView);

  (byteOffset, sceneWDBByteLength, asbByteLength);
};

let _readWPK = (wpk, dataView) => {
  let (byteOffset, sceneWDBByteLength, asbByteLength) =
    _readHeader(dataView);

  (
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
    editorState |> AssetTreeNodeUtils.initRootAssetTree(_, engineState);

  editorState
  |> AssetTreeRootEditorService.setAssetTreeRoot(assetTree)
  |> StateEditorService.setState
  |> ignore;

  engineState |> StateEngineService.setState |> ignore;

  ();
};

let _import = result => {
  _disposeAssets();

  JobEngineService.execDisposeJob |> StateLogicService.getAndSetEngineState;

  _initAssetTreeRoot();

  let wpk = result |> FileReader.convertResultToArrayBuffer;

  let dataView = DataViewUtils.create(wpk);

  let (sceneWDB, asb, dataView) = _readWPK(wpk, dataView);

  let materialMapTupleRef =
    ref((
      WonderCommonlib.SparseMapService.createEmpty(),
      WonderCommonlib.SparseMapService.createEmpty(),
    ));

  let wdbAssetGameObjectGeometryArrRef = ref([||]);

  let engineState = StateEngineService.unsafeGetState();

  HeaderImportASBUtils.importASB(asb)
  |> WonderBsMost.Most.map(((allWDBGameObjectsArr, materialMapTuple)) => {
       RelateGameObjectAndAssetUtils.relateWDBAssetGameObjectsAndAssets(
         allWDBGameObjectsArr,
         materialMapTuple,
       );

       materialMapTupleRef := materialMapTuple;
       wdbAssetGameObjectGeometryArrRef :=
         GameObjectEngineService.getAllGeometrys(
           allWDBGameObjectsArr,
           StateEngineService.unsafeGetState(),
         );

       ();
     })
  |> WonderBsMost.Most.concat(
       MostUtils.callStreamFunc(() =>
         SceneWDBUtils.importSceneWDB(sceneWDB)
         |> WonderBsMost.Most.map(sceneGameObject => {
              let engineState = StateEngineService.unsafeGetState();

              RelateGameObjectAndAssetUtils.relateSceneWDBGameObjectsAndAssets(
                GameObjectEngineService.getAllGameObjects(
                  sceneGameObject,
                  engineState,
                ),
                materialMapTupleRef^,
                wdbAssetGameObjectGeometryArrRef^,
              );

              ();
            })
       ),
     )
  |> WonderBsMost.Most.concat(
       MostUtils.callFunc(() => StateLogicService.getAndRefreshEngineState()),
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
      file |> AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord;

    WonderBsMost.Most.fromPromise(
      Js.Promise.make((~resolve, ~reject) => {
        let reader = FileReader.createFileReader();

        FileReader.onload(reader, result =>
          resolve(.
            {
              name: fileInfo.name,
              type_: AssetTreeNodeUtils.getUploadFileType(fileInfo.name),
              result,
            }: AssetNodeType.nodeResultType,
          )
        );

        AssetTreeNodeUtils.readFileByTypeSync(reader, fileInfo);
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
                 SceneTreeUtils.getSceneGraphDataFromEngine
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