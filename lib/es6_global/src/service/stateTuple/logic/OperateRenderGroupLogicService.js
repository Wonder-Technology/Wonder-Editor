

import * as RenderGroupService$WonderEditor from "../../primitive/renderGroup/RenderGroupService.js";
import * as RenderGroupEngineService$WonderEditor from "../../state/engine/RenderGroupEngineService.js";

function createRenderGroup(param, editEngineState, runEngineState) {
  var createMaterialFunc = param[1];
  var createMeshRendererFunc = param[0];
  var match = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
        createMeshRendererFunc,
        createMaterialFunc
      ], editEngineState);
  var match$1 = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
        createMeshRendererFunc,
        createMaterialFunc
      ], runEngineState);
  return RenderGroupService$WonderEditor.checkEditAndRunRenderGroupWithDiff(/* tuple */[
              match[1],
              match$1[1]
            ], match[0], match$1[0]);
}

export {
  createRenderGroup ,
  
}
/* RenderGroupService-WonderEditor Not a pure module */
