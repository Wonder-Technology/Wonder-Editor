

import * as ConverterEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/ConverterEngineService.js";
import * as AssetHeaderHandleWDBUtils$WonderEditor from "./AssetHeaderHandleWDBUtils.js";

function handleGLBType(param, param$1, param$2) {
  return AssetHeaderHandleWDBUtils$WonderEditor.handleAssetWDBType(/* tuple */[
              param[0],
              ConverterEngineService$WonderEditor.convertGLBToWDB(param[1])
            ], /* tuple */[
              param$1[0],
              param$1[1]
            ], /* tuple */[
              param$2[0],
              param$2[1]
            ]);
}

export {
  handleGLBType ,
  
}
/* ConverterEngineService-WonderEditor Not a pure module */
