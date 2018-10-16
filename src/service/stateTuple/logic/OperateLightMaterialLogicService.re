let getMaterialDefaultName = () => "NewMaterial";

let createLightMaterialAndSetName = (materialName, engineState) => {
  let (engineState, material) =
    engineState |> LightMaterialEngineService.create;

  (
    material,
    engineState
    |> LightMaterialEngineService.setLightMaterialName(material, materialName),
  );
};

let disposeLightMaterial = (gameObject, material, engineState) =>
  GameObjectComponentEngineService.disposeLightMaterialComponent(
    gameObject,
    material,
    engineState,
  );

let addLightMaterial = (gameObject, material, engineState) =>
  GameObjectComponentEngineService.addLightMaterialComponent(
    gameObject,
    material,
    engineState,
  );

let setLightMaterialColor = (color, material, engineState) =>
  LightMaterialEngineService.setLightMaterialDiffuseColor(
    color,
    material,
    engineState,
  );

/* let setLightMaterialMapToEngineState = (mapId, newMaterial, engineState) =>
   LightMaterialEngineService.setLightMaterialDiffuseMap(
     mapId,
     newMaterial,
     engineState,
   ); */