

import * as EventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as TextureFilterUtils$WonderEditor from "../utils/TextureFilterUtils.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function handleSelfLogic(_, _$1, param) {
  TextureFilterUtils$WonderEditor.changeMinFilter(param[0], param[1]);
  return /* () */0;
}

function setUndoValueToCopiedEngineState(_, _$1, param) {
  return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(true, param[0], StateEngineService$WonderEditor.deepCopyForRestore(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

var CustomEventHandler = /* module */[
  /* handleSelfLogic */handleSelfLogic,
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler(CustomEventHandler);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
