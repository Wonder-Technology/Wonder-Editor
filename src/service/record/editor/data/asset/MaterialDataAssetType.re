type materialType =
  | BasicMaterial
  | LightMaterial;

type materialTuple = (Wonderjs.MaterialType.material, materialType);

type materialData = {
  defaultBasicMaterialData: option(materialTuple),
  defaultLightMaterialData: option(materialTuple),
  defaultMaterialSnapshotPath: string,
};