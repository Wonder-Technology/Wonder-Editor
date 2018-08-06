open DiffType;

let createRenderGroup =
    (
      (createMeshRendererFunc, createMaterialFunc),
      editEngineState,
      runEngineState,
    ) => {
  let (editEngineState, _editRenderGroup) =
    editEngineState
    |> RenderGroupEngineService.createRenderGroup((
         createMeshRendererFunc,
         createMaterialFunc,
       ));
  let (runEngineState, runRenderGroup) =
    runEngineState
    |> RenderGroupEngineService.createRenderGroup((
         createMeshRendererFunc,
         createMaterialFunc,
       ));

  RenderGroupService.checkEditAndRunRenderGroupWithDiff(
    (_editRenderGroup, runRenderGroup),
    editEngineState,
    runEngineState,
  );
};