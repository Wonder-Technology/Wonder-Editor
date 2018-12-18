open Js.Typed_array;

let _buildEmptyUint8Array = () => Uint8Array.make([||]);

let _buildImageNodeUint8Array = editorState =>
  ImageNodeMapAssetEditorService.getImageNodeMap(editorState)
  |> Js.Array.map(
       (({uint8Array, base64}: AssetNodeType.imageResultType) as imageNode) =>
       {
         ...imageNode,
         uint8Array:
           (
             switch (uint8Array) {
             | Some(uint8Array) => uint8Array
             | None =>
               switch (base64) {
               | Some(base64) =>
                 BufferUtils.convertBase64ToUint8Array(base64)
               | None =>
                 ConsoleUtils.error(
                   LogUtils.buildErrorMessage(
                     ~description={j|image->base64 should exist|j},
                     ~reason="",
                     ~solution={j||j},
                     ~params={j||j},
                   ),
                   editorState,
                 );

                 _buildEmptyUint8Array();
               }
             }
           )
           |. Some,
       }
     )
  |> ImageNodeMapAssetEditorService.setImageNodeMap(_, editorState);

let _export = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let editorState = editorState |> _buildImageNodeUint8Array;

  let imageUint8ArrayMap =
    Uint8ArrayAssetEditorService.buildImageUint8ArrayMap(editorState);

  let (engineState, sceneGraphArrayBuffer) =
    HeaderExportSceneWDBUtils.generateSceneWDB(
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

  StateEditorService.getIsRun() ?
    {
      ConsoleUtils.warn(
        "should export package when stop, but now is run!",
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