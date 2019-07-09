open NodeAssetType;

let getDefaultName = () => "NoName Cubemap";

let getName = (~texture, ~engineState) =>
  switch (CubemapTextureEngineService.getCubemapTextureName(texture, engineState)) {
  | None => getDefaultName()
  | Some(name) => name
  };

let setName = (~texture, ~name, ~engineState) =>
  CubemapTextureEngineService.setCubemapTextureName(name, texture, engineState);