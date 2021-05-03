

import * as PlaneShapeUtils$WonderEditor from "../../../../../../core/utils/engine/job/init/initPickingJob/PlaneShapeUtils.js";
import * as TransformEngineService$WonderEditor from "../../../../engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../engine/gameObject/GameObjectComponentEngineService.js";

function buildPlane(normal, wholeGameObject, engineState) {
  return PlaneShapeUtils$WonderEditor.setFromNormalAndCoplanarPoint(normal, TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(wholeGameObject, engineState), engineState));
}

export {
  buildPlane ,
  
}
/* PlaneShapeUtils-WonderEditor Not a pure module */
