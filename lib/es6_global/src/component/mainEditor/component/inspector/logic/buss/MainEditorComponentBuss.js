'use strict';

import * as MainEditorSourceInstanceOper$WonderEditor from "../../../../logic/operator/MainEditorSourceInstanceOper.js";

function createSourceInstanceComponent(param) {
  var match = MainEditorSourceInstanceOper$WonderEditor.createSourceInstanceComponent(param[1]);
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
/* MainEditorSourceInstanceOper-WonderEditor Not a pure module */
