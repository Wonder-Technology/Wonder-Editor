'use strict';

import * as StateEngineService$WonderEditor  from "../../engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _createState() {
  return /* record */[
          /* assetRecord : record */[
            /* assetTree : None */0,
            /* index */0,
            /* currentAssetTreeNode : None */0,
            /* currentAssetChildrenNodeParent : None */0,
            /* nodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
          ],
          /* sceneRecord : record */[
            /* root : None */0,
            /* currentSceneTreeNode : None */0,
            /* diffMap : None */0,
            /* isRun : false */0
          ],
          /* currentSign */"",
          /* currentSource : None */0,
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
