open MainEditorMaterialType;

open AssetMaterialDataType;

let changeMaterialTypeToBeBasicMaterial = () => {
  let materialType = BasicMaterial |> convertMaterialTypeToInt;

  BaseEventTool.triggerComponentEvent(
    BuildComponentTool.buildMaterial(),
    MainEditorMaterialTool.triggerChangeMaterialTypeEvent(materialType),
  );
};