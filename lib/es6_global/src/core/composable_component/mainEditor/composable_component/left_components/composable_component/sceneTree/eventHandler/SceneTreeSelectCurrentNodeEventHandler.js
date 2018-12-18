

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/CurrentNodeDataAssetEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, param$1, uid) {
  StateEditorService$WonderEditor.setState(CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0)));
  StateEditorService$WonderEditor.setState(CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, SceneEditorService$WonderEditor.setCurrentSceneTreeNode(uid, StateEditorService$WonderEditor.getState(/* () */0))));
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* SceneTree */6,
            /* Inspector */2,
            /* Project */4
          ]]
      ]);
  return /* () */0;
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
