let cloneMeshRendererToOtherEngineState =
    (clonedMeshRenderer, clonedEngineState, targetEngineState) => {
  let (targetEngineState, newMeshRenderer) =
    MeshRendererEngineService.create(targetEngineState);

  /* TODO feat: clone isRender */
  let targetEngineState =
    targetEngineState
    |> CloneValueEngineLogicService.cloneValueByGetValueFunc(
         MeshRendererEngineService.getDrawMode,
         MeshRendererEngineService.setDrawMode,
         newMeshRenderer,
         (clonedMeshRenderer, clonedEngineState),
       );

  (newMeshRenderer, targetEngineState);
};