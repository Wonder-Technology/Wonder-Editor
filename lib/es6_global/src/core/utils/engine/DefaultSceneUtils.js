

import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../service/state/engine/camera/CameraEngineService.js";
import * as GeometryEngineService$WonderEditor from "../../../service/state/engine/GeometryEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../service/state/engine/TransformEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as PrepareDefaultComponentUtils$WonderEditor from "./PrepareDefaultComponentUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";
import * as ArcballCameraControllerLogicService$WonderEditor from "../../../service/stateTuple/logic/ArcballCameraControllerLogicService.js";

function prepareDefaultComponent(editorState, engineState) {
  var match = PrepareDefaultComponentUtils$WonderEditor.buildCubeGeometryDefaultComponent(editorState, engineState);
  var match$1 = PrepareDefaultComponentUtils$WonderEditor.buildSphereGeometryDefaultComponent(match[0], match[1]);
  return /* tuple */[
          match$1[0],
          match$1[1],
          match[2]
        ];
}

function prepareSpecificGameObjects(editorState, engineState) {
  var match = GeometryEngineService$WonderEditor.createGridPlaneGameObject(/* tuple */[
        300,
        10,
        0
      ], /* array */[
        0.6,
        0.6,
        0.6
      ], engineState);
  var match$1 = CameraEngineService$WonderEditor.createCamera(editorState, match[0]);
  var camera = match$1[2];
  var match$2 = ArcballCameraEngineService$WonderEditor.create(match$1[1]);
  var arcballCameraController = match$2[1];
  var engineState$1 = match$2[0];
  var engineState$2 = ArcballCameraControllerLogicService$WonderEditor.bindArcballCameraControllerEventForSceneView(arcballCameraController, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTheta(arcballCameraController, Math.PI / 5, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerWheelSpeed(arcballCameraController, 8, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(200, arcballCameraController, TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                        20,
                        0,
                        100
                      ], GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(camera, engineState$1), engineState$1)))));
  var match$3 = GameObjectLogicService$WonderEditor.addArcballCameraController(camera, arcballCameraController, /* tuple */[
        match$1[0],
        engineState$2
      ]);
  var editorState$1 = SceneViewEditorService$WonderEditor.setEditCamera(camera, SceneViewEditorService$WonderEditor.setGridPlane(match[1], match$3[0]));
  return /* tuple */[
          editorState$1,
          match$3[1],
          camera
        ];
}

function _prepareEngineState(param, engineState) {
  var directionLight = param[1];
  var camera = param[0];
  return SceneEngineService$WonderEditor.addSceneChild(directionLight, SceneEngineService$WonderEditor.addSceneChild(param[3], SceneEngineService$WonderEditor.addSceneChild(param[2], SceneEngineService$WonderEditor.addSceneChild(camera, TransformEngineService$WonderEditor.setTransformLocalEulerAngles(/* tuple */[
                              45,
                              0,
                              0
                            ], GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(directionLight, engineState), TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                                  30,
                                  4,
                                  10
                                ], GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(directionLight, engineState), TransformEngineService$WonderEditor.setLocalPosition(/* tuple */[
                                      0,
                                      0,
                                      40
                                    ], GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(camera, engineState), BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(camera, engineState), engineState))))))));
}

function createDefaultScene(cubeGeometry, editorState, engineState) {
  var match = SceneEngineService$WonderEditor.createDefaultSceneGameObjects(cubeGeometry, editorState, engineState);
  var camera = match[2];
  return /* tuple */[
          match[0],
          _prepareEngineState(/* tuple */[
                camera,
                match[5],
                match[3],
                match[4]
              ], match[1]),
          camera
        ];
}

export {
  prepareDefaultComponent ,
  prepareSpecificGameObjects ,
  _prepareEngineState ,
  createDefaultScene ,
  
}
/* SceneEngineService-WonderEditor Not a pure module */
