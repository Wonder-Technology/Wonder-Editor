

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../ui/store/AppStore.js";
import * as FloatService$WonderEditor from "../../../../../../../../../../service/atom/FloatService.js";
import * as UIStateService$WonderEditor from "../../../../../../../../../../service/state/ui/UIStateService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as TransformEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/transform/TransformEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function truncateTransformValue(param) {
  return /* tuple */[
          FloatService$WonderEditor.truncateFloatValue(param[0], 5),
          FloatService$WonderEditor.truncateFloatValue(param[1], 5),
          FloatService$WonderEditor.truncateFloatValue(param[2], 5)
        ];
}

var getSceneTreeNodeLocalPosition = TransformEngineService$WonderEditor.getLocalPosition;

function getTransformPositionData(transformComponent, engineState) {
  return truncateTransformValue(TransformEngineService$WonderEditor.getLocalPosition(transformComponent, engineState));
}

function getTransformScaleData(transformComponent, engineState) {
  return truncateTransformValue(TransformEngineService$WonderEditor.getLocalScale(transformComponent, engineState));
}

function getTransformRotationData(transformComponent, engineState) {
  var match = TransformEditorService$WonderEditor.getLocalEulerAngleAndInit(transformComponent, /* tuple */[
        StateEditorService$WonderEditor.getState(/* () */0),
        engineState
      ]);
  StateEditorService$WonderEditor.setState(match[1]);
  return truncateTransformValue(match[0]);
}

function refreshTransformWithDispatchFunc(dispatchFunc, param) {
  var engineState = param[1];
  var editorState = param[0];
  var editorState$1 = TransformEditorService$WonderEditor.removeLocalEulerAngleData(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), editorState);
  StateEditorService$WonderEditor.setState(editorState$1);
  StateEngineService$WonderEditor.setState(engineState);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */2]]
      ]);
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateEngineService$WonderEditor.unsafeGetState(/* () */0)
        ];
}

function refreshTransform(param) {
  return refreshTransformWithDispatchFunc(UIStateService$WonderEditor.getDispatch(/* () */0), /* tuple */[
              param[0],
              param[1]
            ]);
}

export {
  truncateTransformValue ,
  getSceneTreeNodeLocalPosition ,
  getTransformPositionData ,
  getTransformScaleData ,
  getTransformRotationData ,
  refreshTransformWithDispatchFunc ,
  refreshTransform ,
  
}
/* AppStore-WonderEditor Not a pure module */
