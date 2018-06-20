

import * as BasicSourceTextureEngineService$WonderEditor from "../../../service/state/engine/BasicSourceTextureEngineService.js";

function createAndInitTexture(editEngineState, runEngineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.create(editEngineState);
  var editTexture = match[1];
  var match$1 = BasicSourceTextureEngineService$WonderEditor.create(runEngineState);
  return /* tuple */[
          editTexture,
          BasicSourceTextureEngineService$WonderEditor.initTexture(editTexture, match[0]),
          BasicSourceTextureEngineService$WonderEditor.initTexture(match$1[1], match$1[0])
        ];
}

function buildTextureNodeResult(name, texture) {
  return /* record */[
          /* name */name,
          /* type_ : Texture */3,
          /* result : Some */[String(texture)]
        ];
}

export {
  createAndInitTexture ,
  buildTextureNodeResult ,
  
}
/* BasicSourceTextureEngineService-WonderEditor Not a pure module */
