'use strict';

import * as Log$WonderLog                         from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as MainEditorComponentBuss$WonderEditor  from "../buss/MainEditorComponentBuss.js";
import * as MainEditorGameObjectBuss$WonderEditor from "../buss/MainEditorGameObjectBuss.js";

function addComponentByType(type_, currentGameObject, stateTuple) {
  if (type_ === "sourceInstance") {
    var match = MainEditorComponentBuss$WonderEditor.createSourceInstanceComponent(stateTuple);
    return MainEditorGameObjectBuss$WonderEditor.addSourceInstanceComponent(currentGameObject, match[0], match[1]);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addComponentByType", "the type:" + (String(type_) + " is not find"), "", "", "type:" + (String(type_) + (" , currentGameObject:" + (String(currentGameObject) + "")))));
  }
}

export {
  addComponentByType ,
  
}
/* Log-WonderLog Not a pure module */
