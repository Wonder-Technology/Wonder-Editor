

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as IMGUIEditorService$WonderEditor from "../../../service/state/editor/imgui/IMGUIEditorService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as SceneViewIMGUIUtils$WonderEditor from "../../utils/engine/job/loop/SceneViewIMGUIUtils.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as ManageIMGUIEngineService$WonderEditor from "../../../service/state/engine/ManageIMGUIEngineService.js";
import * as PrepareRenderViewJobUtils$WonderEditor from "../../utils/engine/job/loop/PrepareRenderViewJobUtils.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function _activeSceneViewCamera(engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var sceneViewRect = SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
  var activeBasicCameraView = PrepareRenderViewJobUtils$WonderEditor.unsafeGetSceneViewNeedActiveBasicCameraView(editorState, engineState);
  var __x = BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(activeBasicCameraView, engineState);
  return PrepareRenderViewJobUtils$WonderEditor.activeViewCamera(sceneViewRect, activeBasicCameraView, GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(__x, engineState), engineState);
}

function _setSceneViewIMGUIFunc(editorState, engineState) {
  var engineStateCustomData = SceneViewIMGUIUtils$WonderEditor.buildCustomData(editorState, engineState);
  var engineStateImguiFunc = SceneViewIMGUIUtils$WonderEditor.buildIMGUIFunc(/* () */0);
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
  var match = PrepareRenderViewJobUtils$WonderEditor.markIsRenderSceneViewGameObjects(true, editorState, PrepareRenderViewJobUtils$WonderEditor.prepareRenderViewJob(OptionService$WonderEditor.unsafeGet(sceneViewRect), _activeSceneViewCamera, engineState));
  var match$1 = _setSceneViewIMGUIFunc(match[0], match[1]);
  StateEditorService$WonderEditor.setState(match$1[0]);
  return match$1[1];
}

export {
  _activeSceneViewCamera ,
  _setSceneViewIMGUIFunc ,
  prepareRenderSceneViewJob ,
  
}
/* OptionService-WonderEditor Not a pure module */
