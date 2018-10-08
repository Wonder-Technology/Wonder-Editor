open EditorType;

open AssetNodeType;

let getMaterialBaseName = (nodeId, engineState, materialNodeMap) => {
  let {type_, materialComponent} =
    materialNodeMap |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  switch (type_) {
  | BasicMaterial =>
    BasicMaterialEngineService.unsafeGetBasicMaterialName(
      materialComponent,
      engineState,
    )
  | LightMaterial =>
    LightMaterialEngineService.unsafeGetLightMaterialName(
      materialComponent,
      engineState,
    )
  };
};

let setMaterialBaseName = (nodeId, name, materialNodeMap, engineState) => {
  let {type_, materialComponent} =
    materialNodeMap |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  switch (type_) {
  | BasicMaterial =>
    BasicMaterialEngineService.setBasicMaterialName(
      materialComponent,
      name,
      engineState,
    )
  | LightMaterial =>
    LightMaterialEngineService.setLightMaterialName(
      materialComponent,
      name,
      engineState,
    )
  };
};

let getMaterialTotalName = (nodeId, engineState, materialNodeMap) =>
  materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (
    ({postfix}: materialResultType) =>
      getMaterialBaseName(nodeId, engineState, materialNodeMap) ++ postfix
  );