'use strict';

import * as Main$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/core/api/Main.js";

function init(canvasId, isTest) {
  return Main$Wonderjs.setMainConfig({
              canvasId: canvasId,
              bufferConfig: undefined,
              gpuConfig: undefined,
              isTest: isTest,
              contextConfig: undefined
            });
}

export {
  init ,
  
}
/* Main-Wonderjs Not a pure module */
