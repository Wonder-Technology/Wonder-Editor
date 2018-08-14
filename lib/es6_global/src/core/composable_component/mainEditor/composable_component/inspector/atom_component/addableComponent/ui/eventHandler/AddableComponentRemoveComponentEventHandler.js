

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as Index from "antd/lib/message/index";
import * as HeaderUtils$WonderEditor from "../../../../../../../header/utils/HeaderUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../service/state/editor/StateEditorService.js";
import * as InspectorRemoveComponentUtils$WonderEditor from "../../../../utils/InspectorRemoveComponentUtils.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/OperateLightMaterialLogicService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _isCanbeRemoveCameraGroup(type_) {
  var match = type_ === /* CameraGroup */4;
  if (match) {
    return HeaderUtils$WonderEditor.doesSceneHasRemoveableCamera(/* () */0);
  } else {
    return true;
  }
}

function _isRemoveLight(type_) {
  return type_ === /* Light */5;
}

function handleSelfLogic(param, currentSceneTreeNode, type_) {
  var match = _isCanbeRemoveCameraGroup(type_);
  if (match) {
    StateLogicService$WonderEditor.setEditEngineState(InspectorRemoveComponentUtils$WonderEditor.removeComponentByTypeForEditEngineState(type_, StateLogicService$WonderEditor.getEditEngineComponent(/* GameObject */0, currentSceneTreeNode), StateLogicService$WonderEditor.getEditEngineState(/* () */0)));
    var match$1 = InspectorRemoveComponentUtils$WonderEditor.removeComponentByTypeForRunEngineState(type_, currentSceneTreeNode, /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateLogicService$WonderEditor.getRunEngineState(/* () */0)
        ]);
    StateLogicService$WonderEditor.setRunEngineState(match$1[1]);
    StateEditorService$WonderEditor.setState(match$1[0]);
    var match$2 = type_ === /* Light */5;
    if (match$2) {
      StateLogicService$WonderEditor.getAndRefreshEditAndRunEngineState(/* () */0);
      StateLogicService$WonderEditor.getAndSetEditAndRunEngineState(OperateLightMaterialLogicService$WonderEditor.reInitAllMaterials);
    }
    StateLogicService$WonderEditor.getAndRefreshEditAndRunEngineState(/* () */0);
    Curry._1(param[1], [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* Inspector */1]]
        ]);
    return /* () */0;
  } else {
    var messageObj = Index.default;
    messageObj.warn("can't remove last camera !", 4);
    return /* () */0;
  }
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _isCanbeRemoveCameraGroup */_isCanbeRemoveCameraGroup,
  /* _isRemoveLight */_isRemoveLight,
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
