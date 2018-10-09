open MainEditorMaterialType;

let getNewMaterilaAssetName = () => "New Material";

let setName = (material, materialType, engineState) => {
  let materialName = getNewMaterilaAssetName();

  switch (materialType) {
  | BasicMaterial =>
    BasicMaterialEngineService.setBasicMaterialName(
      material,
      materialName,
      engineState,
    )
  | LightMaterial =>
    LightMaterialEngineService.setLightMaterialName(
      material,
      materialName,
      engineState,
    )
  };
};