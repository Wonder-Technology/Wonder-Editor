open AssetMaterialDataType;

let replaceMaterialByMaterialType =
    ((nodeId, sourceMaterial), sourceMaterialType, targetMaterialType) => {
  let engineState = StateEngineService.unsafeGetState();
  let editorState = StateEditorService.getState();

  let (engineState, targetMaterial) =
    switch (targetMaterialType) {
    | BasicMaterial => BasicMaterialEngineService.create(engineState)
    | LightMaterial => LightMaterialEngineService.create(engineState)
    };

  let engineState =
    InspectorRenderGroupUtils.Dispose.replaceGameObjectsMaterialsOfTheMaterial(
      (
        (sourceMaterial, targetMaterial),
        (sourceMaterialType, targetMaterialType),
      ),
      engineState,
    );

  let editorState =
    MaterialUpdateNodeAssetEditorService.updateMaterialNodeData(
      nodeId,
      targetMaterial,
      targetMaterialType,
      editorState,
    );

  let engineState =
    MainEditorMaterialUtils.setName(
      targetMaterial,
      targetMaterialType,
      MainEditorMaterialUtils.getName(
        sourceMaterial,
        sourceMaterialType,
        engineState,
      ),
      engineState,
    );

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateLogicService.refreshEngineState;
};