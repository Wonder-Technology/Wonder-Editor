

import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as TransformEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/transform/TransformEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function setUndoValueToCopiedEngineState(param, transformComponent, param$1) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var editorState$1 = TransformEditorService$WonderEditor.removeLocalEulerAngleData(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), editorState);
  StateEditorService$WonderEditor.setState(editorState$1);
  return TransformEngineService$WonderEditor.setLocalEulerAngles(/* tuple */[
              param$1[0],
              param$1[1],
              param$1[2]
            ], transformComponent, StateEngineService$WonderEditor.deepCopyForRestore(engineState));
}

var CustomEventHandler_000 = /* handleSelfLogic */EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var CustomEventHandler = /* module */[
  CustomEventHandler_000,
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler(CustomEventHandler);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
