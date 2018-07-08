

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as StateAssetService$WonderEditor from "../../../../../../service/state/asset/StateAssetService.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/JsonNodeMapAssetService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/FolderNodeMapAssetService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/TextureNodeMapAssetService.js";

function handleSpeficFuncByAssetNodeType(type_, param) {
  switch (type_) {
    case 0 : 
        return Curry._1(param[0], FolderNodeMapAssetService$WonderEditor.unsafeGetFolderNodeMap(StateAssetService$WonderEditor.getState(/* () */0)));
    case 1 : 
        return Curry._1(param[1], JsonNodeMapAssetService$WonderEditor.unsafeGetJsonNodeMap(StateAssetService$WonderEditor.getState(/* () */0)));
    case 2 : 
        return Curry._1(param[2], TextureNodeMapAssetService$WonderEditor.unsafeGetTextureNodeMap(StateAssetService$WonderEditor.getState(/* () */0)));
    case 3 : 
        var partial_arg = "the type:" + (String(type_) + " not exist");
        return Log$WonderLog.fatal((function (param, param$1, param$2) {
                      return Log$WonderLog.buildFatalMessage("handleSpeficFuncByAssetNodeType", partial_arg, param, param$1, param$2);
                    }));
    
  }
}

export {
  handleSpeficFuncByAssetNodeType ,
  
}
/* Log-WonderLog Not a pure module */
