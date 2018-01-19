'use strict';

import * as EngineStateBuss$WonderEditor from "../buss/EngineStateBuss.js";

var deepCopyStateForRestore = EngineStateBuss$WonderEditor.deepCopyStateForRestore;

var restoreState = EngineStateBuss$WonderEditor.restoreState;

var getEngineState = EngineStateBuss$WonderEditor.getEngineState;

var setEngineState = EngineStateBuss$WonderEditor.setEngineState;

var goBack = EngineStateBuss$WonderEditor.goBack;

var goForward = EngineStateBuss$WonderEditor.goForward;

var storeEngineState = EngineStateBuss$WonderEditor.storeEngineState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getEngineState          ,
  setEngineState          ,
  goBack                  ,
  goForward               ,
  storeEngineState        ,
  
}
/* EngineStateBuss-WonderEditor Not a pure module */
