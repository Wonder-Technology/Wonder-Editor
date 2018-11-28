

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectUtils$WonderEditor from "../../../core/utils/engine/GameObjectUtils.js";
import * as LightEngineService$WonderEditor from "../../state/engine/LightEngineService.js";
import * as CameraEngineService$WonderEditor from "../../state/engine/camera/CameraEngineService.js";
import * as InspectorEditorService$WonderEditor from "../../state/editor/inspector/InspectorEditorService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

function getAllComponentArray() {
  return /* array */[
          /* record */[
            /* componentType : Transform */0,
            /* hasComponentFunc */GameObjectComponentEngineService$WonderEditor.hasTransformComponent
          ],
          /* record */[
            /* componentType : RenderGroup */1,
            /* hasComponentFunc */InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents
          ],
          /* record */[
            /* componentType : Geometry */2,
            /* hasComponentFunc */GameObjectComponentEngineService$WonderEditor.hasGeometryComponent
          ],
          /* record */[
            /* componentType : ArcballCameraController */3,
            /* hasComponentFunc */GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent
          ],
          /* record */[
            /* componentType : CameraGroup */4,
            /* hasComponentFunc */CameraEngineService$WonderEditor.hasCameraGroup
          ],
          /* record */[
            /* componentType : Light */5,
            /* hasComponentFunc */LightEngineService$WonderEditor.hasLightComponent
          ]
        ];
}

function _storeGameObjectComponentInComponentTypeMap(gameObject, engineState, editorState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, param) {
                var match = Curry._2(param[/* hasComponentFunc */1], gameObject, engineState);
                if (match) {
                  return InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, param[/* componentType */0], editorState);
                } else {
                  return editorState;
                }
              }), editorState, getAllComponentArray(/* () */0));
}

function getGameObjectComponentStoreInComponentTypeMap(gameObjectArr, engineState, editorState) {
  var _iterateGameObject = function (gameObjectArr, engineState, editorState) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, gameObject) {
                  var editorState$1 = _storeGameObjectComponentInComponentTypeMap(gameObject, engineState, editorState);
                  return _iterateGameObject(GameObjectUtils$WonderEditor.getChildren(gameObject, engineState), engineState, editorState$1);
                }), editorState, gameObjectArr);
  };
  return _iterateGameObject(gameObjectArr, engineState, editorState);
}

export {
  getAllComponentArray ,
  _storeGameObjectComponentInComponentTypeMap ,
  getGameObjectComponentStoreInComponentTypeMap ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
