open AssetNodeType;

open WonderBsJson.Json;

open Encode;

open ExportAssetType;

let _encodeAssetTexture = textureDataArr => (
  "textures",
  textureDataArr
  |> Js.Array.map(((pathName, sourceId, warpS, warpT, minFilter, magFilter)) =>
       [
         ("path", pathName |> string),
         ("sourceId", sourceId |> int),
         ("warpS", warpS |> int),
         ("warpT", warpT |> int),
         ("minFilter", minFilter |> int),
         ("magFilter", magFilter |> int),
       ]
       |> object_
     )
  |> jsonArray,
);

let _encodeAssetImageSource = imageSourceDataArr => (
  "sources",
  imageSourceDataArr
  |> Js.Array.map(({base64, name}) =>
       [("source", base64 |> string), ("name", name |> string)] |> object_
     )
  |> jsonArray,
);

let encodeAsset = (textureDataArr, imageSourceDataArr) =>
  [_encodeAssetTexture(textureDataArr), _encodeAssetImageSource(imageSourceDataArr)]
  |> object_
  |> Js.Json.stringify
  |> WonderLog.Log.print;