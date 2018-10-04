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
         /* TODO rename to source? */
         ("textureIndex", sourceId |> int),
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
  |> Js.Array.map(({base64, name, textureArray}) =>
       [
         ("base64", base64 |> string),
         ("name", name |> string),
         /* TODO remove textureArray? */
         ("textureArray", textureArray |> array(id => id |> int)),
       ]
       |> object_
     )
  |> jsonArray,
);

let encodeAsset = (textureDataArr, imageSourceDataArr) =>
  [
    _encodeAssetTexture(textureDataArr),
    _encodeAssetImageSource(imageSourceDataArr),
  ]
  |> object_
  |> Js.Json.stringify;