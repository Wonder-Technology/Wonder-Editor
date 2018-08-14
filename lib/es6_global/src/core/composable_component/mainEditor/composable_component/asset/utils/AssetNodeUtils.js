

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as AssetJsonNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetJsonNodeMapEditorService.js";
import * as AssetFolderNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetFolderNodeMapEditorService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTextureNodeMapEditorService.js";

function handleSpeficFuncByAssetNodeType(type_, param) {
  switch (type_) {
    case 0 : 
        return Curry._1(param[0], AssetFolderNodeMapEditorService$WonderEditor.getFolderNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
    case 1 : 
        return Curry._1(param[1], AssetJsonNodeMapEditorService$WonderEditor.getJsonNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
    case 2 : 
        return Curry._1(param[2], AssetTextureNodeMapEditorService$WonderEditor.getTextureNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
    
  }
}

export {
  handleSpeficFuncByAssetNodeType ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
