open Wonderjs;

let create = BasicSourceTextureAPI.createBasicSourceTexture;

let unsafeGetSource = BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource;

let setSource = (source, texture, engineState) =>
  engineState
  |> BasicSourceTextureAPI.setBasicSourceTextureSource(texture, source);

let getBasicSourceTextureName = NameBasicSourceTextureMainService.getName;

let unsafeGetBasicSourceTextureName = BasicSourceTextureAPI.unsafeGetBasicSourceTextureName;

let setBasicSourceTextureName = (name, texture, engineState) =>
  BasicSourceTextureAPI.setBasicSourceTextureName(texture, name, engineState);

let getWidth = BasicSourceTextureAPI.getBasicSourceTextureWidth;

let getHeight = BasicSourceTextureAPI.getBasicSourceTextureHeight;

let getWrapS = BasicSourceTextureAPI.getBasicSourceTextureWrapS;

let setWrapS = (wrapS, texture, engineState) =>
  engineState
  |> BasicSourceTextureAPI.setBasicSourceTextureWrapS(texture, wrapS);

let getWrapT = BasicSourceTextureAPI.getBasicSourceTextureWrapT;

let setWrapT = (wrapT, texture, engineTtate) =>
  engineTtate
  |> BasicSourceTextureAPI.setBasicSourceTextureWrapT(texture, wrapT);

let getMagFilter = BasicSourceTextureAPI.getBasicSourceTextureMagFilter;

let setMagFilter = (filter, texture, engineState) =>
  engineState
  |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(texture, filter);

let getMinFilter = BasicSourceTextureAPI.getBasicSourceTextureMinFilter;

let setMinFilter = (filter, texture, engineState) =>
  engineState
  |> BasicSourceTextureAPI.setBasicSourceTextureMinFilter(texture, filter);

let getFormat = BasicSourceTextureAPI.getBasicSourceTextureFormat;

let setFormat = (format, texture, engineState) =>
  engineState
  |> BasicSourceTextureAPI.setBasicSourceTextureFormat(texture, format);

let getType = BasicSourceTextureAPI.getBasicSourceTextureType;

let setType = (type_, texture, engineState) =>
  engineState
  |> BasicSourceTextureAPI.setBasicSourceTextureType(texture, type_);

let initTexture = (texture, state) =>
  InitSourceTextureMainService.initTexture(texture |. Some, state);