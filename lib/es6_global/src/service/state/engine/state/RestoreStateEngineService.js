

import * as StateAPI$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/StateAPI.js";
import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../BasicSourceTextureEngineService.js";

function _isTextureParametersDifferent(texture, currentState, targetState) {
  if (BasicSourceTextureEngineService$WonderEditor.getWrapS(texture, currentState) !== BasicSourceTextureEngineService$WonderEditor.getWrapS(texture, targetState) || BasicSourceTextureEngineService$WonderEditor.getWrapT(texture, currentState) !== BasicSourceTextureEngineService$WonderEditor.getWrapT(texture, targetState) || BasicSourceTextureEngineService$WonderEditor.getMagFilter(texture, currentState) !== BasicSourceTextureEngineService$WonderEditor.getMagFilter(texture, targetState)) {
    return true;
  } else {
    return BasicSourceTextureEngineService$WonderEditor.getMinFilter(texture, currentState) !== BasicSourceTextureEngineService$WonderEditor.getMinFilter(texture, targetState);
  }
}

function _getBasicSourceTexturesNeedUpdate(currentState, targetState) {
  return ArrayService$WonderEditor.intersect(BasicSourceTextureEngineService$WonderEditor.getAllTextures(currentState), BasicSourceTextureEngineService$WonderEditor.getAllTextures(targetState)).filter((function (texture) {
                return _isTextureParametersDifferent(texture, currentState, targetState);
              }));
}

function _markBasicSourceTextureNeedUpdate(basicSourceTexturesNeedUpdate, restoredState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (restoredState, texture) {
                return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(true, texture, restoredState);
              }), restoredState, basicSourceTexturesNeedUpdate);
}

function restoreState(currentState, targetState) {
  var basicSourceTexturesNeedUpdate = _getBasicSourceTexturesNeedUpdate(currentState, targetState);
  return _markBasicSourceTextureNeedUpdate(basicSourceTexturesNeedUpdate, StateAPI$Wonderjs.restoreState(currentState, targetState));
}

export {
  _isTextureParametersDifferent ,
  _getBasicSourceTexturesNeedUpdate ,
  _markBasicSourceTextureNeedUpdate ,
  restoreState ,
  
}
/* StateAPI-Wonderjs Not a pure module */
