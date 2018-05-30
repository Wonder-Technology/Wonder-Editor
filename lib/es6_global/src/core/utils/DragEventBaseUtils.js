'use strict';

import * as Curry                                       from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as DomHelper$WonderEditor                      from "../external/DomHelper.js";
import * as DragUtils$WonderEditor                      from "../atom_component/dragTree/utils/DragUtils.js";
import * as StateLogicService$WonderEditor              from "../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor             from "../../service/state/editor/StateEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../service/state/editor/CurrentDragSourceEditorService.js";

function dragStart(uid, sign, dragImg, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  $$event.dataTransfer.setDragImage(dragImg, 0, 0);
  DragUtils$WonderEditor.setDataTransferEffectIsMove($$event);
  DragUtils$WonderEditor.setDragedUid(uid, $$event);
  var partial_arg = /* tuple */[
    sign,
    uid
  ];
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return CurrentDragSourceEditorService$WonderEditor.setCurrentDragSource(partial_arg, param);
              }));
}

function _isTreeNodeRelationValid(targetId, startId, handleRelationError) {
  if (startId) {
    return 1 - StateLogicService$WonderEditor.getStateToGetData(Curry._2(handleRelationError, targetId, startId[0]));
  } else {
    return /* false */0;
  }
}

function isTriggerDragEnter(id, handleSign, handleRelationError) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(handleSign, match[0])) {
    return _isTreeNodeRelationValid(id, match[1], handleRelationError);
  } else {
    return /* false */0;
  }
}

function isTriggerDragLeave(id, handleSign, handleRelationError, _) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(handleSign, match[0])) {
    return _isTreeNodeRelationValid(id, match[1], handleRelationError);
  } else {
    return /* false */0;
  }
}

function isTriggerDragDrop(uid, startId, handleRelationError) {
  return StateLogicService$WonderEditor.getStateToGetData(Curry._2(handleRelationError, uid, startId));
}

export {
  dragStart                ,
  _isTreeNodeRelationValid ,
  isTriggerDragEnter       ,
  isTriggerDragLeave       ,
  isTriggerDragDrop        ,
  
}
/* DomHelper-WonderEditor Not a pure module */
