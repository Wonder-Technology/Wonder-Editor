

import * as BasicMaterialEngineService$WonderEditor from "../../../state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../state/engine/LightMaterialEngineService.js";
import * as CloneValueEngineLogicService$WonderEditor from "./CloneValueEngineLogicService.js";
import * as CloneTextureEngineLogicService$WonderEditor from "./CloneTextureEngineLogicService.js";

function cloneBasicMaterialToOtherEngineState(clonedMaterialComponent, clonedEngineState, targetEngineState) {
  var match = BasicMaterialEngineService$WonderEditor.create(targetEngineState);
  var basicMaterial = match[1];
  var targetEngineState$1 = CloneValueEngineLogicService$WonderEditor.cloneValueByGetOptionValueFunc(BasicMaterialEngineService$WonderEditor.getBasicMaterialName, BasicMaterialEngineService$WonderEditor.setBasicMaterialName, basicMaterial, /* tuple */[
        clonedMaterialComponent,
        clonedEngineState
      ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(BasicMaterialEngineService$WonderEditor.getColor, BasicMaterialEngineService$WonderEditor.setColor, basicMaterial, /* tuple */[
            clonedMaterialComponent,
            clonedEngineState
          ], match[0]));
  return /* tuple */[
          basicMaterial,
          targetEngineState$1
        ];
}

function cloneLightMaterialToOtherEngineState(clonedMaterialComponent, editorState, clonedEngineState, targetEngineState) {
  var match = LightMaterialEngineService$WonderEditor.create(targetEngineState);
  var lightMaterial = match[1];
  var targetEngineState$1 = CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(LightMaterialEngineService$WonderEditor.getLightMaterialShininess, LightMaterialEngineService$WonderEditor.setLightMaterialShininess, lightMaterial, /* tuple */[
        clonedMaterialComponent,
        clonedEngineState
      ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetOptionValueFunc(LightMaterialEngineService$WonderEditor.getLightMaterialName, LightMaterialEngineService$WonderEditor.setLightMaterialName, lightMaterial, /* tuple */[
            clonedMaterialComponent,
            clonedEngineState
          ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor, LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseColor, lightMaterial, /* tuple */[
                clonedMaterialComponent,
                clonedEngineState
              ], match[0])));
  var match$1 = CloneTextureEngineLogicService$WonderEditor.cloneTextureAndAddToMaterial(/* tuple */[
        clonedMaterialComponent,
        lightMaterial
      ], /* tuple */[
        LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap,
        LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap
      ], editorState, clonedEngineState, targetEngineState$1);
  return /* tuple */[
          lightMaterial,
          match$1[0],
          match$1[1]
        ];
}

export {
  cloneBasicMaterialToOtherEngineState ,
  cloneLightMaterialToOtherEngineState ,
  
}
/* BasicMaterialEngineService-WonderEditor Not a pure module */
