

import * as Caml_builtin_exceptions from "../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function _handleDragIntoTarget(targetGameObject, draggedGameObject, engineState) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return SceneTreeEditorService$WonderEditor.setIsShowChildren(targetGameObject, true, param);
        }));
  return HierarchyGameObjectEngineService$WonderEditor.setParentKeepOrder(targetGameObject, draggedGameObject, engineState);
}

function handleDragToBeSceneGameObjectChild(dragPosition, sceneGameObject, draggedGameObject, engineState) {
  var exit = 0;
  if (dragPosition >= 3) {
    exit = 1;
  } else {
    switch (dragPosition) {
      case 0 : 
          throw [
                Caml_builtin_exceptions.match_failure,
                /* tuple */[
                  "DragGameObjectUtils.re",
                  16,
                  2
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
    var targetGameObject = ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(sceneGameObject, engineState));
    return HierarchyGameObjectEngineService$WonderEditor.changeGameObjectChildOrder(draggedGameObject, targetGameObject, /* Before */0, HierarchyGameObjectEngineService$WonderEditor.setParentKeepOrder(OptionService$WonderEditor.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(targetGameObject, engineState)), draggedGameObject, engineState));
  }
  
}

function handleDragToBeTargetGameObjectSib(dragPosition, targetGameObject, draggedGameObject, engineState) {
  switch (dragPosition) {
    case 0 : 
        throw [
              Caml_builtin_exceptions.match_failure,
              /* tuple */[
                "DragGameObjectUtils.re",
                45,
                2
              ]
            ];
    case 1 : 
        return HierarchyGameObjectEngineService$WonderEditor.changeGameObjectChildOrder(draggedGameObject, targetGameObject, /* Before */0, HierarchyGameObjectEngineService$WonderEditor.setParentKeepOrder(OptionService$WonderEditor.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(targetGameObject, engineState)), draggedGameObject, engineState));
    case 2 : 
        return _handleDragIntoTarget(targetGameObject, draggedGameObject, engineState);
    case 3 : 
        return HierarchyGameObjectEngineService$WonderEditor.changeGameObjectChildOrder(draggedGameObject, targetGameObject, /* After */1, HierarchyGameObjectEngineService$WonderEditor.setParentKeepOrder(OptionService$WonderEditor.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(targetGameObject, engineState)), draggedGameObject, engineState));
    
  }
}

export {
  _handleDragIntoTarget ,
  handleDragToBeSceneGameObjectChild ,
  handleDragToBeTargetGameObjectSib ,
  
}
/* ArrayService-WonderEditor Not a pure module */
