

import * as BasicSourceTextureEngineService$WonderEditor from "../../../service/state/engine/BasicSourceTextureEngineService.js";

function createTexture(editEngineState, runEngineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.create(editEngineState);
  var match$1 = BasicSourceTextureEngineService$WonderEditor.create(runEngineState);
  return /* tuple */[
          match[1],
          match[0],
          match$1[0]
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
  createTexture ,
  buildTextureNodeResult ,
  
}
/* BasicSourceTextureEngineService-WonderEditor Not a pure module */
