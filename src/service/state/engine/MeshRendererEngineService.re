open Wonderjs;

let create = MeshRendererAPI.createMeshRenderer;

let getDrawMode = MeshRendererAPI.getMeshRendererDrawMode;

let setDrawMode = (value, component, state) =>
  MeshRendererAPI.setMeshRendererDrawMode(component, value, state);

let getMeshRendererIsRender = MeshRendererAPI.getMeshRendererIsRender;

let setMeshRendererIsRender = MeshRendererAPI.setMeshRendererIsRender;

let getGlDrawMode = (gl, meshRenderer, engineState) =>
  DrawModeMeshRendererService.getGlDrawMode(
    gl,
    meshRenderer,
    CreateRenderStateMainService.createRenderState(engineState),
  );