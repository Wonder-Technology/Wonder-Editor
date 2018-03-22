'use strict';

import * as StateEngineService$WonderEditor from "../../engine/StateEngineService.js";

function _createState() {
  return /* record */[
          /* sceneRecord : record */[
            /* root : None */0,
            /* currentGameObject : None */0
          ],
          /* loopId */-1
        ];
}

var editorStateData = /* record */[
  /* state : record */[
    /* sceneRecord : record */[
      /* root : None */0,
      /* currentGameObject : None */0
    ],
    /* loopId */-1
  ],
  /* isDebug : true */1,
  /* engineStateDataForEdit */StateEngineService$WonderEditor.createStateData(/* () */0),
  /* engineStateDataForRun */StateEngineService$WonderEditor.createStateData(/* () */0),
  /* isRun : false */0
];

export {
  _createState    ,
  editorStateData ,
  
}
/* editorStateData Not a pure module */
