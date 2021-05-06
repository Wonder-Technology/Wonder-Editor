'use strict';

var DefaultSceneUtils$WonderEditor = require("../../../src/core/utils/engine/DefaultSceneUtils.js");
var CameraLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/CameraLogicService.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var GameViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var GeometryEngineService$WonderEditor = require("../../../src/service/state/engine/GeometryEngineService.js");
var GameObjectLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/GameObjectLogicService.js");
var InspectorEditorService$WonderEditor = require("../../../src/service/state/editor/inspector/InspectorEditorService.js");
var SceneViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js");
var ArcballCameraEngineService$WonderEditor = require("../../../src/service/state/engine/ArcballCameraEngineService.js");
var BasicCameraViewEngineService$WonderEditor = require("../../../src/service/state/engine/camera/BasicCameraViewEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var ScriptEventFunctionEngineService$WonderEditor = require("../../../src/service/state/engine/script/ScriptEventFunctionEngineService.js");
var ArcballCameraControllerLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/ArcballCameraControllerLogicService.js");

function prepareSpecificGameObjects(editorState, engineState) {
  var match = GeometryEngineService$WonderEditor.createGridPlaneGameObject(/* tuple */[
        300,
        1,
        0
      ], /* array */[
        0.6,
        0.6,
        0.6
      ], engineState);
  var match$1 = CameraLogicService$WonderEditor.createCamera(editorState, match[0]);
  var camera = match$1[2];
  var match$2 = ArcballCameraEngineService$WonderEditor.create(match$1[1]);
  var arcballCameraController = match$2[1];
  var engineState$1 = ArcballCameraControllerLogicService$WonderEditor.bindArcballCameraControllerEventForSceneView(arcballCameraController, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTheta(arcballCameraController, Math.PI / 5, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerMoveSpeedY(arcballCameraController, 1, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerMoveSpeedX(arcballCameraController, 1, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerWheelSpeed(arcballCameraController, 0.5, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(20, arcballCameraController, match$2[0]))))));
  var match$3 = GameObjectLogicService$WonderEditor.addArcballCameraController(camera, arcballCameraController, /* tuple */[
        match$1[0],
        engineState$1
      ]);
  var editorState$1 = SceneViewEditorService$WonderEditor.setEditCamera(camera, SceneViewEditorService$WonderEditor.setGridPlane(match[1], match$3[0]));
  return /* tuple */[
          editorState$1,
          match$3[1],
          camera
        ];
}

function initEditorWithArcballCamera(param, engineState) {
  var engineState$1 = ScriptEventFunctionEngineService$WonderEditor.disableScriptEventFunction(engineState);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = prepareSpecificGameObjects(editorState, engineState$1);
  var match$1 = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(match[0], match[1]);
  var match$2 = DefaultSceneUtils$WonderEditor.createDefaultScene(match$1[2], match$1[0], match$1[1]);
  var engineState$2 = match$2[1];
  var editorState$1 = GameViewEditorService$WonderEditor.setActivedBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match$2[2], engineState$2), match$2[0]);
  StateEditorService$WonderEditor.setState(InspectorEditorService$WonderEditor.addSceneGameObjectComponentTypeToMap(SceneEngineService$WonderEditor.getSceneGameObject(engineState$2), editorState$1));
  return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match[2], engineState$2), engineState$2);
}

exports.prepareSpecificGameObjects = prepareSpecificGameObjects;
exports.initEditorWithArcballCamera = initEditorWithArcballCamera;
/* DefaultSceneUtils-WonderEditor Not a pure module */
