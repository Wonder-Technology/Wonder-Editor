'use strict';

import * as SourceInstanceEngineService$WonderEditor from "../../../../../../../service/state/engine/SourceInstanceEngineService.js";

function createSourceInstanceComponent(param) {
  var match = SourceInstanceEngineService$WonderEditor.create(param[1]);
  return /* tuple */[
          match[1],
          /* tuple */[
            param[0],
            match[0]
          ]
        ];
}

export {
  createSourceInstanceComponent ,
  
}
/* SourceInstanceEngineService-WonderEditor Not a pure module */
