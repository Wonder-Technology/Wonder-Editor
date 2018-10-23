let updateMaterialNodeData =
    (materialNodeId, targetMaterial, targetMaterialType, editorState) => {
  let materialNodeResult =
    AssetMaterialNodeMapEditorService.unsafeGetResult(
      materialNodeId,
      editorState,
    );

  editorState
  |> AssetMaterialNodeMapEditorService.setResult(
       materialNodeId,
       {
         ...materialNodeResult,
         materialComponent: targetMaterial,
         type_: targetMaterialType,
       },
     )
  |> AssetMaterialNodeIdMapEditorService.setNodeId(
       targetMaterial,
       materialNodeId,
     );
};