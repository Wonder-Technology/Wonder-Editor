

import * as FloatService$WonderEditor from "../../../../../../../../../../service/atom/FloatService.js";
import * as ValueService$WonderEditor from "../../../../../../../../../../service/atom/ValueService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as TransformEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/transform/TransformEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/TransformEngineService.js";

function truncateTransformValue(param) {
  return /* tuple */[
          FloatService$WonderEditor.truncateFloatValue(param[0], 5),
          FloatService$WonderEditor.truncateFloatValue(param[1], 5),
          FloatService$WonderEditor.truncateFloatValue(param[2], 5)
        ];
}

function getSceneTreeNodeLocalPosition(transformComponent) {
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return TransformEngineService$WonderEditor.getLocalPosition(transformComponent, param);
              }));
}

function getTransformPositionData(transformComponent) {
  return truncateTransformValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return TransformEngineService$WonderEditor.getLocalPosition(transformComponent, param);
                  })));
}

function getTransformScaleData(transformComponent) {
  return truncateTransformValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                    return TransformEngineService$WonderEditor.getLocalScale(transformComponent, param);
                  })));
}

function getTransformRotationData(transformComponent) {
  var match = StateLogicService$WonderEditor.getStateToGetData((function (param) {
          return TransformEditorService$WonderEditor.getLocalEulerAngleAndInit(transformComponent, param);
        }));
  StateEditorService$WonderEditor.setState(match[1]);
  return truncateTransformValue(match[0]);
}

function isTransformVec3Equal(param, param$1) {
  if (ValueService$WonderEditor.isValueEqual(/* Float */1, param$1[0], param[0]) && ValueService$WonderEditor.isValueEqual(/* Float */1, param$1[1], param[1])) {
    return ValueService$WonderEditor.isValueEqual(/* Float */1, param$1[2], param[2]);
  } else {
    return false;
  }
}

export {
  truncateTransformValue ,
  getSceneTreeNodeLocalPosition ,
  getTransformPositionData ,
  getTransformScaleData ,
  getTransformRotationData ,
  isTransformVec3Equal ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
