

import * as BasicSourceTextureEngineService$WonderEditor from "../../../service/state/engine/BasicSourceTextureEngineService.js";

function createAndInitTexture(textureName, engineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.create(engineState);
  var texture = match[1];
  var engineState$1 = BasicSourceTextureEngineService$WonderEditor.initTexture(texture, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(textureName, texture, match[0]));
  return /* tuple */[
          texture,
          engineState$1
        ];
}

function createAndSetTextureProps(textureName, param, engineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.create(engineState);
  var texture = match[1];
  var engineState$1 = BasicSourceTextureEngineService$WonderEditor.initTexture(texture, BasicSourceTextureEngineService$WonderEditor.setMagFilter(param[3], texture, BasicSourceTextureEngineService$WonderEditor.setMinFilter(param[2], texture, BasicSourceTextureEngineService$WonderEditor.setWrapT(param[1], texture, BasicSourceTextureEngineService$WonderEditor.setWrapS(param[0], texture, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(textureName, texture, match[0]))))));
  return /* tuple */[
          texture,
          engineState$1
        ];
}

export {
  createAndInitTexture ,
  createAndSetTextureProps ,
  
}
/* BasicSourceTextureEngineService-WonderEditor Not a pure module */
