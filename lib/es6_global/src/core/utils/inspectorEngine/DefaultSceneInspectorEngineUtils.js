

import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as InspectorCanvasUtils$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/utils/InspectorCanvasUtils.js";
import * as PrimitiveEngineService$WonderEditor from "../../../service/state/engine/PrimitiveEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../service/state/engine/TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../service/state/engine/ArcballCameraEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../service/state/engine/DirectionLightEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as ArcballCameraControllerLogicService$WonderEditor from "../../../service/stateTuple/logic/ArcballCameraControllerLogicService.js";

function getAmbientLightArr(param) {
  return /* array */[
          0.6,
          0.6,
          0.6
        ];
}

function _initCameraAddToSceneGameObject(camera, inspectorEngineState) {
  var match = ArcballCameraEngineService$WonderEditor.create(inspectorEngineState);
  var arcballCameraController = match[1];
  var inspectorEngineState$1 = match[0];
  return SceneEngineService$WonderEditor.addSceneChild(camera, GameObjectComponentEngineService$WonderEditor.addArcballCameraControllerComponent(camera, arcballCameraController, BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(camera, inspectorEngineState$1), ArcballCameraControllerLogicService$WonderEditor.bindArcballCameraControllerEventForInspector(arcballCameraController, InspectorCanvasUtils$WonderEditor.initArcballCameraControllerAngle(arcballCameraController, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerMoveSpeedY(arcballCameraController, 1, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerMoveSpeedX(arcballCameraController, 1, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerWheelSpeed(arcballCameraController, 0.5, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(InspectorCanvasUtils$WonderEditor.getCameraDefaultDistance(/* () */0), arcballCameraController, inspectorEngineState$1)))))))));
}

function _initDirectionLightAddToSceneGameObject(directionLight, inspectorEngineState) {
  return SceneEngineService$WonderEditor.addSceneChild(directionLight, DirectionLightEngineService$WonderEditor.setDirectionLightIntensity(0.25, GameObjectComponentEngineService$WonderEditor.unsafeGetDirectionLightComponent(directionLight, inspectorEngineState), TransformEngineService$WonderEditor.setTransformLocalEulerAngles(/* tuple */[
                      145,
                      15,
                      0
                    ], GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(directionLight, inspectorEngineState), inspectorEngineState)));
}

var _initEmptyGameObjectAddToSceneGameObject = SceneEngineService$WonderEditor.addSceneChild;

function _initAmbientLight(inspectorEngineState) {
  return SceneEngineService$WonderEditor.setAmbientLightColor(/* array */[
              0.6,
              0.6,
              0.6
            ], inspectorEngineState);
}

function createDefaultScene(inspectorEngineState) {
  var match = PrimitiveEngineService$WonderEditor.createCamera(inspectorEngineState);
  var match$1 = PrimitiveEngineService$WonderEditor.createDirectionLight(match[0]);
  var match$2 = GameObjectEngineService$WonderEditor.create(match$1[0]);
  var emptyGameObject = match$2[1];
  var inspectorEngineState$1 = _initDirectionLightAddToSceneGameObject(match$1[1], _initCameraAddToSceneGameObject(match[1], match$2[0]));
  var inspectorEngineState$2 = SceneEngineService$WonderEditor.addSceneChild(emptyGameObject, inspectorEngineState$1);
  var inspectorEngineState$3 = SceneEngineService$WonderEditor.setAmbientLightColor(/* array */[
        0.6,
        0.6,
        0.6
      ], inspectorEngineState$2);
  return /* tuple */[
          emptyGameObject,
          inspectorEngineState$3
        ];
}

export {
  getAmbientLightArr ,
  _initCameraAddToSceneGameObject ,
  _initDirectionLightAddToSceneGameObject ,
  _initEmptyGameObjectAddToSceneGameObject ,
  _initAmbientLight ,
  createDefaultScene ,
  
}
/* SceneEngineService-WonderEditor Not a pure module */
