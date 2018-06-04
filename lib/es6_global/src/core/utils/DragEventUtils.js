

import * as DomHelper$WonderEditor from "../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../atom_component/dragTree/utils/DragUtils.js";
import * as StateLogicService$WonderEditor from "../../service/stateTuple/logic/StateLogicService.js";
import * as DragEventBaseUtils$WonderEditor from "./DragEventBaseUtils.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../service/state/editor/CurrentDragSourceEditorService.js";

function handleDragStart(id, sign, dragImg, $$event) {
  DragEventBaseUtils$WonderEditor.dragStart(id, sign, dragImg, $$event);
  return /* DragStart */4;
}

function handleDragEnter(id, handleSign, handleRelationError, _) {
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragEnter(id, handleSign, handleRelationError);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(id, handleSign, handleRelationError, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragLeave(id, handleSign, handleRelationError, $$event);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(uid, handleRelationError, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragDrop(uid, startId, handleRelationError);
  if (match) {
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
  handleDragOver ,
  handleDrop ,
  handleDrageEnd ,
  
}
/* DomHelper-WonderEditor Not a pure module */
