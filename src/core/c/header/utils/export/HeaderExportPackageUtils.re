open Js.Typed_array;

let _buildDefaultMaterialSnapshotUint8Array = () =>
  BufferUtils.convertBase64ToUint8Array(
    OperateMaterialLogicService.getDefaultSnapshotBase64(),
  );

let _buildBasicSourceTextureImageDataUint8ArrayToMap = editorState =>
  BasicSourceTextureImageDataMapAssetEditorService.getMap(editorState)
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
  |> BasicSourceTextureImageDataMapAssetEditorService.setMap(_, editorState);

let _export = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let editorState =
    editorState |> _buildBasicSourceTextureImageDataUint8ArrayToMap;

  let basicSourceTextureImageUint8ArrayMap =
    Uint8ArrayAssetEditorService.buildBasicSourceTextureImageUint8ArrayMap(
      editorState,
    );

  let (engineState, sceneGraphArrayBuffer) =
    HeaderExportSceneWDBUtils.generateSceneWDB(
      false,
      GenerateSceneGraphEngineService.generateWDBForWPK,
      Js.Nullable.return(basicSourceTextureImageUint8ArrayMap),
      engineState,
    );

  let (engineState, asbArrayBuffer) =
    HeaderExportASBUtils.generateASB(
      basicSourceTextureImageUint8ArrayMap,
      (editorState, engineState),
    );

  let wpkArrayBuffer =
    HeaderExportWPKUtils.generateWPK(sceneGraphArrayBuffer, asbArrayBuffer);

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  wpkArrayBuffer;
};

let exportPackage = packageName => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  StateEditorService.getIsRun() ?
    {
      ConsoleUtils.warn(
        LanguageUtils.getMessageLanguageDataByType(
          "should-in-stop",
          languageType,
        ),
      )
      |> StateLogicService.getEditorState;

      ();
    } :
    Console.tryCatch(
      () => {
        let wpkArrayBuffer = _export();

        HeaderExportUtils.download(
          wpkArrayBuffer,
          packageName ++ WPKService.getExtName(),
          "",
        );
      },
      e => {
        let message = e##message;
        let stack = e##stack;

        ConsoleUtils.error(
          LogUtils.buildErrorMessage(
            ~description={j|$message|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        )
        |> StateLogicService.getEditorState;
        ConsoleUtils.logStack(stack) |> ignore;
      },
    );
};