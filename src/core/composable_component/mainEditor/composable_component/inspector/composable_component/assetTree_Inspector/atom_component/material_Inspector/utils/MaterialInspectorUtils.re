open MainEditorMaterialType;

let _removeSpecificMaterial =
    (
      (diffType, runMaterial),
      disposeMaterialFunc,
      (editEngineState, runEngineState),
    ) => {
  let editMaterial =
    StateLogicService.getEditEngineComponent(diffType, runMaterial);

  (
    editEngineState |> disposeMaterialFunc([|editMaterial|]),
    runEngineState |> disposeMaterialFunc([|runMaterial|]),
  );
};

let _removeSourceMaterial =
    (materialType, materialComponent, (editEngineState, runEngineState)) =>
  switch (materialType) {
  | BasicMaterial =>
    (editEngineState, runEngineState)
    |> _removeSpecificMaterial(
         (DiffType.BasicMaterial, materialComponent),
         BasicMaterialEngineService.disposeBasicMaterial,
       )
  | LightMaterial =>
    (editEngineState, runEngineState)
    |> _removeSpecificMaterial(
         (DiffType.LightMaterial, materialComponent),
         LightMaterialEngineService.disposeLightMaterial,
       )
  };

let _getOperateTargetMaterialFunc =
    (materialType, editEngineState, runEngineState) =>
  switch (materialType) {
  | BasicMaterial =>
    OperateBasicMaterialLogicService.createBasicMaterial(
      editEngineState,
      runEngineState,
    )
  | LightMaterial =>
    OperateLightMaterialLogicService.createLightMaterial(
      editEngineState,
      runEngineState,
    )
  };

let replaceRenderGroupByMaterialType =
    ((nodeId, materialComponent), sourceMateralType, targetMaterialType) => {
  let editEngineState = StateLogicService.getEditEngineState();
  let runEngineState = StateLogicService.getRunEngineState();
  let editorState = StateEditorService.getState();

  let (editEngineState, runEngineState) =
    (editEngineState, runEngineState)
    |> _removeSourceMaterial(sourceMateralType, materialComponent);

  let (newMaterialComponent, editEngineState, runEngineState) =
    _getOperateTargetMaterialFunc(
      targetMaterialType,
      editEngineState,
      runEngineState,
    );

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

  StateLogicService.refreshEditAndRunEngineState(
    editEngineState,
    runEngineState,
  );
};