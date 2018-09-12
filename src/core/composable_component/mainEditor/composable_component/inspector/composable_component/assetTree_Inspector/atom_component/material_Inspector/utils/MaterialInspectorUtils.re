open MainEditorMaterialType;

let _removeSpecificMaterial = (material, disposeMaterialFunc, engineState) =>
  engineState |> disposeMaterialFunc([|material|]);

let _removeSourceMaterial = (materialType, materialComponent, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    engineState
    |> _removeSpecificMaterial(
         materialComponent,
         BasicMaterialEngineService.disposeBasicMaterial,
       )
  | LightMaterial =>
    engineState
    |> _removeSpecificMaterial(
         materialComponent,
         LightMaterialEngineService.disposeLightMaterial,
       )
  };

let _getOperateTargetMaterialFunc = (materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    OperateBasicMaterialLogicService.createBasicMaterial(engineState)
  | LightMaterial =>
    OperateLightMaterialLogicService.createLightMaterial(engineState)
  };

let replaceRenderGroupByMaterialType =
    ((nodeId, materialComponent), sourceMateralType, targetMaterialType) => {
  let engineState = StateEngineService.unsafeGetState();
  let editorState = StateEditorService.getState();

  let engineState =
    engineState |> _removeSourceMaterial(sourceMateralType, materialComponent);

  let (newMaterialComponent, engineState) =
    _getOperateTargetMaterialFunc(targetMaterialType, engineState);

  editorState
  |> AssetMaterialNodeMapEditorService.getMaterialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (
    materialResult => {
      ...materialResult,
      type_: targetMaterialType,
      materialComponent: newMaterialComponent,
    }
  )
  |> AssetMaterialNodeMapEditorService.setResult(nodeId, _, editorState)
  |> StateEditorService.setState
  |> ignore;

  StateLogicService.refreshEngineState(engineState);
};