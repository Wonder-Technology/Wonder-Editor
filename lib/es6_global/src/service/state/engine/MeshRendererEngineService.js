

import * as MeshRendererAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/MeshRendererAPI.js";
import * as DrawModeMeshRendererService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/render/meshRenderer/DrawModeMeshRendererService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/render/CreateRenderStateMainService.js";

function setDrawMode(value, component, state) {
  return MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(component, value, state);
}

function getGlDrawMode(gl, meshRenderer, engineState) {
  return DrawModeMeshRendererService$Wonderjs.getGlDrawMode(gl, meshRenderer, CreateRenderStateMainService$Wonderjs.createRenderState(engineState));
}

var create = MeshRendererAPI$Wonderjs.createMeshRenderer;

var getDrawMode = MeshRendererAPI$Wonderjs.getMeshRendererDrawMode;

var getMeshRendererIsRender = MeshRendererAPI$Wonderjs.getMeshRendererIsRender;

var setMeshRendererIsRender = MeshRendererAPI$Wonderjs.setMeshRendererIsRender;

export {
  create ,
  getDrawMode ,
  setDrawMode ,
  getMeshRendererIsRender ,
  setMeshRendererIsRender ,
  getGlDrawMode ,
  
}
/* MeshRendererAPI-Wonderjs Not a pure module */
