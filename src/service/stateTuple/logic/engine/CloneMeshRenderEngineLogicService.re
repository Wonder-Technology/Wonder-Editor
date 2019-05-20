let cloneMeshRendererToOtherEngineState =
    (clonedMeshRenderer, clonedEngineState, targetEngineState) => {
  let (targetEngineState, newMeshRenderer) =
    MeshRendererEngineService.create(targetEngineState);

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