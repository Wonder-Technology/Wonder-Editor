

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../ui/store/AppStore.js";
import * as ConsoleUtils$WonderEditor from "../../../../../utils/ui/ConsoleUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../../utils/language/LanguageUtils.js";
import * as JobEngineService$WonderEditor from "../../../../../../service/state/engine/job/JobEngineService.js";
import * as DefaultSceneUtils$WonderEditor from "../../../../../utils/engine/DefaultSceneUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../service/state/editor/LanguageEditorService.js";
import * as InspectorEditorService$WonderEditor from "../../../../../../service/state/editor/inspector/InspectorEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../../../../service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as SceneTreeSelectCurrentNodeUtils$WonderEditor from "../../../../mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneTreeSelectCurrentNodeUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as ScriptEventFunctionEngineService$WonderEditor from "../../../../../../service/state/engine/script/ScriptEventFunctionEngineService.js";

function initEditorJob(param, engineState) {
  var engineState$1 = ScriptEventFunctionEngineService$WonderEditor.disableScriptEventFunction(engineState);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareSpecificGameObjects(editorState, engineState$1);
  var match$1 = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(match[0], match[1]);
  var match$2 = DefaultSceneUtils$WonderEditor.createDefaultScene(match$1[2], match$1[0], match$1[1]);
  var engineState$2 = match$2[1];
  var editorState$1 = GameViewEditorService$WonderEditor.setActivedBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match$2[2], engineState$2), match$2[0]);
  StateEditorService$WonderEditor.setState(InspectorEditorService$WonderEditor.addSceneGameObjectComponentTypeToMap(SceneEngineService$WonderEditor.getSceneGameObject(engineState$2), editorState$1));
  return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match[2], engineState$2), engineState$2);
}

function handleNewScene(dispatchFunc, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    ConsoleUtils$WonderEditor.warn(LanguageUtils$WonderEditor.getMessageLanguageDataByType("should-in-stop", LanguageEditorService$WonderEditor.unsafeGetType(editorState)), editorState);
    return /* tuple */[
            editorState,
            engineState
          ];
  } else {
    var engineState$1 = JobEngineService$WonderEditor.execDisposeJob(SceneEngineService$WonderEditor.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial(engineState));
    var match$1 = DefaultSceneUtils$WonderEditor.createDefaultScene(GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState), editorState, engineState$1);
    var engineState$2 = match$1[1];
    var editorState$1 = GameViewEditorService$WonderEditor.setActivedBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match$1[2], engineState$2), match$1[0]);
    var engineState$3 = BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState$1), engineState$2), engineState$2);
    StateEditorService$WonderEditor.setState(SceneTreeSelectCurrentNodeUtils$WonderEditor.clearCurrentData(editorState$1));
    var engineState$4 = StateLogicService$WonderEditor.renderEngineStateAndReturnEngineState(engineState$3);
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[
              /* SceneTree */6,
              /* Inspector */2
            ]]
        ]);
    return /* tuple */[
            StateEditorService$WonderEditor.getState(/* () */0),
            engineState$4
          ];
  }
}

export {
  initEditorJob ,
  handleNewScene ,
  
}
/* AppStore-WonderEditor Not a pure module */
