open EditorType;

open AssetNodeType;

let getMaterialBaseName = (nodeId, engineState, materialNodeMap) => {
  let {type_, materialComponent} =
    materialNodeMap |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  MainEditorMaterialUtils.getName(materialComponent, type_, engineState);
};

let setMaterialBaseName = (nodeId, name, materialNodeMap, engineState) => {
  let {type_, materialComponent} =
    materialNodeMap |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  MainEditorMaterialUtils.setName(
    materialComponent,
    type_,
    name,
    engineState,
  );
};