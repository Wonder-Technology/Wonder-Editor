open AssetNodeType;

let getMaterialBaseName = (currentNodeId, materialNodeMap) => {
  let {type_, materialComponent} =
    materialNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId);

  MainEditorMaterialUtils.getMaterialNameByMaterialType(
    type_,
    materialComponent,
  )
  |> StateLogicService.getEngineStateToGetData;
};

let renameMaterialToEngine = (currentNodeId, newName, materialNodeMap) => {
  let {type_, materialComponent} =
    materialNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId);

  MainEditorMaterialUtils.renameMaterialByMaterialType(
    newName,
    type_,
    materialComponent,
  )
  |> StateLogicService.getAndSetEngineState;
};