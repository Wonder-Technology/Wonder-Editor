

import * as MeshRendererAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/MeshRendererAPI.js";

function setDrawMode(value, component, state) {
  return MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(component, value, state);
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
  
}
/* MeshRendererAPI-Wonderjs Not a pure module */
