let cloneTextureToOtherEngine =
    (clonedTexture, clonedEngineState, targetEngineState) => {
  let (targetEngineState, texture) =
    targetEngineState |> BasicSourceTextureEngineService.create;

  targetEngineState
  |> CloneValueEngineLogicService.cloneValueByGetOptionValueFunc(
       BasicSourceTextureEngineService.getBasicSourceTextureName,
       BasicSourceTextureEngineService.setBasicSourceTextureName,
       texture,
       (clonedTexture, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       BasicSourceTextureEngineService.unsafeGetSource,
       BasicSourceTextureEngineService.setSource,
       texture,
       (clonedTexture, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       BasicSourceTextureEngineService.getWrapS,
       BasicSourceTextureEngineService.setWrapS,
       texture,
       (clonedTexture, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       BasicSourceTextureEngineService.getWrapT,
       BasicSourceTextureEngineService.setWrapT,
       texture,
       (clonedTexture, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       BasicSourceTextureEngineService.getMagFilter,
       BasicSourceTextureEngineService.setMagFilter,
       texture,
       (clonedTexture, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       BasicSourceTextureEngineService.getMinFilter,
       BasicSourceTextureEngineService.setMinFilter,
       texture,
       (clonedTexture, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       BasicSourceTextureEngineService.getFormat,
       BasicSourceTextureEngineService.setFormat,
       texture,
       (clonedTexture, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       BasicSourceTextureEngineService.getType,
       BasicSourceTextureEngineService.setType,
       texture,
       (clonedTexture, clonedEngineState),
     )
  |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
       BasicSourceTextureEngineService.getFlipY,
       BasicSourceTextureEngineService.setFlipY,
       texture,
       (clonedTexture, clonedEngineState),
     );

  (texture, targetEngineState);
};