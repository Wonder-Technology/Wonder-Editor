

import * as TransformEngineService$WonderEditor from "../../../state/engine/TransformEngineService.js";
import * as CloneValueEngineLogicService$WonderEditor from "./CloneValueEngineLogicService.js";

function cloneTransformToOtherEngineState(targetGameObjectTransform, param, targetEngineState) {
  var clonedEngineState = param[1];
  var clonedGameObjectTransform = param[0];
  return CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(TransformEngineService$WonderEditor.getLocalScale, TransformEngineService$WonderEditor.setLocalScale, targetGameObjectTransform, /* tuple */[
              clonedGameObjectTransform,
              clonedEngineState
            ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(TransformEngineService$WonderEditor.getLocalRotation, TransformEngineService$WonderEditor.setLocalRotation, targetGameObjectTransform, /* tuple */[
                  clonedGameObjectTransform,
                  clonedEngineState
                ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(TransformEngineService$WonderEditor.getLocalPosition, TransformEngineService$WonderEditor.setLocalPosition, targetGameObjectTransform, /* tuple */[
                      clonedGameObjectTransform,
                      clonedEngineState
                    ], targetEngineState)));
}

export {
  cloneTransformToOtherEngineState ,
  
}
/* TransformEngineService-WonderEditor Not a pure module */
