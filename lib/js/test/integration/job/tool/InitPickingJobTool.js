'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var EventTool$WonderEditor = require("./EventTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var MouseEventTool$WonderEditor = require("./MouseEventTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var CameraLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/CameraLogicService.js");
var SceneEngineService$WonderEditor = require("../../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var GeometryEngineService$WonderEditor = require("../../../../src/service/state/engine/GeometryEngineService.js");
var SceneTreeEditorService$WonderEditor = require("../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js");
var SceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js");
var TransformEngineService$WonderEditor = require("../../../../src/service/state/engine/TransformEngineService.js");
var GameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var PrepareRenderViewJobTool$WonderEditor = require("./PrepareRenderViewJobTool.js");
var RenderGroupEngineService$WonderEditor = require("../../../../src/service/state/engine/RenderGroupEngineService.js");
var MeshRendererEngineService$WonderEditor = require("../../../../src/service/state/engine/MeshRendererEngineService.js");
var LightMaterialEngineService$WonderEditor = require("../../../../src/service/state/engine/LightMaterialEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var PerspectiveCameraProjectionEngineService$WonderEditor = require("../../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js");

function prepareStateAndView(sandbox, viewWidth, viewHeight, noWorkerJobRecord, $staropt$star, param) {
  var isInitState = $staropt$star !== undefined ? $staropt$star : true;
  if (isInitState) {
    MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, noWorkerJobRecord, undefined, undefined, false, undefined, /* () */0);
  }
  return PrepareRenderViewJobTool$WonderEditor.setViewRect((viewWidth << 1), viewHeight, /* () */0);
}

function prepareMouseEvent(sandbox, noWorkerJobRecord, viewWidth, viewHeight, offsetLeft, offsetTop, $staropt$star, $staropt$star$1, param) {
  var offsetParent = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var isInitState = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  prepareStateAndView(sandbox, viewWidth, viewHeight, noWorkerJobRecord, isInitState, /* () */0);
  MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), viewWidth, viewHeight, offsetLeft, offsetTop, Caml_option.some(offsetParent), undefined, undefined, /* () */0);
  MouseEventTool$WonderEditor.prepareForPointerLock(sandbox, undefined, /* () */0);
  MouseEventTool$WonderEditor.setPointerLocked();
  return /* tuple */[
          /* tuple */[
            viewWidth,
            viewHeight
          ],
          /* tuple */[
            offsetLeft,
            offsetTop
          ]
        ];
}

function createGameObject(geometry, engineState) {
  var match = LightMaterialEngineService$WonderEditor.create(engineState);
  var match$1 = GameObjectEngineService$WonderEditor.create(match[0]);
  var obj = match$1[1];
  var engineState$1 = match$1[0];
  GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(obj, engineState$1);
  var match$2 = MeshRendererEngineService$WonderEditor.create(engineState$1);
  var renderGroup = RenderGroupEngineService$WonderEditor.buildRenderGroup(match$2[1], match[1]);
  var engineState$2 = RenderGroupEngineService$WonderEditor.addRenderGroupComponents(obj, renderGroup, /* tuple */[
        GameObjectComponentEngineService$WonderEditor.addMeshRendererComponent,
        GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent
      ], GameObjectComponentEngineService$WonderEditor.addGeometryComponent(obj, geometry, GameObjectEngineService$WonderEditor.setGameObjectName("gameObject", obj, match$2[0])));
  return /* tuple */[
          engineState$2,
          obj
        ];
}

function createSphere(engineState) {
  var match = GeometryEngineService$WonderEditor.createSphereGeometry(1, 10, engineState);
  return createGameObject(match[1], match[0]);
}

function createCube(engineState) {
  var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState);
  return createGameObject(match[1], match[0]);
}

function prepareCamera(cameraPos, param, param$1) {
  var match = CameraLogicService$WonderEditor.createCamera(param$1[0], param$1[1]);
  var editCamera = match[2];
  var engineState = match[1];
  var editCameraPerspectiveCameraProjection = GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(editCamera, engineState);
  var engineState$1 = PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFar(50000, editCameraPerspectiveCameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraNear(0.1, editCameraPerspectiveCameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraFovy(60, editCameraPerspectiveCameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(param[0] / param[1], editCameraPerspectiveCameraProjection, engineState))));
  var editorState = SceneViewEditorService$WonderEditor.setEditCamera(editCamera, match[0]);
  var editCameraTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(editCamera, engineState$1);
  var engineState$2 = TransformEngineService$WonderEditor.setLocalPosition(cameraPos, editCameraTransform, engineState$1);
  var engineState$3 = TransformEngineService$WonderEditor.lookAt(editCameraTransform, /* tuple */[
        0,
        0,
        0
      ], engineState$2);
  return /* tuple */[
          editCamera,
          /* tuple */[
            editorState,
            engineState$3
          ]
        ];
}

function prepareGameObject(gameObjectPos, gameObjectEulerAngles, createGameObjectFunc, engineState) {
  var match = Curry._1(createGameObjectFunc, engineState);
  var gameObject = match[1];
  var engineState$1 = match[0];
  var gameObjectTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState$1);
  var sceneGameObject = SceneEngineService$WonderEditor.getSceneGameObject(engineState$1);
  var engineState$2 = HierarchyGameObjectEngineService$WonderEditor.addChild(sceneGameObject, gameObject, engineState$1);
  var engineState$3 = TransformEngineService$WonderEditor.setLocalEulerAngles(gameObjectEulerAngles, gameObjectTransform, TransformEngineService$WonderEditor.setLocalPosition(gameObjectPos, gameObjectTransform, engineState$2));
  return /* tuple */[
          engineState$3,
          gameObject
        ];
}

function prepareState(sandbox, editorState, engineState) {
  StateEditorService$WonderEditor.setState(editorState);
  StateEngineService$WonderEditor.setState(engineState);
  StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
  StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
  return StateLogicService$WonderEditor.getAndSetEditorState(SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode);
}

function triggerPicking($staropt$star, sandbox, pageX, pageY, param) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  var target = EventTool$WonderEditor.buildCanvasTarget(/* () */0);
  EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(target), /* () */0));
  EventTool$WonderEditor.triggerDomEvent("mouseup", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(target), /* () */0));
  return EventTool$WonderEditor.triggerDomEvent("click", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(target), /* () */0));
}

function triggerPickingAndRestore($staropt$star, sandbox, pageX, pageY, param) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  triggerPicking(eventButton, sandbox, pageX, pageY, /* () */0);
  return EventTool$WonderEditor.restore(/* () */0);
}

function pickOne(gameObject) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState)), gameObject);
}

function notPick(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState))), true);
}

function buildDefaultNoWorkerJobRecord(param) {
  return NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            },\n            {\n              \"name\": \"init_picking\"\n            }\n          ]\n        }\n      ]\n            ", undefined, undefined, undefined, /* () */0);
}

function prepareWithoutState(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, $staropt$star, $staropt$star$1, param) {
  var isInitState = $staropt$star !== undefined ? $staropt$star : true;
  var noWorkerJobRecord = $staropt$star$1 !== undefined ? $staropt$star$1 : buildDefaultNoWorkerJobRecord(/* () */0);
  var match = prepareMouseEvent(sandbox, noWorkerJobRecord, viewWidth, viewHeight, offsetLeft, offsetTop, undefined, isInitState, /* () */0);
  var match$1 = match[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$2 = prepareCamera(cameraPos, /* tuple */[
        match$1[0],
        match$1[1]
      ], /* tuple */[
        editorState,
        engineState
      ]);
  var match$3 = match$2[1];
  return /* tuple */[
          match$3[0],
          match$3[1]
        ];
}

function prepare(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, $staropt$star, $staropt$star$1, param) {
  if ($staropt$star$1 === undefined) {
    buildDefaultNoWorkerJobRecord(/* () */0);
  }
  var match = prepareWithoutState(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, true, buildDefaultNoWorkerJobRecord(/* () */0), /* () */0);
  return prepareState(sandbox, match[0], match[1]);
}

function prepareOneGameObject($staropt$star, sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, gameObjectPos, gameObjectEulerAngles, param) {
  var createGameObjectFunc = $staropt$star !== undefined ? $staropt$star : createSphere;
  prepare(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, undefined, undefined, /* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return prepareGameObject(gameObjectPos, gameObjectEulerAngles, createGameObjectFunc, engineState)[1];
}

function prepareTwoGameObjects(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, gameObject1Pos, gameObject1EulerAngles, gameObject2Pos, gameObject2EulerAngles, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var createGameObjectFunc1 = $staropt$star !== undefined ? $staropt$star : createSphere;
  var createGameObjectFunc2 = $staropt$star$1 !== undefined ? $staropt$star$1 : createSphere;
  var noWorkerJobRecord = $staropt$star$2 !== undefined ? $staropt$star$2 : buildDefaultNoWorkerJobRecord(/* () */0);
  var match = prepareMouseEvent(sandbox, noWorkerJobRecord, viewWidth, viewHeight, offsetLeft, offsetTop, undefined, undefined, /* () */0);
  var match$1 = match[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$2 = prepareCamera(cameraPos, /* tuple */[
        match$1[0],
        match$1[1]
      ], /* tuple */[
        editorState,
        engineState
      ]);
  var match$3 = match$2[1];
  var match$4 = prepareGameObject(gameObject1Pos, gameObject1EulerAngles, createGameObjectFunc1, match$3[1]);
  var match$5 = prepareGameObject(gameObject2Pos, gameObject2EulerAngles, createGameObjectFunc2, match$4[0]);
  prepareState(sandbox, match$3[0], match$5[0]);
  return /* tuple */[
          match$4[1],
          match$5[1]
        ];
}

exports.prepareStateAndView = prepareStateAndView;
exports.prepareMouseEvent = prepareMouseEvent;
exports.createGameObject = createGameObject;
exports.createSphere = createSphere;
exports.createCube = createCube;
exports.prepareCamera = prepareCamera;
exports.prepareGameObject = prepareGameObject;
exports.prepareState = prepareState;
exports.triggerPicking = triggerPicking;
exports.triggerPickingAndRestore = triggerPickingAndRestore;
exports.pickOne = pickOne;
exports.notPick = notPick;
exports.buildDefaultNoWorkerJobRecord = buildDefaultNoWorkerJobRecord;
exports.prepareWithoutState = prepareWithoutState;
exports.prepare = prepare;
exports.prepareOneGameObject = prepareOneGameObject;
exports.prepareTwoGameObjects = prepareTwoGameObjects;
/* Wonder_jest Not a pure module */
