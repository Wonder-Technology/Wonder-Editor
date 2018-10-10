open MainEditorMaterialType;

open MaterialType;

let changeMaterialTypeToBeBasicMaterial = () => {
  let materialType = BasicMaterial |> convertMaterialTypeToInt;

  BaseEventTool.triggerComponentEvent(
    BuildComponentTool.buildMaterial(),
    MainEditorMaterialTool.triggerChangeMaterialTypeEvent(materialType),
  );
};