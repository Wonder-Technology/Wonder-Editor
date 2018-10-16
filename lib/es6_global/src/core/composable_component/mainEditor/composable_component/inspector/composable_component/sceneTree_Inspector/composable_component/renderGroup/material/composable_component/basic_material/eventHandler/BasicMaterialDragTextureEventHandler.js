

import * as EventHandler$WonderEditor from "../../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as OperateBasicMaterialLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/OperateBasicMaterialLogicService.js";
import * as MaterialDragTextureEventHandlerUtils$WonderEditor from "../../utils/MaterialDragTextureEventHandlerUtils.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _handleSetMap(_, materialComponent, textureIndex, engineState) {
  var match = BasicMaterialEngineService$WonderEditor.getBasicMaterialMap(materialComponent, engineState);
  if (match !== undefined) {
    return OperateTextureLogicService$WonderEditor.changeTextureMapAndRefreshEngineState(materialComponent, textureIndex, OperateBasicMaterialLogicService$WonderEditor.setBasicMaterialMapToEngineState, engineState);
  } else {
    return OperateTextureLogicService$WonderEditor.handleMaterialComponentFromNoMapToHasMap(/* tuple */[
                materialComponent,
                textureIndex
              ], /* tuple */[
                BasicMaterialEngineService$WonderEditor.setBasicMaterialMap,
                BasicMaterialEngineService$WonderEditor.reInitAllBasicMaterialsAndClearShaderCache
              ], engineState);
  }
}

function handleSelfLogic(param, materialComponent, dragedId) {
  return MaterialDragTextureEventHandlerUtils$WonderEditor.handleSelfLogic(/* tuple */[
              param[0],
              param[1]
            ], materialComponent, dragedId, _handleSetMap);
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _handleSetMap */_handleSetMap,
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
