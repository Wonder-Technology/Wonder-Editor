

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as SceneUtils$WonderEditor from "../../../utils/engine/SceneUtils.js";
import * as StoreUtils$WonderEditor from "../../../utils/ui/StoreUtils.js";
import * as EventHandler$WonderEditor from "../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor from "../../mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as EmptyEventHandler$WonderEditor from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as CameraLogicService$WonderEditor from "../../../../service/stateTuple/logic/CameraLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../../service/state/engine/camera/CameraEngineService.js";
import * as CurrentSceneTreeNodeLogicService$WonderEditor from "../../../../service/stateTuple/logic/CurrentSceneTreeNodeLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../service/state/engine/GameObjectComponentEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _checkSceneGraphDataAndDispatch(dispatchFunc, newSceneGraphArr) {
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[newSceneGraphArr]
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* Inspector */2,
            /* SceneTree */4
          ]]
      ]);
  return /* () */0;
}

function _getRemovedSceneGraphData(sceneGraphArr) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = SceneEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  if (match !== undefined) {
    var gameObject = match;
    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    var match$1 = CameraEngineService$WonderEditor.hasCameraGroup(gameObject, engineState);
    if (match$1) {
      var match$2 = SceneUtils$WonderEditor.doesSceneHasRemoveableCamera(/* () */0);
      if (match$2) {
        var match$3 = CameraLogicService$WonderEditor.handleForRemoveCameraGroup(gameObject, editorState, engineState);
        StateEditorService$WonderEditor.setState(match$3[0]);
        StateEngineService$WonderEditor.setState(match$3[1]);
      }
      var match$4 = SceneTreeUtils$WonderEditor.removeDragedTreeNode(gameObject, sceneGraphArr);
      return /* tuple */[
              match$4[0],
              match$4[1]
            ];
    } else {
      var match$5 = SceneTreeUtils$WonderEditor.removeDragedTreeNode(gameObject, sceneGraphArr);
      return /* tuple */[
              match$5[0],
              match$5[1]
            ];
    }
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("_getRemovedSceneGraphData", "current gameObject should exist, but actual is None", "", "set current gameObject", ""));
    return /* tuple */[
            sceneGraphArr,
            undefined
          ];
  }
}

function _hasLightComponent(removedTreeNode) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var _iterateJudge = function (result, removedTreeNodeArr) {
    if (result) {
      return result;
    } else {
      return ArrayService$WonderCommonlib.reduceOneParam((function (result, param) {
                    if (result) {
                      return result;
                    } else {
                      var uid = param[/* uid */1];
                      return _iterateJudge(GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(uid, engineState) || GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(uid, engineState), param[/* children */3]);
                    }
                  }), result, removedTreeNodeArr);
    }
  };
  return _iterateJudge(false, /* array */[removedTreeNode]);
}

function handleSelfLogic(param, _, _$1) {
  var sceneGraphArr = StoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]);
  var match = _getRemovedSceneGraphData(sceneGraphArr);
  var removedTreeNode = match[1];
  if (removedTreeNode !== undefined) {
    var removedTreeNode$1 = removedTreeNode;
    var hasLightComponent = _hasLightComponent(removedTreeNode$1);
    CurrentSceneTreeNodeLogicService$WonderEditor.disposeCurrentSceneTreeNode(removedTreeNode$1);
    StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
    if (hasLightComponent) {
      StateLogicService$WonderEditor.getAndSetEngineState(SceneEngineService$WonderEditor.clearShaderCacheAndReInitSceneAllLightMaterials);
    }
    StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
  }
  return _checkSceneGraphDataAndDispatch(param[1], match[0]);
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _checkSceneGraphDataAndDispatch */_checkSceneGraphDataAndDispatch,
  /* _getRemovedSceneGraphData */_getRemovedSceneGraphData,
  /* _hasLightComponent */_hasLightComponent,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
