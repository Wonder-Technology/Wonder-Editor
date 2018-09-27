open MainEditorMaterialType;

let changeMaterialTypeToBeBasicMaterial = () => {
  let materialType = BasicMaterial |> convertMaterialTypeToInt;

  BaseEventTool.triggerComponentEvent(
    BuildComponentTool.buildMaterial(),
    MainEditorMaterialTool.triggerChangeMaterialTypeEvent(materialType),
  );
};