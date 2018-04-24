'use strict';

import * as StateEngineService$WonderEditor from "../../engine/StateEngineService.js";

function _createState() {
  return /* record */[
          /* assetRecord : record */[
            /* assetTree : None */0,
            /* index */0,
            /* imageMap : None */0
          ],
          /* sceneRecord : record */[
            /* root : None */0,
            /* currentGameObject : None */0,
            /* diffMap : None */0,
            /* isRun : false */0
          ],
          /* loopId */-1
        ];
}

var editorStateData = /* record */[
  /* state */_createState(/* () */0),
  /* isDebug : true */1,
  /* engineStateDataForEdit */StateEngineService$WonderEditor.createStateData(/* () */0),
  /* engineStateDataForRun */StateEngineService$WonderEditor.createStateData(/* () */0)
];

export {
  _createState    ,
  editorStateData ,
  
}
/* editorStateData Not a pure module */
