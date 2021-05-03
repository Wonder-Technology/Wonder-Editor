

import * as ArrayService$WonderEditor from "../../../../../../../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../../service/state/engine/SceneEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function _buildTreeNode(gameObject, engineState) {
  return /* record */[
          /* name */GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(gameObject, engineState),
          /* uid */gameObject,
          /* children : array */[]
        ];
}

function _buildSceneGraphData(gameObject, engineState) {
  var _buildSceneGraphDataRec = function (gameObject, treeNode, engineState) {
    var match = HierarchyGameObjectEngineService$WonderEditor.hasChildren(gameObject, engineState);
    if (match) {
      return ArrayService$WonderCommonlib.reduceOneParam((function (treeNode, child) {
                    return /* record */[
                            /* name */treeNode[/* name */0],
                            /* uid */treeNode[/* uid */1],
                            /* children */ArrayService$WonderEditor.push(_buildSceneGraphDataRec(child, _buildTreeNode(child, engineState), engineState), treeNode[/* children */2].slice())
                          ];
                  }), treeNode, HierarchyGameObjectEngineService$WonderEditor.getChildren(gameObject, engineState));
    } else {
      return treeNode;
    }
  };
  return _buildSceneGraphDataRec(gameObject, _buildTreeNode(gameObject, engineState), engineState);
}

function getSceneGraphDataFromEngine(param) {
  var engineState = param[1];
  return /* array */[_buildSceneGraphData(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState)];
}

export {
  _buildTreeNode ,
  _buildSceneGraphData ,
  getSceneGraphDataFromEngine ,
  
}
/* ArrayService-WonderEditor Not a pure module */
