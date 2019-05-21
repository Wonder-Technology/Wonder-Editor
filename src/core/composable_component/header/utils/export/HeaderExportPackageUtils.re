open Js.Typed_array;

let _buildDefaultMaterialSnapshotUint8Array = () =>
  BufferUtils.convertBase64ToUint8Array(
    OperateMaterialLogicService.getDefaultSnapshotBase64(),
  );

let _buildImageDataUint8Array = editorState =>
  ImageDataMapAssetEditorService.getMap(editorState)
  |> WonderCommonlib.ImmutableSparseMapService.mapValid(
       (. data: ImageDataType.imageData) =>
       {
         ...data,
         uint8Array:
           ImageDataAssetService.getUint8Array(
             data,
             _buildDefaultMaterialSnapshotUint8Array,
           )
           ->Some,
       }
     )
  |> ImageDataMapAssetEditorService.setMap(_, editorState);

let _export = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let editorState = editorState |> _buildImageDataUint8Array;

  let imageUint8ArrayMap =
    Uint8ArrayAssetEditorService.buildImageUint8ArrayMap(editorState);

  let (engineState, sceneGraphArrayBuffer) =
    HeaderExportSceneWDBUtils.generateSceneWDB(
      false,
      GenerateSceneGraphEngineService.generateWDBForWPK,
      Js.Nullable.return(imageUint8ArrayMap),
      engineState,
    );

  let (engineState, asbArrayBuffer) =
    HeaderExportASBUtils.generateASB(
      imageUint8ArrayMap,
      (editorState, engineState),
    );

  let wpkArrayBuffer =
    HeaderExportWPKUtils.generateWPK(sceneGraphArrayBuffer, asbArrayBuffer);

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  wpkArrayBuffer;
};

let exportPackage = packageName => {
  let editorState = StateEditorService.getState();
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  StateEditorService.getIsRun() ?
    {
      ConsoleUtils.warn(
        LanguageUtils.getMessageLanguageDataByType(
          "header-export-package",
          languageType,
        ),
        editorState,
      );

      ();
    } :
    {
      let wpkArrayBuffer = _export();

      HeaderExportUtils.download(
        wpkArrayBuffer,
        packageName ++ WPKService.getExtName(),
        "",
      );
    };
};