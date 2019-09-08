open Js.Typed_array;

let buildFakeBitmapArrayBuffer = () => ArrayBuffer.make(20);

let setSettedAssetBitmapData =
    (
      ~name="bitmap",
      ~arrayBuffer=buildFakeBitmapArrayBuffer(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  AssetIMGUIEngineService.setSettedAssetBitmapData(
    name,
    arrayBuffer,
    engineState,
  );

let addSettedAssetCustomImageData = (customImageData, engineState) =>
  AssetIMGUIEngineService.addSettedAssetCustomImageData(
    customImageData,
    engineState,
  );

let buildFakeCustomImageArrayBuffer = () => ArrayBuffer.make(10);

let buildFakeCustomImageData = (~imageId="i1", ()) => (
  buildFakeCustomImageArrayBuffer(),
  imageId,
  "image/png",
);

let findSettedAssetCustomImageDataById = (customImageId, engineState) =>
  AssetIMGUIEngineService.getSettedAssetCustomImageDataArr(engineState)
  |> Js.Array.find(((_, id, _)) => id === customImageId)
  |> OptionService.unsafeGet;