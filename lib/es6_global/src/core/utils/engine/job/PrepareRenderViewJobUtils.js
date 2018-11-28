

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$WonderEditor from "../../../../service/primitive/OptionService.js";
import * as EditIMGUIFuncUtils$WonderEditor from "../EditIMGUIFuncUtils.js";
import * as IMGUIEditorService$WonderEditor from "../../../../service/state/editor/imgui/IMGUIEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as ManageIMGUIEngineService$WonderEditor from "../../../../service/state/engine/ManageIMGUIEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../service/state/engine/MeshRendererEngineService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../service/state/engine/DeviceManagerEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../../service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

function _computeAspect(param) {
  return param[2] / param[3];
}

function _activeViewCamera(viewRect, viewActiveBasicCameraView, viewActivePerspectiveCameraProjection, engineState) {
  var match = PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraAspect(viewActivePerspectiveCameraProjection, engineState);
  var engineState$1 = match !== undefined ? engineState : PerspectiveCameraProjectionEngineService$WonderEditor.markPerspectiveCameraProjectionNotDirty(viewActivePerspectiveCameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.removePerspectiveCameraAspect(viewActivePerspectiveCameraProjection, PerspectiveCameraProjectionEngineService$WonderEditor.updatePerspectiveCameraProjection(PerspectiveCameraProjectionEngineService$WonderEditor.setPerspectiveCameraAspect(_computeAspect(viewRect), viewActivePerspectiveCameraProjection, engineState))));
  return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(viewActiveBasicCameraView, engineState$1);
}

function _unsafeGetSceneViewNeedActiveBasicCameraView(editorState, engineState) {
  var __x = SceneViewEditorService$WonderEditor.unsafeGetNeedActiveCamera(editorState);
  return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(__x, engineState);
}

function _activeSceneViewCamera(engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var sceneViewRect = SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
  var activeBasicCameraView = _unsafeGetSceneViewNeedActiveBasicCameraView(editorState, engineState);
  var __x = BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(activeBasicCameraView, engineState);
  return _activeViewCamera(sceneViewRect, activeBasicCameraView, GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(__x, engineState), engineState);
}

function _unactiveAllBasicCameraViews(editorState, engineState) {
  var __x = _unsafeGetSceneViewNeedActiveBasicCameraView(editorState, engineState);
  return /* tuple */[
          editorState,
          BasicCameraViewEngineService$WonderEditor.unactiveBasicCameraView(__x, engineState)
        ];
}

function _activeGameViewCamera(engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var gameViewRect = GameViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
  var activeBasicCameraView = GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState);
  var match;
  if (activeBasicCameraView !== undefined) {
    var activeBasicCameraView$1 = activeBasicCameraView;
    var __x = BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(activeBasicCameraView$1, engineState);
    match = /* tuple */[
      editorState,
      _activeViewCamera(gameViewRect, activeBasicCameraView$1, GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(__x, engineState), engineState)
    ];
  } else {
    match = _unactiveAllBasicCameraViews(editorState, engineState);
  }
  StateEditorService$WonderEditor.setState(match[0]);
  return match[1];
}

function _prepareRenderViewJob(viewRect, _activeViewCameraFunc, engineState) {
  return ManageIMGUIEngineService$WonderEditor.sendUniformProjectionMatData(/* tuple */[
              viewRect[2],
              viewRect[3]
            ], Curry._1(_activeViewCameraFunc, DeviceManagerEngineService$WonderEditor.setScissor(viewRect, DeviceManagerEngineService$WonderEditor.setScissorTest(true, DeviceManagerEngineService$WonderEditor.setViewport(viewRect, engineState)))));
}

function _markIsRenderSceneViewGameObjects(isRender, editorState, engineState) {
  var __x = SceneViewEditorService$WonderEditor.unsafeGetGridPlane(editorState);
  var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x, engineState);
  return /* tuple */[
          editorState,
          MeshRendererEngineService$WonderEditor.setMeshRendererIsRender(__x$1, isRender, engineState)
        ];
}

function _setSceneViewIMGUIFunc(editorState, engineState) {
  var engineStateCustomData = EditIMGUIFuncUtils$WonderEditor.getEngineStateCustomData(editorState, engineState);
  var engineStateImguiFunc = EditIMGUIFuncUtils$WonderEditor.getEngineStateIMGUIFunc(/* () */0);
  var match = IMGUIEditorService$WonderEditor.getGameViewIMGUIFunc(editorState);
  var engineState$1 = match !== undefined ? ManageIMGUIEngineService$WonderEditor.setIMGUIFunc(/* tuple */[
          /* tuple */[
            engineStateCustomData,
            engineStateImguiFunc
          ],
          /* tuple */[
            Js_primitive.valFromOption(match),
            IMGUIEditorService$WonderEditor.unsafeGetGameViewIMGUICustomData(editorState)
          ]
        ], (function (param, apiJsObj, engineState) {
            var match = param[1];
            var match$1 = param[0];
            var engineState$1 = match$1[1](match$1[0], apiJsObj, engineState);
            return match[0](match[1], apiJsObj, engineState$1);
          }), engineState) : ManageIMGUIEngineService$WonderEditor.setIMGUIFunc(engineStateCustomData, engineStateImguiFunc, engineState);
  return /* tuple */[
          editorState,
          engineState$1
        ];
}

function prepareRenderSceneViewJob(_, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var sceneViewRect = SceneViewEditorService$WonderEditor.getViewRect(editorState);
  var match = _markIsRenderSceneViewGameObjects(true, editorState, _prepareRenderViewJob(OptionService$WonderEditor.unsafeGet(sceneViewRect), _activeSceneViewCamera, engineState));
  var match$1 = _setSceneViewIMGUIFunc(match[0], match[1]);
  StateEditorService$WonderEditor.setState(match$1[0]);
  return match$1[1];
}

function _setEmptyIMGUIFunc(engineState) {
  return ManageIMGUIEngineService$WonderEditor.setIMGUIFunc(-1, (function (_, _$1, engineState) {
                return engineState;
              }), engineState);
}

function prepareRenderGameViewJob(_, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var gameViewRect = GameViewEditorService$WonderEditor.getViewRect(editorState);
  var param = _markIsRenderSceneViewGameObjects(false, editorState, _prepareRenderViewJob(OptionService$WonderEditor.unsafeGet(gameViewRect), _activeGameViewCamera, engineState));
  var engineState$1 = param[1];
  var editorState$1 = param[0];
  var match = IMGUIEditorService$WonderEditor.hasGameViewIMGUIData(editorState$1);
  var match$1 = match ? /* tuple */[
      editorState$1,
      ManageIMGUIEngineService$WonderEditor.setIMGUIFunc(IMGUIEditorService$WonderEditor.unsafeGetGameViewIMGUICustomData(editorState$1), IMGUIEditorService$WonderEditor.unsafeGetGameViewIMGUIFunc(editorState$1), engineState$1)
    ] : /* tuple */[
      editorState$1,
      _setEmptyIMGUIFunc(engineState$1)
    ];
  StateEditorService$WonderEditor.setState(match$1[0]);
  return match$1[1];
}

export {
  _computeAspect ,
  _activeViewCamera ,
  _unsafeGetSceneViewNeedActiveBasicCameraView ,
  _activeSceneViewCamera ,
  _unactiveAllBasicCameraViews ,
  _activeGameViewCamera ,
  _prepareRenderViewJob ,
  _markIsRenderSceneViewGameObjects ,
  _setSceneViewIMGUIFunc ,
  prepareRenderSceneViewJob ,
  _setEmptyIMGUIFunc ,
  prepareRenderGameViewJob ,
  
}
/* OptionService-WonderEditor Not a pure module */
