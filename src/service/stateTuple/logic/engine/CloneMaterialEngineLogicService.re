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
    (clonedMaterialComponent, clonedEngineState, targetEngineState) => {
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

  let targetEngineState =
    switch (
      clonedEngineState
      |> LightMaterialEngineService.getLightMaterialDiffuseMap(
           clonedMaterialComponent,
         )
    ) {
    | None => targetEngineState
    | Some(map) =>
      let (targetTexture, targetEngineState) =
        CloneTextureEngineLogicService.cloneTextureToOtherEngineState(
          map,
          clonedEngineState,
          targetEngineState,
        );

      targetEngineState
      |> LightMaterialEngineService.setLightMaterialDiffuseMap(
           targetTexture,
           lightMaterial,
         );
    };

  (lightMaterial, targetEngineState);
};