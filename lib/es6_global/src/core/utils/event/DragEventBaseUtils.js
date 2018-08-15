

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../atom_component/dragTree/utils/DragUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../service/state/editor/CurrentDragSourceEditorService.js";

function dragStart(uid, widge, dragImg, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  $$event.dataTransfer.setDragImage(dragImg, 0, 0);
  DragUtils$WonderEditor.setDataTransferEffectIsMove($$event);
  DragUtils$WonderEditor.setDragedUid(uid, $$event);
  var partial_arg = /* tuple */[
    widge,
    uid
  ];
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return CurrentDragSourceEditorService$WonderEditor.setCurrentDragSource(partial_arg, param);
              }));
}

function _isTreeNodeRelationValid(targetId, startId, handleRelationErrorFunc) {
  if (startId !== undefined) {
    return !StateLogicService$WonderEditor.getStateToGetData(Curry._2(handleRelationErrorFunc, targetId, Js_primitive.valFromOption(startId)));
  } else {
    return false;
  }
}

function isTriggerDragEnter(id, handleWidgeFunc, handleRelationErrorFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(handleWidgeFunc, match[0])) {
    return _isTreeNodeRelationValid(id, match[1], handleRelationErrorFunc);
  } else {
    return false;
  }
}

function isTriggerDragLeave(id, handleWidgeFunc, handleRelationErrorFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(handleWidgeFunc, match[0])) {
    return _isTreeNodeRelationValid(id, match[1], handleRelationErrorFunc);
  } else {
    return false;
  }
}

function isTriggerDragDrop(id, startId, handleWidgeFunc, handleRelationErrorFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(handleWidgeFunc, match[0])) {
    return _isTreeNodeRelationValid(id, Js_primitive.some(startId), handleRelationErrorFunc);
  } else {
    return false;
  }
}

export {
  dragStart ,
  _isTreeNodeRelationValid ,
  isTriggerDragEnter ,
  isTriggerDragLeave ,
  isTriggerDragDrop ,
  
}
/* DomHelper-WonderEditor Not a pure module */
