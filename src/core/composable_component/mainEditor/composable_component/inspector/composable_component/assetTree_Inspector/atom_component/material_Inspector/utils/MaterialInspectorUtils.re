open MaterialType;

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

/* TODO test dispose instead of remove */
let _disposeSourceMaterialIfHasGameObjects =
    (gameObjects, materialComponent, sourceMaterialType, engineState) =>
  switch (sourceMaterialType) {
  | BasicMaterial =>
    switch (gameObjects) {
    | None => engineState
    | Some(gameObjects) =>
      gameObjects
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. engineState, gameObject) =>
             GameObjectComponentEngineService.disposeBasicMaterialComponent(
               gameObject,
               materialComponent,
               engineState,
             ),
           engineState,
         )
    }
  | LightMaterial =>
    switch (gameObjects) {
    | None => engineState
    | Some(gameObjects) =>
      gameObjects
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. engineState, gameObject) =>
             GameObjectComponentEngineService.disposeLightMaterialComponent(
               gameObject,
               materialComponent,
               engineState,
             ),
           engineState,
         )
    }
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

    engineState |> StateLogicService.refreshEngineState;
    engineState;
  };

let replaceMaterialByMaterialType =
    ((nodeId, materialComponent), sourceMaterialType, targetMaterialType) => {
  let engineState = StateEngineService.unsafeGetState();
  let editorState = StateEditorService.getState();

  let gameObjects =
    switch (sourceMaterialType) {
    | BasicMaterial =>
      BasicMaterialEngineService.getBasicMaterialGameObjects(
        materialComponent,
        engineState,
      )
    | LightMaterial =>
      LightMaterialEngineService.getLightMaterialGameObjects(
        materialComponent,
        engineState,
      )
    };

  let engineState =
    _disposeSourceMaterialIfHasGameObjects(
      gameObjects,
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

  engineState |> StateEngineService.setState |> ignore;

  editorState
  |> AssetMaterialNodeMapEditorService.getMaterialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (
    materialResult => {
      ...materialResult,
      type_: targetMaterialType,
      materialComponent: targetMaterial,
    }
  )
  |> AssetMaterialNodeMapEditorService.setResult(nodeId, _, editorState)
  |> StateEditorService.setState
  |> ignore;
};