

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../atom_component/dragTree/utils/DragUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../service/state/editor/CurrentDragSourceEditorService.js";

function dragStart(id, widget, dragImg, effectAllowd, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  $$event.dataTransfer.setDragImage(dragImg, 0, 0);
  DragUtils$WonderEditor.setDataTransferEffectAllowed(effectAllowd, $$event);
  DragUtils$WonderEditor.setDragedId(id, $$event);
  var partial_arg = /* tuple */[
    widget,
    id
  ];
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return CurrentDragSourceEditorService$WonderEditor.setCurrentDragSource(partial_arg, param);
              }));
}

function _isTreeNodeRelationValid(targetId, startId, handleRelationErrorFunc) {
  if (startId !== undefined) {
    return !StateLogicService$WonderEditor.getStateToGetData(Curry._2(handleRelationErrorFunc, targetId, Caml_option.valFromOption(startId)));
  } else {
    return false;
  }
}

function isTriggerDragEnter(id, isWidgetFunc, handleRelationErrorFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(isWidgetFunc, match[0])) {
    return _isTreeNodeRelationValid(id, match[1], handleRelationErrorFunc);
  } else {
    return false;
  }
}

function isTriggerDragDrop(id, startId, isWidgetFunc, handleRelationErrorFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(isWidgetFunc, match[0])) {
    return _isTreeNodeRelationValid(id, Caml_option.some(startId), handleRelationErrorFunc);
  } else {
    return false;
  }
}

export {
  dragStart ,
  _isTreeNodeRelationValid ,
  isTriggerDragEnter ,
  isTriggerDragDrop ,
  
}
/* DomHelper-WonderEditor Not a pure module */
