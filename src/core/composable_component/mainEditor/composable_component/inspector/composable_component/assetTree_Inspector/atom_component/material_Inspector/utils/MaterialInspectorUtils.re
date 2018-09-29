open MainEditorMaterialType;

let _removeSpecificMaterial =
    (gameObject, material, removeMaterialFunc, engineState) =>
  engineState |> removeMaterialFunc(gameObject, material);

let _removeSourceMaterial =
    (gameObject, materialType, materialComponent, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    engineState
    |> _removeSpecificMaterial(
         gameObject,
         materialComponent,
         GameObjectComponentEngineService.removeBasicMaterialComponent,
       )
  | LightMaterial =>
    engineState
    |> _removeSpecificMaterial(
         gameObject,
         materialComponent,
         GameObjectComponentEngineService.removeLightMaterialComponent,
       )
  };

let _getOperateTargetMaterialFunc = (materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    OperateBasicMaterialLogicService.createBasicMaterial(engineState)
  | LightMaterial =>
    OperateLightMaterialLogicService.createLightMaterialAndSetName(engineState)
  };

let replaceRenderGroupByMaterialType =
    (
      (nodeId, gameObject, materialComponent),
      sourceMateralType,
      targetMaterialType,
    ) => {
  let engineState = StateEngineService.unsafeGetState();
  let editorState = StateEditorService.getState();

  let engineState =
    engineState
    |> _removeSourceMaterial(gameObject, sourceMateralType, materialComponent);

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