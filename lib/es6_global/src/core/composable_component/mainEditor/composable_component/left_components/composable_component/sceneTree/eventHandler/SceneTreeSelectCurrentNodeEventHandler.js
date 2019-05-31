

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../../../service/record/editor/widget/SceneTreeWidgetService.js";
import * as CustomEventEditorService$WonderEditor from "../../../../../../../../service/state/editor/event/CustomEventEditorService.js";
import * as ManageEventEngineService$WonderEditor from "../../../../../../../../service/state/engine/event/ManageEventEngineService.js";
import * as CreateCustomEventEngineService$WonderEditor from "../../../../../../../../service/state/engine/event/CreateCustomEventEngineService.js";
import * as SceneTreeSelectCurrentNodeUtils$WonderEditor from "../utils/SceneTreeSelectCurrentNodeUtils.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var setUndoValueToCopiedEngineStateForPromise = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function _setAllParentsShowChildren(_gameObject, engineState, _editorState) {
  while(true) {
    var editorState = _editorState;
    var gameObject = _gameObject;
    var match = HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(gameObject, engineState);
    if (match !== undefined) {
      var parentGameObject = match;
      _editorState = SceneTreeEditorService$WonderEditor.setIsShowChildren(parentGameObject, true, editorState);
      _gameObject = parentGameObject;
      continue ;
    } else {
      return editorState;
    }
  };
}

function handleSelfLogic(param, param$1, gameObjectOpt) {
  if (gameObjectOpt !== undefined) {
    var gameObject = gameObjectOpt;
    StateEditorService$WonderEditor.setState(SceneTreeSelectCurrentNodeUtils$WonderEditor.clearCurrentData(StateEditorService$WonderEditor.getState(/* () */0)));
    StateEditorService$WonderEditor.setState(_setAllParentsShowChildren(gameObject, StateEngineService$WonderEditor.unsafeGetState(/* () */0), CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(SceneTreeWidgetService$WonderEditor.getWidget(/* () */0), SceneTreeEditorService$WonderEditor.setCurrentSceneTreeNode(gameObject, StateEditorService$WonderEditor.getState(/* () */0)))));
    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    var match = ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create(CustomEventEditorService$WonderEditor.getSelectSceneTreeNodeEventName(/* () */0), undefined), engineState);
    StateEngineService$WonderEditor.setState(match[0]);
    StateLogicService$WonderEditor.getAndRefreshEngineStateWhenStop(/* () */0);
  } else {
    StateEditorService$WonderEditor.setState(SceneTreeSelectCurrentNodeUtils$WonderEditor.clearCurrentData(StateEditorService$WonderEditor.getState(/* () */0)));
  }
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* SceneTree */6,
            /* Inspector */2,
            /* Project */4
          ]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* setUndoValueToCopiedEngineStateForPromise */setUndoValueToCopiedEngineStateForPromise,
  /* _setAllParentsShowChildren */_setAllParentsShowChildren,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState,
      setUndoValueToCopiedEngineStateForPromise
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
