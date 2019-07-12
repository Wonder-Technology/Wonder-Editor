open Js.Typed_array;

let generateGLBData = Wonderjs.GenerateSceneGraphAPI.generateGLBData;

let generateWDB = Wonderjs.GenerateSceneGraphAPI.generateWDB;

let generateSceneWDB = (sceneGameObject, imageUint8ArrayMap, engineState) =>
  generateWDB(
    sceneGameObject,
    imageUint8ArrayMap,
    true,
    engineState,
  );

let _writeUint32DataToUint8Array = uint32Data =>
  Uint8Array.fromBuffer(
    Uint32Array.make([|uint32Data|]) |> Uint32Array.buffer,
  );

let isUint8ArrayHasOneUint32Data = uint8Array =>
  uint8Array |> Uint8Array.length === 4;

let readUint32DataFromUint8Array = uint8Array =>
  Uint32Array.fromBuffer(uint8Array |> Uint8Array.buffer)
  |> Uint32Array.unsafe_get(_, 0);

let _gePointstLength = (geometry, engineState, getPointsFunc) =>
  getPointsFunc(. geometry, engineState)
  |> Float32Array.length
  |> NumberType.convertIntToFloat;

let generateWDBForWPK = (sceneGameObject, imageUint8ArrayMap, engineState) =>
  Wonderjs.GenerateWDBSystem.generateWDB(
    sceneGameObject,
    imageUint8ArrayMap |> Js.Nullable.toOption |> OptionService.unsafeGet,
    true,
    (
      (
        (. geometry, engineState) => {
          let length =
            _gePointstLength(
              geometry,
              engineState,
              Wonderjs.VerticesGeometryMainService.getVertices,
            );

          Float32Array.make([|length, length, length|]);
        },
        (. geometry, engineState) => {
          let length =
            _gePointstLength(
              geometry,
              engineState,
              Wonderjs.NormalsGeometryMainService.getNormals,
            );

          Float32Array.make([|length, length, length|]);
        },
        (. geometry, engineState) => {
          let length =
            _gePointstLength(
              geometry,
              engineState,
              Wonderjs.TexCoordsGeometryMainService.getTexCoords,
            );

          Float32Array.make([|length, length|]);
        },
        (. geometry, engineState) =>
          Uint16Array.make([|
            Wonderjs.IndicesGeometryMainService.getIndices16(.
              geometry,
              engineState,
            )
            |> Uint16Array.length,
          |]),
        (. geometry, engineState) =>
          Uint32Array.make([|
            Wonderjs.IndicesGeometryMainService.getIndices32(.
              geometry,
              engineState,
            )
            |> Uint32Array.length,
          |]),
      ),
      imageUint8Array =>
        _writeUint32DataToUint8Array(imageUint8Array |> Uint8Array.length),
    ),
    engineState,
  );

let generateWDBForASB = (sceneGameObject, imageUint8ArrayMap, engineState) =>
  Wonderjs.GenerateWDBSystem.generateWDB(
    sceneGameObject,
    imageUint8ArrayMap |> Js.Nullable.toOption |> OptionService.unsafeGet,
    false,
    (
      (
        Wonderjs.VerticesGeometryMainService.getVertices,
        Wonderjs.NormalsGeometryMainService.getNormals,
        Wonderjs.TexCoordsGeometryMainService.getTexCoords,
        Wonderjs.IndicesGeometryMainService.getIndices16,
        Wonderjs.IndicesGeometryMainService.getIndices32,
      ),
      imageUint8Array =>
        _writeUint32DataToUint8Array(imageUint8Array |> Uint8Array.length),
    ),
    engineState,
  );