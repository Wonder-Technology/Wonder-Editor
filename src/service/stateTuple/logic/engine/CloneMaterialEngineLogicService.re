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
    CloneTextureEngineLogicService.cloneTextureAndAddToMaterial(
      (clonedMaterialComponent, lightMaterial),
      (
        LightMaterialEngineService.getLightMaterialDiffuseMap,
        LightMaterialEngineService.setLightMaterialDiffuseMap,
      ),
      editorState,
      clonedEngineState,
      targetEngineState,
    );

  (lightMaterial, editorState, targetEngineState);
};