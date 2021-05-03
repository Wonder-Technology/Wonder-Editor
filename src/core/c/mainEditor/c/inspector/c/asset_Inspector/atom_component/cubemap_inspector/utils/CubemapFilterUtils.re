let _changeFilter = (cubemapTexture, value, setFilterFunc) => {
  let engineState = StateEngineService.unsafeGetState();

  engineState
  |> setFilterFunc(
       value |> TextureTypeUtils.convertIntToFilter,
       cubemapTexture,
     )
  |> CubemapTextureEngineService.setIsNeedUpdate(true, cubemapTexture)
  |> StateLogicService.refreshEngineState;
};

let changeMagFilter = (cubemapTexture, value) =>
  _changeFilter(
    cubemapTexture,
    value,
    CubemapTextureEngineService.setMagFilter,
  );

let changeMinFilter = (cubemapTexture, value) =>
  _changeFilter(
    cubemapTexture,
    value,
    CubemapTextureEngineService.setMinFilter,
  );