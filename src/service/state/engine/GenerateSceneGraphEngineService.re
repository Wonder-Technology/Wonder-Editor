open Wonderjs;

open Js.Typed_array;

let generateGLBData = GenerateSceneGraphAPI.generateGLBData;

let generateWDB = GenerateSceneGraphAPI.generateWDB;

let _writeUint32DataToUint8Array = uint32Data =>
  Uint8Array.fromBuffer(
    Uint32Array.make([|uint32Data|]) |> Uint32Array.buffer,
  );

let isUint8ArrayHasOneUint32Data = uint8Array =>
  uint8Array |> Uint8Array.length === 4;

let readUint32DataFromUint8Array = uint8Array =>
  Uint32Array.fromBuffer(uint8Array |> Uint8Array.buffer)
  |> Uint32Array.unsafe_get(_, 0);

let generateWDBForWPK = (sceneGameObject, imageUint8ArrayMap, engineState) =>
  GenerateWDBSystem.generateWDB(
    sceneGameObject,
    imageUint8ArrayMap,
    (
      (
        (. geometry, engineState) => {
          let length =
            VerticesGeometryMainService.getVertices(. geometry, engineState)
            |> Float32Array.length
            |> NumberType.intToFloat;

          Float32Array.make([|length, length, length|]);
        },
        (. geometry, engineState) => {
          let length =
            NormalsGeometryMainService.getNormals(. geometry, engineState)
            |> Float32Array.length
            |> NumberType.intToFloat;

          Float32Array.make([|length, length, length|]);
        },
        (. geometry, engineState) => {
          let length =
            TexCoordsGeometryMainService.getTexCoords(. geometry, engineState)
            |> Float32Array.length
            |> NumberType.intToFloat;

          Float32Array.make([|length, length|]);
        },
        (. geometry, engineState) =>
          Uint16Array.make([|
            IndicesGeometryMainService.getIndices(. geometry, engineState)
            |> Uint16Array.length,
          |]),
        (. geometry, engineState) =>
          Uint32Array.make([|
            IndicesGeometryMainService.getIndices32(. geometry, engineState)
            |> Uint32Array.length,
          |]),
      ),
      imageUint8Array =>
        _writeUint32DataToUint8Array(imageUint8Array |> Uint8Array.length),
    ),
    engineState,
  );