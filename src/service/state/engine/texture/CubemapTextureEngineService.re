open Wonderjs;

open CubemapTextureType;

let create = CubemapTextureAPI.createCubemapTexture;

let unsafeGetPXSource = CubemapTextureAPI.unsafeGetCubemapTexturePXSource;

let unsafeGetNXSource = CubemapTextureAPI.unsafeGetCubemapTextureNXSource;

let unsafeGetPYSource = CubemapTextureAPI.unsafeGetCubemapTexturePYSource;

let unsafeGetNYSource = CubemapTextureAPI.unsafeGetCubemapTextureNYSource;

let unsafeGetPZSource = CubemapTextureAPI.unsafeGetCubemapTexturePZSource;

let unsafeGetNZSource = CubemapTextureAPI.unsafeGetCubemapTextureNZSource;

let _getSource = (texture, sourceMap) =>
  sourceMap |> WonderCommonlib.MutableSparseMapService.get(texture);

let getPXSource = (texture, engineState) => {
  let {pxSourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

  _getSource(texture, pxSourceMap);
};

let getNXSource = (texture, engineState) => {
  let {nxSourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

  _getSource(texture, nxSourceMap);
};

let getPYSource = (texture, engineState) => {
  let {pySourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

  _getSource(texture, pySourceMap);
};

let getNYSource = (texture, engineState) => {
  let {nySourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

  _getSource(texture, nySourceMap);
};

let getPZSource = (texture, engineState) => {
  let {pzSourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

  _getSource(texture, pzSourceMap);
};

let getNZSource = (texture, engineState) => {
  let {nzSourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

  _getSource(texture, nzSourceMap);
};

/* let setPXSource = (source, texture, engineState) =>
     engineState |> CubemapTextureAPI.setCubemapTexturePXSource(texture, source);

   let setNXSource = (source, texture, engineState) =>
     engineState |> CubemapTextureAPI.setCubemapTextureNXSource(texture, source);

   let setPYSource = (source, texture, engineState) =>
     engineState |> CubemapTextureAPI.setCubemapTexturePYSource(texture, source);

   let setNYSource = (source, texture, engineState) =>
     engineState |> CubemapTextureAPI.setCubemapTextureNYSource(texture, source);

   let setPZSource = (source, texture, engineState) =>
     engineState |> CubemapTextureAPI.setCubemapTexturePZSource(texture, source);

   let setNZSource = (source, texture, engineState) =>
     engineState |> CubemapTextureAPI.setCubemapTextureNZSource(texture, source); */

let setPXSource = (texture, source, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTexturePXSource(texture, source);

let setNXSource = (texture, source, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureNXSource(texture, source);

let setPYSource = (texture, source, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTexturePYSource(texture, source);

let setNYSource = (texture, source, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureNYSource(texture, source);

let setPZSource = (texture, source, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTexturePZSource(texture, source);

let setNZSource = (texture, source, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureNZSource(texture, source);

/* let _removeSource = (texture, sourceMap) =>
     sourceMap |> WonderCommonlib.MutableSparseMapService.deleteVal(texture);

   let removePXSource = (source, texture, engineState) => {
     let {pxSourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

     _removeSource(texture, pxSourceMap) |> ignore;

     engineState;
   };

   let removeNXSource = (source, texture, engineState) => {
     let {nxSourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

     _removeSource(texture, nxSourceMap) |> ignore;

     engineState;
   };

   let removePYSource = (source, texture, engineState) => {
     let {pySourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

     _removeSource(texture, pySourceMap) |> ignore;

     engineState;
   };

   let removeNYSource = (source, texture, engineState) => {
     let {nySourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

     _removeSource(texture, nySourceMap) |> ignore;

     engineState;
   };

   let removePZSource = (source, texture, engineState) => {
     let {pzSourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

     _removeSource(texture, pzSourceMap) |> ignore;

     engineState;
   };

   let removeNZSource = (source, texture, engineState) => {
     let {nzSourceMap} = RecordCubemapTextureMainService.getRecord(engineState);

     _removeSource(texture, nzSourceMap) |> ignore;

     engineState;
   }; */

let getCubemapTextureName = NameCubemapTextureMainService.getName;

let unsafeGetCubemapTextureName = CubemapTextureAPI.unsafeGetCubemapTextureName;

let setCubemapTextureName = (name, texture, engineState) =>
  CubemapTextureAPI.setCubemapTextureName(texture, name, engineState);

let getWrapS = CubemapTextureAPI.getCubemapTextureWrapS;

let setWrapS = (wrapS, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureWrapS(texture, wrapS);

let getWrapT = CubemapTextureAPI.getCubemapTextureWrapT;

let setWrapT = (wrapT, texture, engineTtate) =>
  engineTtate |> CubemapTextureAPI.setCubemapTextureWrapT(texture, wrapT);

let getMagFilter = CubemapTextureAPI.getCubemapTextureMagFilter;

let setMagFilter = (filter, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureMagFilter(texture, filter);

let getMinFilter = CubemapTextureAPI.getCubemapTextureMinFilter;

let setMinFilter = (filter, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureMinFilter(texture, filter);

let getPXFormat = CubemapTextureAPI.getCubemapTexturePXFormat;

let getNXFormat = CubemapTextureAPI.getCubemapTextureNXFormat;

let getPYFormat = CubemapTextureAPI.getCubemapTexturePYFormat;

let getNYFormat = CubemapTextureAPI.getCubemapTextureNYFormat;

let getPZFormat = CubemapTextureAPI.getCubemapTexturePZFormat;

let getNZFormat = CubemapTextureAPI.getCubemapTextureNZFormat;

let setPXFormat = (format, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTexturePXFormat(texture, format);

let setNXFormat = (format, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureNXFormat(texture, format);

let setPYFormat = (format, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTexturePYFormat(texture, format);

let setNYFormat = (format, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureNYFormat(texture, format);

let setPZFormat = (format, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTexturePZFormat(texture, format);

let setNZFormat = (format, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureNZFormat(texture, format);

let getPXType = CubemapTextureAPI.getCubemapTexturePXType;

let getNXType = CubemapTextureAPI.getCubemapTextureNXType;

let getPYType = CubemapTextureAPI.getCubemapTexturePYType;

let getNYType = CubemapTextureAPI.getCubemapTextureNYType;

let getPZType = CubemapTextureAPI.getCubemapTexturePZType;

let getNZType = CubemapTextureAPI.getCubemapTextureNZType;

let setPXType = (type_, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTexturePXType(texture, type_);

let setNXType = (type_, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureNXType(texture, type_);

let setPYType = (type_, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTexturePYType(texture, type_);

let setNYType = (type_, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureNYType(texture, type_);

let setPZType = (type_, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTexturePZType(texture, type_);

let setNZType = (type_, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureNZType(texture, type_);

let getFlipY = CubemapTextureAPI.getCubemapTextureFlipY;

let setFlipY = (filpY, texture, engineState) =>
  engineState |> CubemapTextureAPI.setCubemapTextureFlipY(texture, filpY);

let getIsNeedUpdate = (texture, engineState) =>
  OperateCubemapTextureMainService.getIsNeedUpdate(texture, engineState);

let setIsNeedUpdate = (isNeedUpdate, texture, engineState) =>
  OperateCubemapTextureMainService.setIsNeedUpdate(
    texture,
    isNeedUpdate ?
      BufferTextureService.getNeedUpdate() :
      BufferTextureService.getNotNeedUpdate(),
    engineState,
  );

let initTexture = (texture, engineState) =>
  CubemapTextureAPI.initCubemapTexture(texture, engineState);

let getAllTextures = CubemapTextureAPI.getAllTextures;

let disposeCubemapTexture = CubemapTextureAPI.disposeCubemapTexture;