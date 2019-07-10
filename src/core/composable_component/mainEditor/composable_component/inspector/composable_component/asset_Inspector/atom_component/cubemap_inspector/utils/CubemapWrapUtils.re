let _changeWrap = (cubemapTexture, value, setWrapFunc) => {
  let engineState = StateEngineService.unsafeGetState();

  engineState
  |> setWrapFunc(
       value |> TextureTypeUtils.convertIntToWrap,
       cubemapTexture,
     )
  |> BasicSourceTextureEngineService.setIsNeedUpdate(true, cubemapTexture)
  |> StateLogicService.refreshEngineState;
};

let changeWrapS = (cubemapTexture, value) =>
  _changeWrap(cubemapTexture, value, CubemapTextureEngineService.setWrapS);

let changeWrapT = (cubemapTexture, value) =>
  _changeWrap(cubemapTexture, value, CubemapTextureEngineService.setWrapT);