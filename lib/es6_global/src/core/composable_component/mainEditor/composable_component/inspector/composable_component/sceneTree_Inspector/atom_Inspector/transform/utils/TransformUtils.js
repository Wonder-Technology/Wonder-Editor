

import * as FloatService$WonderEditor from "../../../../../../../../../../service/atom/FloatService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/TransformEngineService.js";

function truncateTransformValue(param) {
  return /* tuple */[
          FloatService$WonderEditor.truncateFloatValue(param[0], 6),
          FloatService$WonderEditor.truncateFloatValue(param[1], 6),
          FloatService$WonderEditor.truncateFloatValue(param[2], 6)
        ];
}

function getSceneTreeNodeLocalPosition(transformComponent) {
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return TransformEngineService$WonderEditor.getLocalPosition(transformComponent, param);
              }));
}

function getCurrentTransformData(transformComponent) {
  return truncateTransformValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return TransformEngineService$WonderEditor.getLocalPosition(transformComponent, param);
                  })));
}

export {
  truncateTransformValue ,
  getSceneTreeNodeLocalPosition ,
  getCurrentTransformData ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
