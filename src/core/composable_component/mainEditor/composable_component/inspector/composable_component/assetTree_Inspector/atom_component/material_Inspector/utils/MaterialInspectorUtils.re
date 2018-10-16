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
           (. engineState, gameObject) => {
             let meshRenderer =
               GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                 gameObject,
                 engineState,
               );

             let (sourceRenderGroup, disposeSourceMaterialFunc) =
               _getOperateSourceRenderGroupData(
                 meshRenderer,
                 sourceMaterial,
                 sourceMaterialType,
                 engineState,
               );

             let (engineState, targetRenderGroup, addTargetMaterialFunc) =
               _getOperateTargetRenderGroupData(
                 meshRenderer,
                 targetMaterial,
                 targetMaterialType,
                 engineState,
               );

             engineState
             |> RenderGroupEngineService.replaceMaterial(
                  (sourceRenderGroup, targetRenderGroup),
                  gameObject,
                  (disposeSourceMaterialFunc, addTargetMaterialFunc),
                );
           },
           engineState,
         );

    engineState;
  };

let replaceMaterialByMaterialType =
    ((nodeId, materialComponent), sourceMaterialType, targetMaterialType) => {
  let engineState = StateEngineService.unsafeGetState();
  let editorState = StateEditorService.getState();

  let gameObjects =
    MainEditorMaterialUtils.getGameObjectsByType(
      materialComponent,
      sourceMaterialType,
      engineState,
    );

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
    _replaceMaterial(
      gameObjects,
      (materialComponent, targetMaterial),
      (sourceMaterialType, targetMaterialType),
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