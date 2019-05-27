let cloneBasicMaterialToOtherEngineState =
    (clonedMaterialComponent, clonedEngineState, targetEngineState) => {
  let (targetEngineState, basicMaterial) =
    BasicMaterialEngineService.create(targetEngineState);

  let targetEngineState =
    targetEngineState
    |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
         BasicMaterialEngineService.getColor,
         BasicMaterialEngineService.setColor,
         basicMaterial,
         (clonedMaterialComponent, clonedEngineState),
       )
    |> CloneValueEngineLogicService.cloneValueByGetOptionValueFunc(
         BasicMaterialEngineService.getBasicMaterialName,
         BasicMaterialEngineService.setBasicMaterialName,
         basicMaterial,
         (clonedMaterialComponent, clonedEngineState),
       );

  (basicMaterial, targetEngineState);
};

let cloneLightMaterialToOtherEngineState =
    (
      clonedMaterialComponent,
      editorState,
      clonedEngineState,
      targetEngineState,
    ) => {
  let (targetEngineState, lightMaterial) =
    LightMaterialEngineService.create(targetEngineState);

  let targetEngineState =
    targetEngineState
    |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
         LightMaterialEngineService.getLightMaterialDiffuseColor,
         LightMaterialEngineService.setLightMaterialDiffuseColor,
         lightMaterial,
         (clonedMaterialComponent, clonedEngineState),
       )
    |> CloneValueEngineLogicService.cloneValueByGetOptionValueFunc(
         LightMaterialEngineService.getLightMaterialName,
         LightMaterialEngineService.setLightMaterialName,
         lightMaterial,
         (clonedMaterialComponent, clonedEngineState),
       )
    |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
         LightMaterialEngineService.getLightMaterialShininess,
         LightMaterialEngineService.setLightMaterialShininess,
         lightMaterial,
         (clonedMaterialComponent, clonedEngineState),
       );

  let (editorState, targetEngineState) =
    switch (
      clonedEngineState
      |> LightMaterialEngineService.getLightMaterialDiffuseMap(
           clonedMaterialComponent,
         )
    ) {
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
            CloneTextureEngineLogicService.cloneTextureToOtherEngineState(
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
        |> LightMaterialEngineService.setLightMaterialDiffuseMap(
             targetTexture,
             lightMaterial,
           ),
      );
    };

  (lightMaterial, editorState, targetEngineState);
};