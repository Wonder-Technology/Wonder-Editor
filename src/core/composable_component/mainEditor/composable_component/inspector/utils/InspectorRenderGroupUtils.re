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

let _getOperateSourceRenderGroupData =
    (materialType, gameObject, engineStateToGetData) =>
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

let _getOperateTargetRenderGroupData =
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

let replaceMaterialByMaterialType =
    (gameObject, sourceMateralType, targetMaterialType, engineState) => {
  let (sourceRenderGroup, removeSourceMaterialFunc) =
    _getOperateSourceRenderGroupData(
      sourceMateralType,
      gameObject,
      engineState,
    );

  let (engineState, targetRenderGroup, addTargetMaterialFunc) =
    _getOperateTargetRenderGroupData(
      sourceRenderGroup.meshRenderer,
      targetMaterialType,
      engineState,
    );

  let engineState =
    engineState
    |> RenderGroupEngineService.replaceMaterial(
         (sourceRenderGroup, targetRenderGroup),
         gameObject,
         (removeSourceMaterialFunc, addTargetMaterialFunc),
       );

  engineState;
};