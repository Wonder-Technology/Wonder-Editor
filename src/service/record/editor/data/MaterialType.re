type materialType =
  | BasicMaterial
  | LightMaterial;

type materialData = (Wonderjs.MaterialType.material, materialType);

type materialRecord = {
  defaultBasicMaterialData: option(materialData),
  defaultLightMaterialData: option(materialData),
};