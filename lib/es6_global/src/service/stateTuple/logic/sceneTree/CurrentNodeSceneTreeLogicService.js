

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CameraLogicService$WonderEditor from "../CameraLogicService.js";
import * as CameraEngineService$WonderEditor from "../../../state/engine/camera/CameraEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../state/editor/sceneTree/SceneTreeEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/HierarchyGameObjectEngineService.js";

function disposeCurrentSceneTreeNode(currentGameObject, param) {
  var _iterateSceneGraphRemove = function (removedGameObjectArr, param) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, removedGameObject) {
                  var engineState = param[1];
                  var editorState = param[0];
                  var match = CameraEngineService$WonderEditor.hasCameraGroup(removedGameObject, engineState);
                  var match$1 = match ? CameraLogicService$WonderEditor.unbindArcballCameraControllerEventIfHasComponentForGameView(removedGameObject, editorState, engineState) : /* tuple */[
                      editorState,
                      engineState
                    ];
                  var engineState$1 = GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(removedGameObject, match$1[1]);
                  return _iterateSceneGraphRemove(HierarchyGameObjectEngineService$WonderEditor.getChildren(removedGameObject, engineState$1), /* tuple */[
                              match$1[0],
                              engineState$1
                            ]);
                }), /* tuple */[
                param[0],
                param[1]
              ], removedGameObjectArr);
  };
  var match = _iterateSceneGraphRemove(/* array */[currentGameObject], /* tuple */[
        param[0],
        param[1]
      ]);
  var editorState = SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode(match[0]);
  return /* tuple */[
          editorState,
          match[1]
        ];
}

export {
  disposeCurrentSceneTreeNode ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
