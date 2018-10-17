open EditorType;

let getNodeId = (materialComponent, editorState) =>
  editorState.assetRecord.materialNodeIdMap
  |> WonderCommonlib.SparseMapService.get(materialComponent);

let setNodeId = (materialComponent, nodeId, editorState) => {
  ...editorState,
  assetRecord: {
    ...editorState.assetRecord,
    materialNodeIdMap:
      editorState.assetRecord.materialNodeIdMap
      |> WonderCommonlib.SparseMapService.set(materialComponent, nodeId),
  },
};

let remove = (materialComponent, editorState) => {
  ...editorState,
  assetRecord: {
    ...editorState.assetRecord,
    materialNodeIdMap:
      editorState.assetRecord.materialNodeIdMap
      |> Obj.magic
      |> WonderCommonlib.SparseMapService.deleteVal(materialComponent)
      |> Obj.magic,
  },
};