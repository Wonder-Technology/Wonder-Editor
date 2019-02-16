

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as ArrayService$Wonderjs from "../../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as EventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _handleDragIntoTarget(targetGameObject, draggedGameObject, engineState) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return SceneTreeEditorService$WonderEditor.setIsShowChildren(targetGameObject, true, param);
        }));
  return HierarchyGameObjectEngineService$WonderEditor.setParentKeepOrder(targetGameObject, draggedGameObject, engineState);
}

function _handleDragToBeSceneGameObjectChild(dragPosition, sceneGameObject, draggedGameObject, engineState) {
  var exit = 0;
  if (dragPosition >= 3) {
    exit = 1;
  } else {
    switch (dragPosition) {
      case 0 : 
          throw [
                Caml_builtin_exceptions.match_failure,
                /* tuple */[
                  "SceneTreeDragGameObjectEventHandler.re",
                  30,
                  4
                ]
              ];
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return _handleDragIntoTarget(sceneGameObject, draggedGameObject, engineState);
      
    }
  }
  if (exit === 1) {
    var targetGameObject = ArrayService$Wonderjs.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(sceneGameObject, engineState));
    return HierarchyGameObjectEngineService$WonderEditor.changeGameObjectChildOrder(draggedGameObject, targetGameObject, /* Before */0, HierarchyGameObjectEngineService$WonderEditor.setParentKeepOrder(OptionService$Wonderjs.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(targetGameObject, engineState)), draggedGameObject, engineState));
  }
  
}

function _handleDragToBeTargetGameObjectSib(dragPosition, targetGameObject, draggedGameObject, engineState) {
  switch (dragPosition) {
    case 0 : 
        throw [
              Caml_builtin_exceptions.match_failure,
              /* tuple */[
                "SceneTreeDragGameObjectEventHandler.re",
                62,
                4
              ]
            ];
    case 1 : 
        return HierarchyGameObjectEngineService$WonderEditor.changeGameObjectChildOrder(draggedGameObject, targetGameObject, /* Before */0, HierarchyGameObjectEngineService$WonderEditor.setParentKeepOrder(OptionService$Wonderjs.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(targetGameObject, engineState)), draggedGameObject, engineState));
    case 2 : 
        return _handleDragIntoTarget(targetGameObject, draggedGameObject, engineState);
    case 3 : 
        return HierarchyGameObjectEngineService$WonderEditor.changeGameObjectChildOrder(draggedGameObject, targetGameObject, /* After */1, HierarchyGameObjectEngineService$WonderEditor.setParentKeepOrder(OptionService$Wonderjs.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(targetGameObject, engineState)), draggedGameObject, engineState));
    
  }
}

function handleSelfLogic(param, _, param$1) {
  var dragPosition = param$1[2];
  var draggedGameObject = param$1[1];
  var targetGameObject = param$1[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return SceneEngineService$WonderEditor.isSceneGameObject(targetGameObject, param);
        }));
  var engineState$1 = match ? _handleDragToBeSceneGameObjectChild(dragPosition, targetGameObject, draggedGameObject, engineState) : _handleDragToBeTargetGameObjectSib(dragPosition, targetGameObject, draggedGameObject, engineState);
  StateEngineService$WonderEditor.setState(engineState$1);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* SceneTree */6]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _handleDragIntoTarget */_handleDragIntoTarget,
  /* _handleDragToBeSceneGameObjectChild */_handleDragToBeSceneGameObjectChild,
  /* _handleDragToBeTargetGameObjectSib */_handleDragToBeTargetGameObjectSib,
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
