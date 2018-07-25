

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../service/state/engine/DirectionLightEngineService.js";
import * as SourceInstanceEngineService$WonderEditor from "../../../../../../service/state/engine/SourceInstanceEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function addComponentByType(type_, currentSceneTreeNode, engineState) {
  switch (type_) {
    case "light" : 
        var match = DirectionLightEngineService$WonderEditor.create(engineState);
        return GameObjectComponentEngineService$WonderEditor.addDirectionLightComponent(currentSceneTreeNode, match[1], match[0]);
    case "sourceInstance" : 
        var match$1 = SourceInstanceEngineService$WonderEditor.create(engineState);
        return GameObjectComponentEngineService$WonderEditor.addSourceInstanceComponent(currentSceneTreeNode, match$1[1], match$1[0]);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addComponentByType", "the type:" + (String(type_) + " is not find"), "", "", "type:" + (String(type_) + (" , currentSceneTreeNode:" + (String(currentSceneTreeNode) + "")))));
  }
}

export {
  addComponentByType ,
  
}
/* Log-WonderLog Not a pure module */
