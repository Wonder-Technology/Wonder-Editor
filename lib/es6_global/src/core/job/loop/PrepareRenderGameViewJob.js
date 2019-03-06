

import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as IMGUIEditorService$WonderEditor from "../../../service/state/editor/imgui/IMGUIEditorService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as ManageIMGUIEngineService$WonderEditor from "../../../service/state/engine/ManageIMGUIEngineService.js";
import * as PrepareRenderViewJobUtils$WonderEditor from "../../utils/engine/job/loop/PrepareRenderViewJobUtils.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function _unactiveAllBasicCameraViews(editorState, engineState) {
  var __x = PrepareRenderViewJobUtils$WonderEditor.unsafeGetSceneViewNeedActiveBasicCameraView(editorState, engineState);
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
      PrepareRenderViewJobUtils$WonderEditor.activeViewCamera(gameViewRect, activeBasicCameraView$1, GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(__x, engineState), engineState)
    ];
  } else {
    match = _unactiveAllBasicCameraViews(editorState, engineState);
  }
  StateEditorService$WonderEditor.setState(match[0]);
  return match[1];
}

function _setEmptyIMGUIFunc(engineState) {
  return ManageIMGUIEngineService$WonderEditor.setIMGUIFunc(-1, (function (param, apiJsObj, engineState) {
                return engineState;
              }), engineState);
}

function prepareRenderGameViewJob(param, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var gameViewRect = GameViewEditorService$WonderEditor.getViewRect(editorState);
  var param$1 = PrepareRenderViewJobUtils$WonderEditor.markIsRenderSceneViewGameObjects(false, editorState, PrepareRenderViewJobUtils$WonderEditor.prepareRenderViewJob(OptionService$WonderEditor.unsafeGet(gameViewRect), _activeGameViewCamera, engineState));
  var engineState$1 = param$1[1];
  var editorState$1 = param$1[0];
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
  _unactiveAllBasicCameraViews ,
  _activeGameViewCamera ,
  _setEmptyIMGUIFunc ,
  prepareRenderGameViewJob ,
  
}
/* OptionService-WonderEditor Not a pure module */
