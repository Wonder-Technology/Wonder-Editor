let updateMaterialNodeData =
    (materialNodeId, targetMaterial, targetMaterialType, editorState) => {
  let materialNodeResult =
    MaterialNodeMapAssetEditorService.unsafeGetResult(
      materialNodeId,
      editorState,
    );

  editorState
  |> MaterialNodeMapAssetEditorService.setResult(
       materialNodeId,
       {
         ...materialNodeResult,
         materialComponent: targetMaterial,
         type_: targetMaterialType,
       },
     )
  |> MaterialNodeIdMapAssetEditorService.setNodeId(
       targetMaterial,
       materialNodeId,
     );
};