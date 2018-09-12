

let createRenderGroup =
    ((createMeshRendererFunc, createMaterialFunc), engineState) =>
  engineState
  |> RenderGroupEngineService.createRenderGroup((
       createMeshRendererFunc,
       createMaterialFunc,
     ));