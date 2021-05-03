

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as EventTool$WonderEditor from "./EventTool.js";
import * as MainUtils$WonderEditor from "../../../../src/core/utils/engine/MainUtils.js";
import * as MouseEventTool$WonderEditor from "./MouseEventTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as CameraLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/CameraLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as GeometryEngineService$WonderEditor from "../../../../src/service/state/engine/GeometryEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../src/service/state/engine/TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as PrepareRenderViewJobTool$WonderEditor from "./PrepareRenderViewJobTool.js";
import * as RenderGroupEngineService$WonderEditor from "../../../../src/service/state/engine/RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../src/service/state/engine/MeshRendererEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../src/service/state/engine/LightMaterialEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

function prepareStateAndView(sandbox, viewWidth, viewHeight, noWorkerJobRecord) {
  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, noWorkerJobRecord, undefined, undefined, false, undefined, /* () */0);
  return PrepareRenderViewJobTool$WonderEditor.setViewRect((viewWidth << 1), viewHeight, /* () */0);
}

function prepareMouseEvent(sandbox, noWorkerJobRecord, viewWidth, viewHeight, offsetLeft, offsetTop, $staropt$star, _) {
  var offsetParent = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : undefined;
  prepareStateAndView(sandbox, viewWidth, viewHeight, noWorkerJobRecord);
  MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), viewWidth, viewHeight, offsetLeft, offsetTop, Js_primitive.some(offsetParent), undefined, /* () */0);
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

function prepareState(_, editorState, engineState) {
  StateEditorService$WonderEditor.setState(editorState);
  StateEngineService$WonderEditor.setState(engineState);
  StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
  StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
  return StateLogicService$WonderEditor.getAndSetEditorState(SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode);
}

function triggerPicking($staropt$star, _, pageX, pageY, _$1) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  var target = EventTool$WonderEditor.buildCanvasTarget(/* () */0);
  EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(target), /* () */0));
  EventTool$WonderEditor.triggerDomEvent("mouseup", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(target), /* () */0));
  return EventTool$WonderEditor.triggerDomEvent("click", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(target), /* () */0));
}

function triggerPickingAndRestore($staropt$star, sandbox, pageX, pageY, _) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  triggerPicking(eventButton, sandbox, pageX, pageY, /* () */0);
  return EventTool$WonderEditor.restore(/* () */0);
}

function pickOne(gameObject) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState)), gameObject);
}

function notPick() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState))), true);
}

function buildDefaultNoWorkerJobRecord() {
  return NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            },\n            {\n              \"name\": \"init_picking\"\n            }\n          ]\n        }\n      ]\n            ", undefined, undefined, undefined, /* () */0);
}

function prepare(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, $staropt$star, _) {
  var noWorkerJobRecord = $staropt$star !== undefined ? $staropt$star : buildDefaultNoWorkerJobRecord(/* () */0);
  var match = prepareMouseEvent(sandbox, noWorkerJobRecord, viewWidth, viewHeight, offsetLeft, offsetTop, undefined, /* () */0);
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
  return prepareState(sandbox, match$3[0], match$3[1]);
}

function prepareOneGameObject($staropt$star, sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, gameObjectPos, gameObjectEulerAngles, _) {
  var createGameObjectFunc = $staropt$star !== undefined ? $staropt$star : createSphere;
  prepare(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, undefined, /* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return prepareGameObject(gameObjectPos, gameObjectEulerAngles, createGameObjectFunc, engineState)[1];
}

function prepareTwoGameObjects(sandbox, viewWidth, viewHeight, offsetLeft, offsetTop, cameraPos, gameObject1Pos, gameObject1EulerAngles, gameObject2Pos, gameObject2EulerAngles, $staropt$star, $staropt$star$1, $staropt$star$2, _) {
  var createGameObjectFunc1 = $staropt$star !== undefined ? $staropt$star : createSphere;
  var createGameObjectFunc2 = $staropt$star$1 !== undefined ? $staropt$star$1 : createSphere;
  var noWorkerJobRecord = $staropt$star$2 !== undefined ? $staropt$star$2 : buildDefaultNoWorkerJobRecord(/* () */0);
  var match = prepareMouseEvent(sandbox, noWorkerJobRecord, viewWidth, viewHeight, offsetLeft, offsetTop, undefined, /* () */0);
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

export {
  prepareStateAndView ,
  prepareMouseEvent ,
  createGameObject ,
  createSphere ,
  createCube ,
  prepareCamera ,
  prepareGameObject ,
  prepareState ,
  triggerPicking ,
  triggerPickingAndRestore ,
  pickOne ,
  notPick ,
  buildDefaultNoWorkerJobRecord ,
  prepare ,
  prepareOneGameObject ,
  prepareTwoGameObjects ,
  
}
/* Wonder_jest Not a pure module */
