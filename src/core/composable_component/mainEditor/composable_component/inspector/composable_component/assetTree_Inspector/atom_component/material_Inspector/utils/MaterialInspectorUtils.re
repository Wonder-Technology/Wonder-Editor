open AssetMaterialDataType;

let _getOperateSourceRenderGroupData =
    (meshRenderer, material, materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial => (
      RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
      GameObjectComponentEngineService.disposeBasicMaterialComponent,
    )
  | LightMaterial => (
      RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
      GameObjectComponentEngineService.disposeLightMaterialComponent,
    )
  };

let _getOperateTargetRenderGroupData =
    (meshRenderer, material, materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial => (
      engineState,
      RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
      GameObjectComponentEngineService.addBasicMaterialComponent,
    )
  | LightMaterial => (
      engineState,
      RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
      GameObjectComponentEngineService.addLightMaterialComponent,
    )
  };

let _replaceMaterial =
    (
      gameObjects,
      (sourceMaterial, targetMaterial),
      (sourceMaterialType, targetMaterialType),
      engineState,
    ) =>
  switch (gameObjects) {
  | None => engineState

  | Some(gameObjects) =>
    let engineState =
      gameObjects
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. engineState, gameObject) =>
             InspectorRenderGroupUtils.Dispose.replaceMaterial(
               gameObject,
               (
                 (sourceMaterial, targetMaterial),
                 (sourceMaterialType, targetMaterialType),
               ),
               engineState,
             ),
           engineState,
         );

    engineState;
  };

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
    MainEditorMaterialUtils.setName(
      targetMaterial,
      targetMaterialType,
      MainEditorMaterialUtils.getNewMaterilaAssetName(),
      engineState,
    );

  let engineState =
    InspectorRenderGroupUtils.Dispose.replaceGameObjectsMaterialsOfTheMaterial(
      (
        (sourceMaterial, targetMaterial),
        (sourceMaterialType, targetMaterialType),
      ),
      engineState,
    );

  engineState |> StateLogicService.refreshEngineState;

  AssetMaterialUpdateNodeEditorService.updateMaterialNodeData(
    nodeId,
    targetMaterial,
    targetMaterialType,
  )
  |> StateLogicService.getAndSetEditorState;
};