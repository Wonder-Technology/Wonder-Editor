open Js.Typed_array;

open Js.Promise;

let _getJsonStr = (jsonByteLength, asb) => {
  let decoder = TextDecoder.newTextDecoder("utf-8");

  decoder
  |> TextDecoder.decodeUint8Array(
       Uint8Array.fromBufferRange(
         asb,
         ~offset=ASBUtils.getHeaderTotalByteLength(),
         ~length=jsonByteLength,
       ),
     );
};

let _getBuffer = (jsonByteLength, asb) =>
  asb
  |> ArrayBuffer.sliceFrom(
       ASBUtils.getHeaderTotalByteLength()
       + jsonByteLength
       |> BufferUtils.alignedLength,
     );

let _readHeader = dataView => {
  let (jsonByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. 0, dataView);

  let (bufferByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. byteOffset, dataView);

  (byteOffset, jsonByteLength, bufferByteLength);
};

let importASB = asb => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let dataView = DataViewUtils.create(asb);

  let (byteOffset, jsonByteLength, bufferByteLength) = _readHeader(dataView);

  let jsonStr = _getJsonStr(jsonByteLength, asb);
  let buffer = _getBuffer(jsonByteLength, asb);

  let asbRecord: ExportAssetType.assets =
    jsonStr |> Js.Json.parseExn |> Obj.magic;

  BuildAssetDataUtils.buildImageData(asbRecord, buffer, editorState)
  |> WonderBsMost.Most.fromPromise
  |> WonderBsMost.Most.map(((imageMap, imageNodeIdMap, editorState)) => {
       let (textureMap, (editorState, engineState)) =
         BuildAssetDataUtils.buildTextureData(
           asbRecord,
           (imageMap, imageNodeIdMap),
           (editorState, engineState),
         );

       BuildAssetDataUtils.buildMaterialData(
         asbRecord,
         textureMap,
         (editorState, engineState),
       );
     })
  |> WonderBsMost.Most.flatMap(
       ((basicMaterialMap, lightMaterialMap, (editorState, engineState))) =>
       BuildAssetDataUtils.buildWDBData(
         asbRecord,
         buffer,
         (editorState, engineState),
       )
       |> then_(((allWDBGameObjectArr, (editorState, engineState))) => {
            editorState |> StateEditorService.setState |> ignore;
            engineState |> StateEngineService.setState |> ignore;

            (
              (
                allWDBGameObjectArr,
                Uint8ArrayAssetEditorService.buildImageUint8ArrayMap(
                  editorState,
                ),
              ),
              (basicMaterialMap, lightMaterialMap),
            )
            |> resolve;
          })
       |> WonderBsMost.Most.fromPromise
     );
};