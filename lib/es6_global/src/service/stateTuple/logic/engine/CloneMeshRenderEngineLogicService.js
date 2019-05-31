

import * as MeshRendererEngineService$WonderEditor from "../../../state/engine/MeshRendererEngineService.js";
import * as CloneValueEngineLogicService$WonderEditor from "./CloneValueEngineLogicService.js";

function cloneMeshRendererToOtherEngineState(clonedMeshRenderer, clonedEngineState, targetEngineState) {
  var match = MeshRendererEngineService$WonderEditor.create(targetEngineState);
  var newMeshRenderer = match[1];
  var targetEngineState$1 = CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(MeshRendererEngineService$WonderEditor.getDrawMode, MeshRendererEngineService$WonderEditor.setDrawMode, newMeshRenderer, /* tuple */[
        clonedMeshRenderer,
        clonedEngineState
      ], match[0]);
  return /* tuple */[
          newMeshRenderer,
          targetEngineState$1
        ];
}

export {
  cloneMeshRendererToOtherEngineState ,
  
}
/* MeshRendererEngineService-WonderEditor Not a pure module */
