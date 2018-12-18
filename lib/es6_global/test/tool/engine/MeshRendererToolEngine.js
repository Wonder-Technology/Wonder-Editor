

import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/meshRenderer/RecordMeshRendererMainService.js";
import * as RenderArrayMeshRendererService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/meshRenderer/RenderArrayMeshRendererService.js";

function getBasicMaterialRenderArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getBasicMaterialRenderArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function getLightMaterialRenderArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getLightMaterialRenderArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function getAllRenderArrayCount(param) {
  return /* tuple */[
          StateLogicService$WonderEditor.getEngineStateToGetData(getBasicMaterialRenderArray).length,
          StateLogicService$WonderEditor.getEngineStateToGetData(getLightMaterialRenderArray).length
        ];
}

export {
  getBasicMaterialRenderArray ,
  getLightMaterialRenderArray ,
  getAllRenderArrayCount ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
