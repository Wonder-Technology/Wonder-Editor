let _createRenderGroupAddToGameObject =
    (
      targetGameObject,
      newMeshRenderer,
      (materialComponent, addMaterialFunc),
      targetEngineState,
    ) =>
  targetEngineState
  |> RenderGroupEngineService.addRenderGroupComponents(
       targetGameObject,
       RenderGroupEngineService.buildRenderGroup(
         newMeshRenderer,
         materialComponent,
       ),
       (
         GameObjectComponentEngineService.addMeshRendererComponent,
         addMaterialFunc,
       ),
     );

let _addRenderGroupIfHasBasicMaterial =
    (
      targetGameObject,
      newMeshRenderer,
      (clonedGameObject, clonedEngineState),
      targetEngineState,
    ) => {
  let clonedGameObjectMaterial =
    clonedEngineState
    |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
         clonedGameObject,
       );
  let (basicMaterial, targetEngineState) =
    CloneMaterialEngineLogicService.cloneBasicMaterialToOtherEngineState(
      clonedGameObjectMaterial,
      clonedEngineState,
      targetEngineState,
    );

  (
    RenderGroupEngineService.buildRenderGroup(newMeshRenderer, basicMaterial),
    GameObjectComponentEngineService.addBasicMaterialComponent,
    targetEngineState,
  );
};

let _addRenderGroupIfHasLightMaterial =
    (
      targetGameObject,
      newMeshRenderer,
      (clonedGameObject, clonedEngineState),
      targetEngineState,
    ) => {
  let clonedGameObjectMaterial =
    clonedEngineState
    |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
         clonedGameObject,
       );
  let (lightMaterial, targetEngineState) =
    CloneMaterialEngineLogicService.cloneLightMaterialToOtherEngineState(
      clonedGameObjectMaterial,
      clonedEngineState,
      targetEngineState,
    );

  (
    RenderGroupEngineService.buildRenderGroup(newMeshRenderer, lightMaterial),
    GameObjectComponentEngineService.addLightMaterialComponent,
    targetEngineState,
  );
};

let cloneRenderGroupToOtherEngineState =
    (
      targetGameObject,
      (clonedGameObject, clonedEngineState),
      targetEngineState,
    ) => {
  let (newMeshRenderer, targetEngineState) =
    GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
      clonedGameObject,
      clonedEngineState,
    )
    |> CloneMeshRenderEngineLogicService.cloneMeshRendererToOtherEngineState(
         _,
         clonedEngineState,
         targetEngineState,
       );

  clonedEngineState
  |> GameObjectComponentEngineService.hasBasicMaterialComponent(
       clonedGameObject,
     ) ?
    targetEngineState
    |> _addRenderGroupIfHasBasicMaterial(
         targetGameObject,
         newMeshRenderer,
         (clonedGameObject, clonedEngineState),
       ) :
    targetEngineState
    |> _addRenderGroupIfHasLightMaterial(
         targetGameObject,
         newMeshRenderer,
         (clonedGameObject, clonedEngineState),
       );
};