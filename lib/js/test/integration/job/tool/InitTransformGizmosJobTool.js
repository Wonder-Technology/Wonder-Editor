'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var MouseEventTool$WonderEditor = require("./MouseEventTool.js");
var Vector3Service$WonderEditor = require("../../../../src/service/primitive/Vector3Service.js");
var InitPickingJobTool$WonderEditor = require("./InitPickingJobTool.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var TranasformToolEngine$WonderEditor = require("../../../tool/engine/TranasformToolEngine.js");
var InitTransformGizmosJob$WonderEditor = require("../../../../src/core/job/init/InitTransformGizmosJob.js");
var SceneTreeEditorService$WonderEditor = require("../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js");
var TransformEngineService$WonderEditor = require("../../../../src/service/state/engine/TransformEngineService.js");
var PrepareRenderViewJobTool$WonderEditor = require("./PrepareRenderViewJobTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function prepareStateAndView(sandbox, viewWidth, viewHeight) {
  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            },\n            {\n              \"name\": \"init_transform_gizmos\"\n            },\n            {\n              \"name\": \"init_picking\"\n            }\n          ]\n        }\n      ]\n            ", "\n              [\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"update_transform_gizmos\"\n            },\n            {\n                \"name\": \"update_transform\"\n            }\n        ]\n    }\n]\n              ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
  return PrepareRenderViewJobTool$WonderEditor.setViewRect((viewWidth << 1), viewHeight, /* () */0);
}

function prepareMouseEvent(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, $staropt$star, param) {
  var offsetParent = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  prepareStateAndView(sandbox, viewWidth, viewHeight);
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

function prepareOneGameObject($staropt$star, sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, gameObjectPos, gameObjectEulerAngles, param) {
  var createGameObjectFunc = $staropt$star !== undefined ? $staropt$star : InitPickingJobTool$WonderEditor.createSphere;
  var match = prepareMouseEvent(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, undefined, /* () */0);
  var match$1 = match[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$2 = InitPickingJobTool$WonderEditor.prepareCamera(cameraPos, /* tuple */[
        match$1[0],
        match$1[1]
      ], /* tuple */[
        editorState,
        engineState
      ]);
  var match$3 = match$2[1];
  var match$4 = InitPickingJobTool$WonderEditor.prepareGameObject(gameObjectPos, gameObjectEulerAngles, createGameObjectFunc, match$3[1]);
  InitPickingJobTool$WonderEditor.prepareState(sandbox, match$3[0], match$4[0]);
  return match$4[1];
}

function getCurrentSceneTreeNodePosition(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return Vector3Service$WonderEditor.truncate(3, TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), engineState));
}

function getGameObjectLocalRotation(gameObject) {
  StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var __x = TransformEngineService$WonderEditor.getLocalRotation(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
  return TranasformToolEngine$WonderEditor.truncateRotation(__x, undefined, /* () */0);
}

function getGameObjectEulerAngles(gameObject) {
  StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return Vector3Service$WonderEditor.truncate(1, TransformEngineService$WonderEditor.getEulerAngles(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState));
}

function getGameObjectLocalEulerAngles(gameObject) {
  StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return Vector3Service$WonderEditor.truncate(1, TransformEngineService$WonderEditor.getLocalEulerAngles(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState));
}

function getGameObjectLocalScale(gameObject) {
  StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return Vector3Service$WonderEditor.truncate(1, TransformEngineService$WonderEditor.getLocalScale(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState));
}

function getCurrentSceneTreeNodeEulerAngles(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return getGameObjectEulerAngles(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState));
}

function getCurrentSceneTreeNodeLocalRotation(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return getGameObjectLocalRotation(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState));
}

function getCurrentSceneTreeNodeLocalScale(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return getGameObjectLocalScale(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState));
}

function createTransformGizmos(param) {
  return InitTransformGizmosJob$WonderEditor._createTransformGizmos(/* tuple */[
              param[0],
              param[1]
            ]);
}

exports.prepareStateAndView = prepareStateAndView;
exports.prepareMouseEvent = prepareMouseEvent;
exports.prepareOneGameObject = prepareOneGameObject;
exports.getCurrentSceneTreeNodePosition = getCurrentSceneTreeNodePosition;
exports.getGameObjectLocalRotation = getGameObjectLocalRotation;
exports.getGameObjectEulerAngles = getGameObjectEulerAngles;
exports.getGameObjectLocalEulerAngles = getGameObjectLocalEulerAngles;
exports.getGameObjectLocalScale = getGameObjectLocalScale;
exports.getCurrentSceneTreeNodeEulerAngles = getCurrentSceneTreeNodeEulerAngles;
exports.getCurrentSceneTreeNodeLocalRotation = getCurrentSceneTreeNodeLocalRotation;
exports.getCurrentSceneTreeNodeLocalScale = getCurrentSceneTreeNodeLocalScale;
exports.createTransformGizmos = createTransformGizmos;
/* MouseEventTool-WonderEditor Not a pure module */
