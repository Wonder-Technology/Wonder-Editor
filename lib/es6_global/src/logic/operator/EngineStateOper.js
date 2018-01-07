'use strict';

import * as EngineStateAdaptor$WonderEditor from "../adaptor/EngineStateAdaptor.js";

function getState() {
  return EngineStateAdaptor$WonderEditor.getState(EngineStateAdaptor$WonderEditor.getStateData(/* () */0));
}

function setState(state) {
  return EngineStateAdaptor$WonderEditor.setState(EngineStateAdaptor$WonderEditor.getStateData(/* () */0), state);
}

export {
  getState ,
  setState ,
  
}
/* EngineStateAdaptor-WonderEditor Not a pure module */
