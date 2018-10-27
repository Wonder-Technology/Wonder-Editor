/* open Js.Typed_array;

   let writeUint8ArrayToArrayBuffer =
       (uint8ArrayArr, byteOffset, byteLength, dataView) => {
     let byteOffset = ref(byteOffset);

     /* for (i in byteOffset^ to byteOffset^ + byteLength - 1) { */
     for (i in 0 to byteLength - 1) {
       let value = Uint8Array.unsafe_get(uint8ArrayArr, i);

       byteOffset := DataViewUtils.writeUint8_1(. value, byteOffset^, dataView);
     };

   <<<<<<< HEAD
     (byteOffset^, uint8ArrayArr, dataView);
   };

   let writeUint8ArrayToArrayBufferWithEmptyData =
       (
         byteOffset,
         (emptyUint8Data, uint8ArrayAlignedByteLength, uint8Array),
         dataView,
       ) => {
     let resultByteOffset = byteOffset + uint8ArrayAlignedByteLength;
     let byteOffset = ref(byteOffset);
     let uint8ArrayByteLength = uint8Array |> Uint8Array.length;

     for (i in 0 to uint8ArrayAlignedByteLength - 1) {
       let value =
         if (i >= uint8ArrayByteLength) {
           emptyUint8Data;
         } else {
           Uint8Array.unsafe_get(uint8Array, i);
         };

       byteOffset := DataViewUtils.writeUint8_1(. value, byteOffset^, dataView);
     };
   =======
   let _isAssetNodeNeedHandleSeparate = type_ =>
     type_ === Texture || type_ === Material;

   let _writeFolderAndWDBToPackage = ((type_, id), pathName, jsZip, editorState) =>
     switch (type_) {
     | Folder =>
       jsZip
       |. Zip.write(
            ~options=Options.makeWriteOptions(~dir=true, ()),
            pathName,
            `trustme(),
          )
     | WDB =>
       let {wdbArrayBuffer} =
         editorState
         |> AssetWDBNodeMapEditorService.getWDBNodeMap
         |> WonderCommonlib.SparseMapService.unsafeGet(id);

       jsZip
       |. Zip.write(
            ~options=Options.makeWriteOptions(~binary=true, ()),
            pathName,
            `trustme(wdbArrayBuffer |> TypeArrayType.newBlobFromArrayBuffer),
          );
     | _ => jsZip
     };

   let getAssetTextureDataArr = editorState => {
     let engineState = StateEngineService.unsafeGetState();

     editorState
     |> AssetTextureNodeMapEditorService.getTextureNodeMap
     /* TODO not get valid? */
     |> SparseMapService.getValidDataArr
     |> Js.Array.map(((nodeId, {textureComponent, parentFolderNodeId, imageId})) => {
          let pathName =
            _getAssetNodePathFromAssets(
              /* AssetNodeUtils.getAssetNodeParentId(Texture, nodeId, editorState), */
              parentFolderNodeId,
              ArrayService.create()
              |> ArrayService.push(
                   AssetNodeUtils.getAssetNodeTotalName(
                     Texture,
                     nodeId,
                     (editorState, engineState),
                   ),
                 ),
              (editorState, engineState),
            );

          (
            pathName,
            /* TODO use imageId? */
            textureComponent,
            BasicSourceTextureEngineService.getWrapS(
              textureComponent,
              engineState,
            )
            |> TextureTypeUtils.convertWrapToInt,
            BasicSourceTextureEngineService.getWrapT(
              textureComponent,
              engineState,
            )
            |> TextureTypeUtils.convertWrapToInt,
            BasicSourceTextureEngineService.getMinFilter(
              textureComponent,
              engineState,
            )
            |> TextureTypeUtils.convertFilterToInt,
            BasicSourceTextureEngineService.getMagFilter(
              textureComponent,
              engineState,
            )
            |> TextureTypeUtils.convertFilterToInt,
          );
        });
   };

   /* TODO not get valid? */
   let getImageSourceDataArr = editorState =>
     editorState
     |> AssetImageBase64MapEditorService.getImageBase64Map
     |> SparseMapService.getValidValues
     |> Js.Array.map(image => image |> ExportAssetType.convertImageResultToSource);

   let buildAssetJson = editorState => {
     let textureDataArr = getAssetTextureDataArr(editorState);

     let imageSourceDataArr = getImageSourceDataArr(editorState);

     HeaderEncodeAssetUtils.encodeAsset(textureDataArr, imageSourceDataArr);
   };

   let _writeAllFolderAndWDBToPackage = (jsZip, (editorState, engineState)) =>
     _getAssetAtomNodeArr(
       [|
         editorState
         |> AssetTreeRootEditorService.getAssetTreeRoot
         |> OptionService.unsafeGet,
       |],
       [||],
     )
     |> WonderCommonlib.ArrayService.reduceOneParam(
          (. jsZip, {nodeId, type_} as assetAtomNode) =>
            _isAssetNodeNeedHandleSeparate(type_) ?
              jsZip :
              {
                let pathName =
                  _getAssetNodePathFromAssets(
                    AssetNodeUtils.getAssetNodeParentId(
                      type_,
                      nodeId,
                      editorState,
                    ),
                    ArrayService.create()
                    |> ArrayService.push(
                         AssetNodeUtils.getAssetNodeTotalName(
                           type_,
                           nodeId,
                           (editorState, engineState),
                         ),
                       ),
                    (editorState, engineState),
                  );

                _writeFolderAndWDBToPackage(
                  (type_, nodeId),
                  pathName,
                  jsZip,
                  editorState,
                );
              },
          jsZip,
        );

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
   >>>>>>> origin/dev

     (resultByteOffset, uint8Array, dataView);
   };

   <<<<<<< HEAD
   let writeArrayBufferToArrayBuffer =
       (arrayBuffer, byteOffset, byteLength, dataView) =>
     writeUint8ArrayToArrayBuffer(
       Uint8Array.fromBuffer(arrayBuffer),
       byteOffset,
       byteLength,
       dataView,
     );
   =======
   let exportPackage = (createZipFunc, fetchFunc, exportPackageName) => {
     let engineState = StateEngineService.unsafeGetState();

     let (engineState, sceneGraphArrayBuffer) = _generateWDB(engineState);

     engineState |> StateEngineService.setState;

     createZipFunc()
     |> WonderBsMost.Most.just
     |> WonderBsMost.Most.flatMap(zip =>
          WonderBsMost.Most.fromPromise(
            HeaderExportLoadDataUtils.loadAndWriteIndexHtmlData(
              sceneGraphArrayBuffer,
              fetchFunc,
              zip,
            ),
          )
        )
     |> WonderBsMost.Most.flatMap(zip =>
          WonderBsMost.Most.fromPromise(
            HeaderExportLoadDataUtils.loadAndWriteIndexJsData(fetchFunc, zip),
          )
        )
     |> WonderBsMost.Most.flatMap(zip =>
          WonderBsMost.Most.fromPromise(
            HeaderExportLoadDataUtils.loadAndWriteResData(fetchFunc, zip),
          )
        )
     |> WonderBsMost.Most.flatMap(zip =>
          WonderBsMost.Most.fromPromise(
            HeaderExportLoadDataUtils.loadAndWriteConfigData(fetchFunc, zip),
          )
        )
     |> WonderBsMost.Most.tap(zip =>
          zip
          |. _writeAllFolderAndWDBToPackage((
               StateEditorService.getState(),
               StateEngineService.unsafeGetState(),
             ))
          |. Zip.write(
               ~options=Options.makeWriteOptions(~binary=true, ()),
               "Scene.wdb",
               `trustme(
                 sceneGraphArrayBuffer |> TypeArrayType.newBlobFromArrayBuffer,
               ),
             )
          |. Zip.write(
               "Assets.json",
               `str(buildAssetJson |> StateLogicService.getEditorState),
             )
          |. Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions())
          |> Js.Promise.then_(content =>
               FileSaver.saveAs(content, exportPackageName ++ ".zip")
               |> Js.Promise.resolve
             )
          |> ignore
        )
     |> WonderBsMost.Most.drain;
   };
   >>>>>>> origin/dev */

open Js.Typed_array;

let writeUint8ArrayToArrayBuffer =
    (uint8ArrayArr, byteOffset, byteLength, dataView) => {
  let byteOffset = ref(byteOffset);

  /* for (i in byteOffset^ to byteOffset^ + byteLength - 1) { */
  for (i in 0 to byteLength - 1) {
    let value = Uint8Array.unsafe_get(uint8ArrayArr, i);

    byteOffset := DataViewUtils.writeUint8_1(. value, byteOffset^, dataView);
  };

  (byteOffset^, uint8ArrayArr, dataView);
};

let writeUint8ArrayToArrayBufferWithEmptyData =
    (
      byteOffset,
      (emptyUint8Data, uint8ArrayAlignedByteLength, uint8Array),
      dataView,
    ) => {
  let resultByteOffset = byteOffset + uint8ArrayAlignedByteLength;
  let byteOffset = ref(byteOffset);
  let uint8ArrayByteLength = uint8Array |> Uint8Array.length;

  for (i in 0 to uint8ArrayAlignedByteLength - 1) {
    let value =
      if (i >= uint8ArrayByteLength) {
        emptyUint8Data;
      } else {
        Uint8Array.unsafe_get(uint8Array, i);
      };

    byteOffset := DataViewUtils.writeUint8_1(. value, byteOffset^, dataView);
  };

  (resultByteOffset, uint8Array, dataView);
};

let writeArrayBufferToArrayBuffer =
    (arrayBuffer, byteOffset, byteLength, dataView) =>
  writeUint8ArrayToArrayBuffer(
    Uint8Array.fromBuffer(arrayBuffer),
    byteOffset,
    byteLength,
    dataView,
  );