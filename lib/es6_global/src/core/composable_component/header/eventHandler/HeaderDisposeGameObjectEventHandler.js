

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as Index from "antd/lib/message/index";
import * as StoreUtils$WonderEditor from "../../../utils/ui/StoreUtils.js";
import * as EventHandler$WonderEditor from "../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor from "../../mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectUtils$WonderEditor from "../../../utils/engine/GameObjectUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as CameraEngineService$WonderEditor from "../../../../service/state/engine/CameraEngineService.js";
import * as CurrentSceneTreeNodeLogicService$WonderEditor from "../../../../service/stateTuple/logic/CurrentSceneTreeNodeLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../service/state/engine/GameObjectComponentEngineService.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../service/stateTuple/logic/OperateLightMaterialLogicService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _checkSceneGraphDataAndDispatch(dispatchFunc, newSceneGraphArr) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the newSceneGraphArr should equal the sceneGraph from engine", "not"), (function () {
                        return Contract$WonderLog.assertTrue(Caml_obj.caml_equal(StateLogicService$WonderEditor.getStateToGetData(SceneTreeUtils$WonderEditor.getSceneGraphDataFromEngine), newSceneGraphArr));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[newSceneGraphArr]
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* Inspector */1,
            /* SceneTree */3
          ]]
      ]);
  return /* () */0;
}

function _getRemovedSceneGraphData(sceneGraphArr) {
  var match = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode);
  if (match !== undefined) {
    var gameObject = match;
    var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
    var match$1 = CameraEngineService$WonderEditor.hasCameraGroup(gameObject, runEngineState);
    if (match$1) {
      var match$2 = GameObjectUtils$WonderEditor.doesSceneHasRemoveableCamera(/* () */0);
      if (match$2) {
        StateLogicService$WonderEditor.setRunEngineState(CameraEngineService$WonderEditor.prepareForRemoveCameraGroup(gameObject, runEngineState));
        var match$3 = SceneTreeUtils$WonderEditor.removeDragedTreeNode(gameObject, sceneGraphArr);
        return /* tuple */[
                match$3[0],
                match$3[1]
              ];
      } else {
        var messageObj = Index.default;
        messageObj.warn("can't remove last camera ! ", 4);
        return /* tuple */[
                sceneGraphArr,
                undefined
              ];
      }
    } else {
      var match$4 = SceneTreeUtils$WonderEditor.removeDragedTreeNode(gameObject, sceneGraphArr);
      return /* tuple */[
              match$4[0],
              match$4[1]
            ];
    }
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("disposeCurrentSceneTreeNode", "current gameObject should exist, but actual is None", "", "set current gameObject", ""));
    return /* tuple */[
            sceneGraphArr,
            undefined
          ];
  }
}

function _hasLightComponent(removedTreeNode) {
  var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var _iterateJudge = function (result, removedTreeNodeArr) {
    if (result) {
      return result;
    } else {
      return ArrayService$WonderCommonlib.reduceOneParam((function (result, param) {
                    if (result) {
                      return result;
                    } else {
                      var uid = param[/* uid */1];
                      return _iterateJudge(GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(uid, runEngineState) || GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(uid, runEngineState), param[/* children */2]);
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
    StateLogicService$WonderEditor.getAndRefreshEditAndRunEngineState(/* () */0);
    if (hasLightComponent) {
      StateLogicService$WonderEditor.getAndSetEditAndRunEngineState(OperateLightMaterialLogicService$WonderEditor.reInitAllMaterials);
    }
    StateLogicService$WonderEditor.getAndRefreshEditAndRunEngineState(/* () */0);
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
