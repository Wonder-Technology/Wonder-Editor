

import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MouseEventTool$WonderEditor from "./MouseEventTool.js";
import * as Vector3Service$WonderEditor from "../../../../src/service/primitive/Vector3Service.js";
import * as InitPickingJobTool$WonderEditor from "./InitPickingJobTool.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as TranasformToolEngine$WonderEditor from "../../../tool/engine/TranasformToolEngine.js";
import * as InitTransformGizmosJob$WonderEditor from "../../../../src/core/job/init/InitTransformGizmosJob.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../src/service/state/engine/TransformEngineService.js";
import * as PrepareRenderViewJobTool$WonderEditor from "./PrepareRenderViewJobTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";

function prepareStateAndView(sandbox, viewWidth, viewHeight) {
  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            },\n            {\n              \"name\": \"init_transform_gizmos\"\n            },\n            {\n              \"name\": \"init_picking\"\n            }\n          ]\n        }\n      ]\n            ", "\n              [\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"update_transform_gizmos\"\n            },\n            {\n                \"name\": \"update_transform\"\n            }\n        ]\n    }\n]\n              ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
  return PrepareRenderViewJobTool$WonderEditor.setViewRect((viewWidth << 1), viewHeight, /* () */0);
}

function prepareMouseEvent(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, $staropt$star, param) {
  var offsetParent = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  prepareStateAndView(sandbox, viewWidth, viewHeight);
  MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), viewWidth, viewHeight, offsetLeft, offsetTop, Caml_option.some(offsetParent), undefined, /* () */0);
  MouseEventTool$WonderEditor.prepareForPointerLock(sandbox);
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

export {
  prepareStateAndView ,
  prepareMouseEvent ,
  prepareOneGameObject ,
  getCurrentSceneTreeNodePosition ,
  getGameObjectLocalRotation ,
  getGameObjectEulerAngles ,
  getGameObjectLocalEulerAngles ,
  getGameObjectLocalScale ,
  getCurrentSceneTreeNodeEulerAngles ,
  getCurrentSceneTreeNodeLocalRotation ,
  getCurrentSceneTreeNodeLocalScale ,
  createTransformGizmos ,
  
}
/* MouseEventTool-WonderEditor Not a pure module */
