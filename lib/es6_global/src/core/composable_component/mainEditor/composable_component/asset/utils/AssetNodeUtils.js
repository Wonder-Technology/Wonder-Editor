

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateAssetService$WonderEditor from "../../../../../../service/state/asset/StateAssetService.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/JsonNodeMapAssetService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/FolderNodeMapAssetService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/TextureNodeMapAssetService.js";

function handleSpeficFuncByAssetNodeType(type_, param) {
  switch (type_) {
    case 0 : 
        return Curry._1(param[0], FolderNodeMapAssetService$WonderEditor.getFolderNodeMap(StateAssetService$WonderEditor.getState(/* () */0)));
    case 1 : 
        return Curry._1(param[1], JsonNodeMapAssetService$WonderEditor.getJsonNodeMap(StateAssetService$WonderEditor.getState(/* () */0)));
    case 2 : 
        return Curry._1(param[2], TextureNodeMapAssetService$WonderEditor.getTextureNodeMap(StateAssetService$WonderEditor.getState(/* () */0)));
    
  }
}

export {
  handleSpeficFuncByAssetNodeType ,
  
}
/* StateAssetService-WonderEditor Not a pure module */
