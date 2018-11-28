let isDefaultBasicMaterial = (material, defaultMaterialName, engineState) =>
  engineState
  |>
  BasicMaterialEngineService.getBasicMaterialName(material) === defaultMaterialName;

let isDefaultLightMaterial = (material, defaultMaterialName, engineState) =>
  engineState
  |>
  LightMaterialEngineService.getLightMaterialName(material) === defaultMaterialName;