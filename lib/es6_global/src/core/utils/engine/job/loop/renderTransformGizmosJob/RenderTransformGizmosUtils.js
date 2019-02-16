

import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function getRenderData(gameObject, engineState) {
  var transform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState);
  return Js_option.andThen((function (geometry) {
                return Js_option.andThen((function (material) {
                              return Js_option.andThen((function (meshRenderer) {
                                            return /* tuple */[
                                                    transform,
                                                    material,
                                                    meshRenderer,
                                                    geometry
                                                  ];
                                          }), GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent(gameObject, engineState));
                            }), GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(gameObject, engineState));
              }), GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState));
}

export {
  getRenderData ,
  
}
/* GameObjectComponentEngineService-WonderEditor Not a pure module */
