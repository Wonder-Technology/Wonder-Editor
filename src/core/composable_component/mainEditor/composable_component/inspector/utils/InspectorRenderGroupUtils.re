open MainEditorMaterialType;

open Wonderjs;

open RenderGroupType;

let _getMaterialHandleFuncByType = materialType =>
  switch (materialType) {
  | BasicMaterial => (
      GameObjectComponentEngineService.getBasicMaterialComponent,
      GameObjectComponentEngineService.disposeBasicMaterialComponent,
    )

  | LightMaterial => (
      GameObjectComponentEngineService.getLightMaterialComponent,
      GameObjectComponentEngineService.disposeLightMaterialComponent,
    )
  };

let disposeRenderGroup = (gameObject, materialType, engineState) => {
  let (getMaterialFunc, disposeMaterialFunc) =
    _getMaterialHandleFuncByType(materialType);

  engineState
  |> RenderGroupEngineService.disposeRenderGroupComponents(
       gameObject,
       RenderGroupEngineService.getRenderGroupComponents(
         gameObject,
         (
           GameObjectComponentEngineService.getMeshRendererComponent,
           getMaterialFunc,
         ),
         engineState,
       ),
       (
         GameObjectComponentEngineService.disposeMeshRendererComponent,
         disposeMaterialFunc,
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
    (materialType, gameObject, engineStateToGetData) =>
  switch (materialType) {
  | BasicMaterial => (
      engineStateToGetData
      |> RenderGroupEngineService.getRenderGroupComponents(
           gameObject,
           (
             GameObjectComponentEngineService.getMeshRendererComponent,
             GameObjectComponentEngineService.getBasicMaterialComponent,
           ),
         ),
      GameObjectComponentEngineService.disposeBasicMaterialComponent,
    )
  | LightMaterial => (
      engineStateToGetData
      |> RenderGroupEngineService.getRenderGroupComponents(
           gameObject,
           (
             GameObjectComponentEngineService.getMeshRendererComponent,
             GameObjectComponentEngineService.getLightMaterialComponent,
           ),
         ),
      GameObjectComponentEngineService.disposeLightMaterialComponent,
    )
  };

let _getOperateTargetRenderGroupFunc = (materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial => (
      OperateRenderGroupLogicService.createRenderGroup(
        (MeshRendererEngineService.create, BasicMaterialEngineService.create),
        engineState,
      ),
      GameObjectComponentEngineService.addBasicMaterialComponent,
    )
  | LightMaterial => (
      OperateRenderGroupLogicService.createRenderGroup(
        (MeshRendererEngineService.create, LightMaterialEngineService.create),
        engineState,
      ),
      GameObjectComponentEngineService.addLightMaterialComponent,
    )
  };

let _replaceRenderGroup =
    (
      (disposeSourceMaterialFunc, addTargetMaterialFunc),
      sourceMeshRenderer,
      sourceMaterial,
      targetMeshRenderer,
      targetMaterial,
      gameObject,
      state,
    ) =>
  RenderGroupEngineService.replaceRenderGroupComponents(
    (
      {meshRenderer: sourceMeshRenderer, material: sourceMaterial},
      {meshRenderer: targetMeshRenderer, material: targetMaterial},
    ),
    gameObject,
    (disposeSourceMaterialFunc, addTargetMaterialFunc),
    state,
  );

let replaceRenderGroupByMaterialType = (sourceMateralType, targetMaterialType) => {
  let gameObject =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  let engineState = StateEngineService.unsafeGetState();

  let (sourceRenderGroup, disposeSourceMaterialFunc) =
    _getOperateSourceRenderGroupFunc(
      sourceMateralType,
      gameObject,
      engineState,
    );

  let ((engineState, targetRenderGroup), addTargetMaterialFunc) =
    _getOperateTargetRenderGroupFunc(targetMaterialType, engineState);

  let engineState =
    engineState
    |> _replaceRenderGroup(
         (disposeSourceMaterialFunc, addTargetMaterialFunc),
         sourceRenderGroup.meshRenderer,
         sourceRenderGroup.material,
         targetRenderGroup.meshRenderer,
         targetRenderGroup.material,
         gameObject,
       );

  StateLogicService.refreshEngineState(engineState);
};