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
      (removeSourceMaterialFunc, addTargetMaterialFunc),
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
    (removeSourceMaterialFunc, addTargetMaterialFunc),
    state,
  );

let replaceRenderGroupByMaterialType = (sourceMateralType, targetMaterialType) => {
  let gameObject =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  let engineState = StateEngineService.unsafeGetState();

  let (sourceRenderGroup, removeSourceMaterialFunc) =
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
         (removeSourceMaterialFunc, addTargetMaterialFunc),
         sourceRenderGroup.meshRenderer,
         sourceRenderGroup.material,
         targetRenderGroup.meshRenderer,
         targetRenderGroup.material,
         gameObject,
       );

  StateLogicService.refreshEngineState(engineState);
};