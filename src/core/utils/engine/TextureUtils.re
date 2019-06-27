open NodeAssetType;

let _getFormat = extName =>
  switch (extName) {
  | ".jpg"
  | ".jpeg" => Wonderjs.TextureType.Rgb
  | ".png" => Wonderjs.TextureType.Rgba
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~description={j|unknown extName:$extName|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let createAndInitTexture = (textureName, extName, engineState) => {
  let (engineState, texture) =
    engineState |> BasicSourceTextureEngineService.create;

  let engineState =
    engineState
    |> BasicSourceTextureEngineService.setBasicSourceTextureName(
         textureName,
         texture,
       )
    |> BasicSourceTextureEngineService.setFormat(
         _getFormat(extName),
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