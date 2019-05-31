

import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as TextureFilterUtils$WonderEditor from "../utils/TextureFilterUtils.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as SourceTextureCacheInspectorCanvasLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/inspectorCanvas/SourceTextureCacheInspectorCanvasLogicService.js";

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function handleSelfLogic(param, param$1, param$2) {
  var textureComponent = param$2[0];
  TextureFilterUtils$WonderEditor.changeMagFilter(textureComponent, param$2[1]);
  var partial_arg = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return SourceTextureCacheInspectorCanvasLogicService$WonderEditor.removeCache(textureComponent, partial_arg, param);
        }));
  return /* () */0;
}

function setUndoValueToCopiedEngineState(param, param$1, param$2) {
  return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(true, param$2[0], StateEngineService$WonderEditor.deepCopyForRestore(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* handleSelfLogic */handleSelfLogic,
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState,
      setUndoValueToCopiedEngineStateForPromise
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
