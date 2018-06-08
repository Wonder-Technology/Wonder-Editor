

import * as DomHelper$WonderEditor from "../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../atom_component/dragTree/utils/DragUtils.js";
import * as StateLogicService$WonderEditor from "../../service/stateTuple/logic/StateLogicService.js";
import * as DragEventBaseUtils$WonderEditor from "./DragEventBaseUtils.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../service/state/editor/CurrentDragSourceEditorService.js";

function handleDragStart(id, flag, dragImg, $$event) {
  DragEventBaseUtils$WonderEditor.dragStart(id, flag, dragImg, $$event);
  return /* DragStart */4;
}

function handleDragEnter(id, handleFlag, handleRelationError, _) {
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragEnter(id, handleFlag, handleRelationError);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(id, handleFlag, handleRelationError, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragLeave(id, handleFlag, handleRelationError);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(uid, handleFlag, handleRelationError, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragDrop(uid, startId, handleFlag, handleRelationError);
  if (match) {
    return /* DragDrop */[
            uid,
            startId
          ];
  } else {
    return /* DragLeave */2;
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
