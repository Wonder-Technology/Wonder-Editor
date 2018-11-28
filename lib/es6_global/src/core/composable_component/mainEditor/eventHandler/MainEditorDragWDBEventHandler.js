

import * as EventHandler$WonderEditor from "../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as SceneEditorService$WonderEditor from "../../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";
import * as DragWDBEventHandlerUtils$WonderEditor from "../../../utils/DragWDBEventHandlerUtils.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, wdbGameObjectUid) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = SceneEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  return DragWDBEventHandlerUtils$WonderEditor.handleSelfLogic(/* tuple */[
              param[0],
              param[1]
            ], /* () */0, /* tuple */[
              match !== undefined ? match : SceneEngineService$WonderEditor.getSceneGameObject(engineState),
              wdbGameObjectUid
            ]);
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
