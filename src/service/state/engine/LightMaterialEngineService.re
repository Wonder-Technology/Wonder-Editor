open Wonderjs;

let create = LightMaterialAPI.createLightMaterial;

let unsafeGetLightMaterialGameObjects = LightMaterialAPI.unsafeGetLightMaterialGameObjects;

let getLightMaterialGameObjects = (material, engineState) =>
  GameObjectLightMaterialService.getGameObjects(
    material,
    RecordLightMaterialMainService.getRecord(engineState),
  );

let unsafeGetLightMaterialName = LightMaterialAPI.unsafeGetLightMaterialName;

let setLightMaterialName = LightMaterialAPI.setLightMaterialName;

let getLightMaterialDiffuseColor = LightMaterialAPI.getLightMaterialDiffuseColor;

let setLightMaterialDiffuseColor = (color, material, engineState) =>
  engineState
  |> LightMaterialAPI.setLightMaterialDiffuseColor(material, color);

let getLightMaterialShininess = LightMaterialAPI.getLightMaterialShininess;

let setLightMaterialShininess = (shininess, material, engineState) =>
  LightMaterialAPI.setLightMaterialShininess(
    material,
    shininess,
    engineState,
  );

let unsafeGetLightMaterialDiffuseMap = LightMaterialAPI.unsafeGetLightMaterialDiffuseMap;

let getLightMaterialDiffuseMap = ManageMapLightMaterialMainService.getDiffuseMap;

let setLightMaterialDiffuseMap = (map, material, engineState) =>
  engineState |> LightMaterialAPI.setLightMaterialDiffuseMap(material, map);

let hasLightMaterialDiffuseMap = LightMaterialAPI.hasLightMaterialDiffuseMap;

let removeLightMaterialDiffuseMap = LightMaterialAPI.removeLightMaterialDiffuseMap;

let unsafeGetLightMaterialName = LightMaterialAPI.unsafeGetLightMaterialName;

let setLightMaterialName = LightMaterialAPI.setLightMaterialName;

let hasLightMaterialSpecularMap = LightMaterialAPI.hasLightMaterialSpecularMap;

let isLightMaterialMap = (material, texture, engineState) =>
  switch (getLightMaterialDiffuseMap(material, engineState)) {
  | Some(map) when map === texture => true
  | _ => false
  };

let removeLightMaterialSpecularMap = LightMaterialAPI.removeLightMaterialSpecularMap;

/* let getLightMaterialSpecularColor = LightMaterialAPI.getLightMaterialSpecularColor;

   let setLightMaterialSpecularColor = LightMaterialAPI.setLightMaterialSpecularColor; */

let _reInitMaterials = LightMaterialAPI.reInitMaterials;

let reInitAllLightMaterialsAndClearShaderCache = (materials, engineState) =>
  engineState
  |> _reInitMaterials(materials)
  |> ShaderEngineService.clearShaderCache;

let getAllLightMaterials = LightMaterialAPI.getAllLightMaterials;