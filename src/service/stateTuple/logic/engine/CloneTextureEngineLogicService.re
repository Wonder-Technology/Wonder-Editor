let cloneTextureToOtherEngineState =
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

let cloneTextureAndAddToMaterial =
    (
      (clonedMaterialComponent, targetMaterialComponent),
      (getMaterialMapFunc, setMaterialMapFunc),
      editorState,
      clonedEngineState,
      targetEngineState,
    ) =>
  switch (clonedEngineState |> getMaterialMapFunc(clonedMaterialComponent)) {
  | None => (editorState, targetEngineState)
  | Some(map) =>
    let (targetTexture, editorState, targetEngineState) =
      switch (
        SourceTextureCacheInspectorCanvasLogicService.getCache(
          map,
          (editorState, clonedEngineState),
        )
      ) {
      | Some(targetTexture) => (
          targetTexture,
          editorState,
          targetEngineState,
        )
      | None =>
        let (targetTexture, targetEngineState) =
          cloneTextureToOtherEngineState(
            map,
            clonedEngineState,
            targetEngineState,
          );

        let editorState =
          SourceTextureCacheInspectorCanvasLogicService.addCache(
            map,
            targetTexture,
            targetEngineState,
            editorState,
          );

        (targetTexture, editorState, targetEngineState);
      };

    (
      editorState,
      targetEngineState
      |> setMaterialMapFunc(targetTexture, targetMaterialComponent),
    );
  };