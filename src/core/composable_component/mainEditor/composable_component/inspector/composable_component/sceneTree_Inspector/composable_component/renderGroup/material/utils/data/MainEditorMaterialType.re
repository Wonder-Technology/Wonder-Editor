type materialType =
  | BasicMaterial
  | LightMaterial;

external convertMaterialTypeToInt : materialType => int = "%identity";

external convertIntToMaterialType : int => materialType = "%identity";