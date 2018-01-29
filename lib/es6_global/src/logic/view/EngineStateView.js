'use strict';

import * as EngineStateBuss$WonderEditor from "../buss/EngineStateBuss.js";

var deepCopyStateForRestore = EngineStateBuss$WonderEditor.deepCopyStateForRestore;

var restoreState = EngineStateBuss$WonderEditor.restoreState;

var getEngineState = EngineStateBuss$WonderEditor.getEngineState;

var setEngineState = EngineStateBuss$WonderEditor.setEngineState;

var undo = EngineStateBuss$WonderEditor.undo;

var redo = EngineStateBuss$WonderEditor.redo;

var storeEngineState = EngineStateBuss$WonderEditor.storeEngineState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getEngineState          ,
  setEngineState          ,
  undo                    ,
  redo                    ,
  storeEngineState        ,
  
}
/* EngineStateBuss-WonderEditor Not a pure module */
