

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as LightEngineService$WonderEditor from "../../state/engine/LightEngineService.js";
import * as CameraEngineService$WonderEditor from "../../state/engine/camera/CameraEngineService.js";
import * as InspectorEditorService$WonderEditor from "../../state/editor/inspector/InspectorEditorService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../state/engine/gameObject/HierarchyGameObjectEngineService.js";

function buildAllComponentArray(param) {
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

function _setGameObjectComponentInComponentTypeMap(gameObject, gameObjectAllComponentArray, engineState, editorState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, param) {
                var match = Curry._2(param[/* hasComponentFunc */1], gameObject, engineState);
                if (match) {
                  return InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, param[/* componentType */0], editorState);
                } else {
                  return editorState;
                }
              }), editorState, gameObjectAllComponentArray);
}

function setGameObjectArrComponentTypeMap(gameObjectArr, gameObjectAllComponentArray, engineState, editorState) {
  var _iterateGameObject = function (gameObjectArr, engineState, editorState) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (editorState, gameObject) {
                  var editorState$1 = _setGameObjectComponentInComponentTypeMap(gameObject, gameObjectAllComponentArray, engineState, editorState);
                  return _iterateGameObject(HierarchyGameObjectEngineService$WonderEditor.getChildren(gameObject, engineState), engineState, editorState$1);
                }), editorState, gameObjectArr);
  };
  return _iterateGameObject(gameObjectArr, engineState, editorState);
}

export {
  buildAllComponentArray ,
  _setGameObjectComponentInComponentTypeMap ,
  setGameObjectArrComponentTypeMap ,
  
}
/* LightEngineService-WonderEditor Not a pure module */
