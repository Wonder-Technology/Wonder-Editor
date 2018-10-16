

import * as RenderGroupEngineService$WonderEditor from "../../state/engine/RenderGroupEngineService.js";

function createRenderGroup(param, engineState) {
  return RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
              param[0],
              param[1]
            ], engineState);
}

export {
  createRenderGroup ,
  
}
/* RenderGroupEngineService-WonderEditor Not a pure module */
