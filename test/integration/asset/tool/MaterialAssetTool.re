let getMaterialComponent = (~nodeId, ~editorState = StateEditorService.getState(), () ) => {
  let {materialComponent}: AssetNodeType.materialResultType =
    StateEditorService.getState()
    |> AssetMaterialNodeMapEditorService.unsafeGetResult(nodeId);

  materialComponent;
};