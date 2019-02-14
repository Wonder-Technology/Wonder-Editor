

import * as Reductive$WonderEditor from "../../../core/redux/Reductive.js";
import * as IndexStore$WonderEditor from "../../../core/redux/store/IndexStore.js";

var _getDispathForTest = function (dispatchFunc){
    if (typeof window.dispathFuncStub_wonder_editor !== "undefined") {
        return window.dispathFuncStub_wonder_editor;
    }
    else{
        return dispatchFunc
    }
    };

function getDispatch() {
  var partial_arg = Reductive$WonderEditor.Store[/* dispatch */4];
  return _getDispathForTest((function (param) {
                return partial_arg(IndexStore$WonderEditor.store, param);
              }));
}

function getState() {
  return Reductive$WonderEditor.Store[/* getState */5](IndexStore$WonderEditor.store);
}

export {
  _getDispathForTest ,
  getDispatch ,
  getState ,
  
}
/* Reductive-WonderEditor Not a pure module */
