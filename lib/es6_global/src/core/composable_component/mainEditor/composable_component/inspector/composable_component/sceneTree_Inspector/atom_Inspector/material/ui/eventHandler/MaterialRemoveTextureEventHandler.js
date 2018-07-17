

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/SceneEditorService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";

var execFuncAndGetEngineStateTuple = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function execPrepareUndoFunc(param, _, materialComponent) {
  OperateTextureLogicService$WonderEditor.replaceMaterialComponentToNoMapOne(StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode), materialComponent);
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* execFuncAndGetEngineStateTuple */execFuncAndGetEngineStateTuple,
  /* execPrepareUndoFunc */execPrepareUndoFunc
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      execPrepareUndoFunc,
      execFuncAndGetEngineStateTuple
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
