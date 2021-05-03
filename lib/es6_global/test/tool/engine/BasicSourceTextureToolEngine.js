

import * as BufferSourceTextureService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/texture/BufferSourceTextureService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../src/service/state/engine/BasicSourceTextureEngineService.js";

function getIsNeedUpdate(texture, engineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(texture, engineState) === BufferSourceTextureService$Wonderjs.getNeedUpdate(/* () */0);
  if (match) {
    return true;
  } else {
    return false;
  }
}

export {
  getIsNeedUpdate ,
  
}
/* BufferSourceTextureService-Wonderjs Not a pure module */
