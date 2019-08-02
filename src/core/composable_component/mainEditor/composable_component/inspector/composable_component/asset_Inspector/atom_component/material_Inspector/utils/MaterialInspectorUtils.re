open MaterialDataAssetType;

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
    InspectorRenderGroupUtils.Dispose.disposeMaterialOrReplaceGameObjectsMaterialsOfTheMaterial(
      (
        (sourceMaterial, targetMaterial),
        (sourceMaterialType, targetMaterialType),
      ),
      engineState,
    );

  let editorState =
    MaterialNodeAssetEditorService.updateMaterialNodeData(
      nodeId,
      targetMaterial,
      targetMaterialType,
      editorState,
    );

  let engineState =
    OperateMaterialLogicService.setName(
      ~material=targetMaterial,
      ~type_=targetMaterialType,
      ~name=
        NodeNameAssetLogicService.getMaterialNodeName(
          ~material=sourceMaterial,
          ~type_=sourceMaterialType,
          ~engineState,
        ),
      ~engineState,
    );

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateLogicService.refreshEngineState;
};