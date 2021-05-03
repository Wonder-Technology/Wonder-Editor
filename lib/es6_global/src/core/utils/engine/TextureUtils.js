

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../service/state/engine/BasicSourceTextureEngineService.js";

function _getFormat(extName) {
  switch (extName) {
    case ".jpeg" : 
    case ".jpg" : 
        return /* Rgb */0;
    case ".png" : 
        return /* Rgba */1;
    default:
      var arg = "unknown extName:" + (String(extName) + "");
      return Log$WonderLog.fatal((function (param) {
                    return Log$WonderLog.buildFatalMessage(param, arg, "", "", "");
                  }));
  }
}

function createAndInitTexture(textureName, extName, engineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.create(engineState);
  var texture = match[1];
  var engineState$1 = BasicSourceTextureEngineService$WonderEditor.initTexture(texture, BasicSourceTextureEngineService$WonderEditor.setFormat(_getFormat(extName), texture, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(textureName, texture, match[0])));
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
  _getFormat ,
  createAndInitTexture ,
  createAndSetTextureProps ,
  
}
/* Log-WonderLog Not a pure module */
