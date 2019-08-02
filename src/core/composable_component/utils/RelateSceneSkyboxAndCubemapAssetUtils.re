let _isCubemapNameEqual = (name1, cubemap2, engineState) =>
  RelateGameObjectAndAssetUtils.isNameEqual(
    name1,
    cubemap2,
    (
      CubemapTextureEngineService.getCubemapTextureName,
      ConverterEngineService.isDefaultCubemapTextureName,
    ),
    engineState,
  );

let isCubemapDataEqual = (cubemap1Data, cubemap2, engineState) => {
  let cubemap1Name = cubemap1Data;

  _isCubemapNameEqual(cubemap1Name, cubemap2, engineState);
};

let getCubemapData = (cubemap, engineState) =>
  CubemapTextureEngineService.getCubemapTextureName(cubemap, engineState);