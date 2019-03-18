

import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/meshRenderer/RecordMeshRendererMainService.js";
import * as RenderArrayMeshRendererService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/meshRenderer/RenderArrayMeshRendererService.js";

function getBasicMaterialRenderGameObjectArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getBasicMaterialRenderGameObjectArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function getLightMaterialRenderGameObjectArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getLightMaterialRenderGameObjectArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function getAllRenderArrayCount(param) {
  return /* tuple */[
          StateLogicService$WonderEditor.getEngineStateToGetData(getBasicMaterialRenderGameObjectArray).length,
          StateLogicService$WonderEditor.getEngineStateToGetData(getLightMaterialRenderGameObjectArray).length
        ];
}

export {
  getBasicMaterialRenderGameObjectArray ,
  getLightMaterialRenderGameObjectArray ,
  getAllRenderArrayCount ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
