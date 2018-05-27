'use strict';

import * as DomHelper$WonderEditor                      from "../external/DomHelper.js";
import * as DragUtils$WonderEditor                      from "../atom_component/dragTree/utils/DragUtils.js";
import * as EventUtils$WonderEditor                     from "./EventUtils.js";
import * as StateLogicService$WonderEditor              from "../../service/stateTuple/logic/StateLogicService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../service/state/editor/CurrentDragSourceEditorService.js";

function handleDragStart(id, sign, $$event) {
  EventUtils$WonderEditor.dragStart(id, sign, $$event);
  return /* DragStart */4;
}

function handleDragEnter(id, handleSign, handleRelationError, _) {
  var match = EventUtils$WonderEditor.isTriggerDragEnter(id, handleSign, handleRelationError);
  if (match !== 0) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(id, handleSign, handleRelationError, $$event) {
  var match = EventUtils$WonderEditor.isTriggerDragLeave(id, handleSign, handleRelationError, $$event);
  if (match !== 0) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(uid, handleRelationError, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = EventUtils$WonderEditor.isTriggerDragDrop(uid, startId, handleRelationError);
  if (match !== 0) {
    return /* DragLeave */2;
  } else {
    return /* DragDrop */[
            uid,
            startId
          ];
  }
}

function handleDrageEnd() {
  StateLogicService$WonderEditor.getAndSetEditorState(CurrentDragSourceEditorService$WonderEditor.clearCurrentDragSource);
  return /* DragEnd */3;
}

export {
  handleDragStart ,
  handleDragEnter ,
  handleDragLeave ,
  handleDragOver  ,
  handleDrop      ,
  handleDrageEnd  ,
  
}
/* DomHelper-WonderEditor Not a pure module */
