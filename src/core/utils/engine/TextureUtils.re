open AssetNodeType;

let createAndInitTexture = (textureName, engineState) => {
  let (engineState, texture) =
    engineState |> BasicSourceTextureEngineService.create;

  let engineState =
    engineState
    |> BasicSourceTextureEngineService.setBasicSourceTextureName(
         textureName,
         texture,
       )
    |> BasicSourceTextureEngineService.initTexture(texture);

  (texture, engineState);
};

let createAndSetTextureProps =
    (textureName, (warpS, warpT, minFilter, magFilter), engineState) => {
  let (engineState, texture) =
    engineState |> BasicSourceTextureEngineService.create;

  let engineState =
    engineState
    |> BasicSourceTextureEngineService.setBasicSourceTextureName(
         textureName,
         texture,
       )
    |> BasicSourceTextureEngineService.setWrapS(
         warpS |> TextureTypeUtils.convertIntToWrap,
         texture,
       )
    |> BasicSourceTextureEngineService.setWrapT(
         warpT |> TextureTypeUtils.convertIntToWrap,
         texture,
       )
    |> BasicSourceTextureEngineService.setMinFilter(
         minFilter |> TextureTypeUtils.convertIntToFilter,
         texture,
       )
    |> BasicSourceTextureEngineService.setMagFilter(
         magFilter |> TextureTypeUtils.convertIntToFilter,
         texture,
       )
    |> BasicSourceTextureEngineService.initTexture(texture);

  (texture, engineState);
};