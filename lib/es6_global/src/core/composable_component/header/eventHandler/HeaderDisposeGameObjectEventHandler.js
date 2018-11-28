

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as LogUtils$WonderEditor from "../../../utils/console/LogUtils.js";
import * as StoreUtils$WonderEditor from "../../../utils/ui/StoreUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../ui/eventHandler/EventHandler.js";
import * as SceneGraphUtils$WonderEditor from "../../mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneGraphUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";
import * as CurrentSceneTreeNodeLogicService$WonderEditor from "../../../../service/stateTuple/logic/CurrentSceneTreeNodeLogicService.js";

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
            /* SceneTree */6
          ]]
      ]);
  return /* () */0;
}

function _getRemovedSceneGraphData(sceneGraphArr) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = SceneEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  if (match !== undefined) {
    var match$1 = SceneGraphUtils$WonderEditor.removeDragedTreeNode(match, sceneGraphArr);
    return /* tuple */[
            match$1[0],
            match$1[1]
          ];
  } else {
    ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("current gameObject should exist, but actual is None", "", "set current gameObject", ""), editorState);
    return /* tuple */[
            sceneGraphArr,
            undefined
          ];
  }
}

function _hasLightComponent(removedTreeNode, engineState) {
  var __x = SceneGraphUtils$WonderEditor.getAllGameObjects(removedTreeNode);
  return SceneEngineService$WonderEditor.doesNeedReInitSceneAllLightMaterials(__x, engineState);
}

function handleSelfLogic(param, _, _$1) {
  var sceneGraphArr = StoreUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]);
  var match = _getRemovedSceneGraphData(sceneGraphArr);
  var removedTreeNode = match[1];
  if (removedTreeNode !== undefined) {
    var removedTreeNode$1 = removedTreeNode;
    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    var hasLightComponent = _hasLightComponent(removedTreeNode$1, engineState);
    StateEngineService$WonderEditor.setState(engineState);
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
