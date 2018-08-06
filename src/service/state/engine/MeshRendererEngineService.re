open Wonderjs;

let create = MeshRendererAPI.createMeshRenderer;

let getDrawMode = MeshRendererAPI.getMeshRendererDrawMode;

let setDrawMode = (value, component, state) =>
  MeshRendererAPI.setMeshRendererDrawMode(component, value, state);