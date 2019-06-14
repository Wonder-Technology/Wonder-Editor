

import * as GeometryEngineService$WonderEditor from "../../../state/engine/GeometryEngineService.js";
import * as CloneValueEngineLogicService$WonderEditor from "./CloneValueEngineLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectComponentEngineService.js";

function cloneGeometryToOtherEngineState(targetGameObject, param, targetEngineState) {
  var clonedEngineState = param[1];
  var clonedGameObjectGeometry = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(param[0], clonedEngineState);
  var match = GeometryEngineService$WonderEditor.create(targetEngineState);
  var newGeometry = match[1];
  var targetEngineState$1 = match[0];
  CloneValueEngineLogicService$WonderEditor.cloneValueByGetOptionValueFunc(GeometryEngineService$WonderEditor.getGeometryIndices32, GeometryEngineService$WonderEditor.setGeometryIndices32, newGeometry, /* tuple */[
        clonedGameObjectGeometry,
        clonedEngineState
      ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetOptionValueFunc(GeometryEngineService$WonderEditor.getGeometryIndices16, GeometryEngineService$WonderEditor.setGeometryIndices16, newGeometry, /* tuple */[
            clonedGameObjectGeometry,
            clonedEngineState
          ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(GeometryEngineService$WonderEditor.unsafeGetGeometryTexCoords, GeometryEngineService$WonderEditor.setGeometryTexCoords, newGeometry, /* tuple */[
                clonedGameObjectGeometry,
                clonedEngineState
              ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(GeometryEngineService$WonderEditor.unsafeGetGeometryNormals, GeometryEngineService$WonderEditor.setGeometryNormals, newGeometry, /* tuple */[
                    clonedGameObjectGeometry,
                    clonedEngineState
                  ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(GeometryEngineService$WonderEditor.unsafeGetGeometryVertices, GeometryEngineService$WonderEditor.setGeometryVertices, newGeometry, /* tuple */[
                        clonedGameObjectGeometry,
                        clonedEngineState
                      ], targetEngineState$1)))));
  return /* tuple */[
          newGeometry,
          targetEngineState$1
        ];
}

export {
  cloneGeometryToOtherEngineState ,
  
}
/* GeometryEngineService-WonderEditor Not a pure module */
