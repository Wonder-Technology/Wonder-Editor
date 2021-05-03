

import * as Curry from "../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as MaterialDragTextureEventHandlerUtils$WonderEditor from "../../../../../../sceneTree_Inspector/composable_component/renderGroup/material/composable_component/utils/MaterialDragTextureEventHandlerUtils.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function _handleSetMap(materialComponent, textureComponent, engineState) {
  var match = LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(materialComponent, engineState);
  if (match !== undefined) {
    return OperateTextureLogicService$WonderEditor.changeTextureMapAndRefreshEngineState(materialComponent, textureComponent, LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap, engineState);
  } else {
    return OperateTextureLogicService$WonderEditor.handleMaterialComponentFromNoMapToHasMap(/* tuple */[
                materialComponent,
                textureComponent
              ], /* tuple */[
                LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap,
                LightMaterialEngineService$WonderEditor.reInitLightMaterialsAndClearShaderCache
              ], engineState);
  }
}

function handleSelfLogic(param, param$1, draggedNodeId) {
  var dispatchFunc = param[1];
  MaterialDragTextureEventHandlerUtils$WonderEditor.handleSelfLogic(/* tuple */[
        param[0],
        dispatchFunc
      ], param$1[0], draggedNodeId, _handleSetMap);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */2]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* _handleSetMap */_handleSetMap,
  /* handleSelfLogic */handleSelfLogic
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
