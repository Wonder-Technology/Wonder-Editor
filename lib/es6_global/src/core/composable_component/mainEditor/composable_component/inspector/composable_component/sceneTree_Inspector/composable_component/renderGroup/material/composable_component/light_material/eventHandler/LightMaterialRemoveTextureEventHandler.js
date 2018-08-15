

import * as Curry from "../../../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../../../../../../../../../../service/stateTuple/logic/OperateLightMaterialLogicService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, materialComponent) {
  OperateTextureLogicService$WonderEditor.replaceMaterialComponentFromHasMapToNoMap(/* tuple */[
        StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode),
        materialComponent
      ], StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
              return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(materialComponent, param);
            })), /* tuple */[
        OperateLightMaterialLogicService$WonderEditor.disposeLightMaterial,
        OperateLightMaterialLogicService$WonderEditor.setLightMaterialColor,
        OperateLightMaterialLogicService$WonderEditor.createLightMaterial,
        OperateLightMaterialLogicService$WonderEditor.addLightMaterial
      ]);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */1]]
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
