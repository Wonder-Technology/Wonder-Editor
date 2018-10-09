open MainEditorMaterialType;

open Wonderjs;

open RenderGroupType;

let _getMaterialHandleFuncByType = materialType =>
  switch (materialType) {
  | BasicMaterial => (
      GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
      GameObjectComponentEngineService.removeBasicMaterialComponent,
    )

  | LightMaterial => (
      GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
      GameObjectComponentEngineService.removeLightMaterialComponent,
    )
  };

let disposeRenderGroup = (gameObject, materialType, engineState) => {
  let (getMaterialFunc, removeMaterialFunc) =
    _getMaterialHandleFuncByType(materialType);

  engineState
  |> RenderGroupEngineService.disposeRenderGroupComponents(
       gameObject,
       RenderGroupEngineService.getRenderGroupComponents(
         gameObject,
         (
           GameObjectComponentEngineService.unsafeGetMeshRendererComponent,
           getMaterialFunc,
         ),
         engineState,
       ),
       (
         GameObjectComponentEngineService.disposeMeshRendererComponent,
         removeMaterialFunc,
       ),
     );
};

let hasRenderGroupComponents = (gameObject, engineState) =>
  engineState
  |> RenderGroupEngineService.hasRenderGroupComponents(
       gameObject,
       (
         GameObjectComponentEngineService.hasMeshRendererComponent,
         GameObjectComponentEngineService.hasBasicMaterialComponent,
       ),
     )
  || engineState
  |> RenderGroupEngineService.hasRenderGroupComponents(
       gameObject,
       (
         GameObjectComponentEngineService.hasMeshRendererComponent,
         GameObjectComponentEngineService.hasLightMaterialComponent,
       ),
     );

let _getOperateSourceRenderGroupFunc =
    (materialType, gameObject, meshRenderer, engineStateToGetData) =>
  switch (materialType) {
  | BasicMaterial => (
      engineStateToGetData
      |> RenderGroupEngineService.getRenderGroupComponents(
           gameObject,
           (
             GameObjectComponentEngineService.unsafeGetMeshRendererComponent,
             GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
           ),
         ),
      GameObjectComponentEngineService.removeBasicMaterialComponent,
    )
  | LightMaterial => (
      engineStateToGetData
      |> RenderGroupEngineService.getRenderGroupComponents(
           gameObject,
           (
             GameObjectComponentEngineService.unsafeGetMeshRendererComponent,
             GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
           ),
         ),
      GameObjectComponentEngineService.removeLightMaterialComponent,
    )
  };

let _getOperateTargetRenderGroupFunc =
    (meshRenderer, materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    let (engineState, material) =
      BasicMaterialEngineService.create(engineState);

    (
      engineState,
      RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
      GameObjectComponentEngineService.addBasicMaterialComponent,
    );
  | LightMaterial =>
    let (engineState, material) =
      LightMaterialEngineService.create(engineState);

    (
      engineState,
      RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
      GameObjectComponentEngineService.addLightMaterialComponent,
    );
  };

let _replaceMaterial =
    (
      (removeSourceMaterialFunc, addTargetMaterialFunc),
      sourceMeshRenderer,
      sourceMaterial,
      targetMeshRenderer,
      targetMaterial,
      gameObject,
      state,
    ) =>
  RenderGroupEngineService.replaceMaterial(
    (
      {meshRenderer: sourceMeshRenderer, material: sourceMaterial},
      {meshRenderer: targetMeshRenderer, material: targetMaterial},
    ),
    gameObject,
    (removeSourceMaterialFunc, addTargetMaterialFunc),
    state,
  );

let replaceMaterialByMaterialType = (sourceMateralType, targetMaterialType) => {
  let gameObject =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  let engineState = StateEngineService.unsafeGetState();

  let meshRenderer =
    GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
      gameObject,
      engineState,
    );

  let (sourceRenderGroup, removeSourceMaterialFunc) =
    _getOperateSourceRenderGroupFunc(
      sourceMateralType,
      gameObject,
      meshRenderer,
      engineState,
    );

  let (engineState, targetRenderGroup, addTargetMaterialFunc) =
    _getOperateTargetRenderGroupFunc(
      meshRenderer,
      targetMaterialType,
      engineState,
    );

  let engineState =
    engineState
    |> _replaceMaterial(
         (removeSourceMaterialFunc, addTargetMaterialFunc),
         sourceRenderGroup.meshRenderer,
         sourceRenderGroup.material,
         targetRenderGroup.meshRenderer,
         targetRenderGroup.material,
         gameObject,
       );

  StateLogicService.refreshEngineState(engineState);
};