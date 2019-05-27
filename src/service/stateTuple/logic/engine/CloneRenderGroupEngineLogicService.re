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
      editorState,
      targetEngineState,
    ) => {
  let clonedGameObjectMaterial =
    clonedEngineState
    |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
         clonedGameObject,
       );
  let (lightMaterial, editorState, targetEngineState) =
    CloneMaterialEngineLogicService.cloneLightMaterialToOtherEngineState(
      clonedGameObjectMaterial,
      editorState,
      clonedEngineState,
      targetEngineState,
    );

  (
    RenderGroupEngineService.buildRenderGroup(newMeshRenderer, lightMaterial),
    GameObjectComponentEngineService.addLightMaterialComponent,
    editorState,
    targetEngineState,
  );
};

let cloneRenderGroupToOtherEngineState =
    (
      targetGameObject,
      (clonedGameObject, clonedEngineState),
      editorState,
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
    {
      let (renderGroup, addBasicMaterialComponentFunc, targetEngineState) =
        targetEngineState
        |> _addRenderGroupIfHasBasicMaterial(
             targetGameObject,
             newMeshRenderer,
             (clonedGameObject, clonedEngineState),
           );

      (
        renderGroup,
        addBasicMaterialComponentFunc,
        editorState,
        targetEngineState,
      );
    } :
    targetEngineState
    |> _addRenderGroupIfHasLightMaterial(
         targetGameObject,
         newMeshRenderer,
         (clonedGameObject, clonedEngineState),
         editorState,
       );
};