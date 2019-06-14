

import * as Color$WonderEditor from "../../../../../external/Color.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../service/state/engine/LightMaterialEngineService.js";

function getBasicMaterialColor(materialComponent, param) {
  return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return BasicMaterialEngineService$WonderEditor.getColor(materialComponent, param);
                  })));
}

function getLightMaterialColor(materialComponent, param) {
  return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(materialComponent, param);
                  })));
}

export {
  getBasicMaterialColor ,
  getLightMaterialColor ,
  
}
/* Color-WonderEditor Not a pure module */
