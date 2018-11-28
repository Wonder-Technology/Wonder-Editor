

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../atom_component/dragTree/utils/DragUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as DragEventBaseUtils$WonderEditor from "./DragEventBaseUtils.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../service/state/editor/CurrentDragSourceEditorService.js";

function handleDragStart(id, widget, dragImg, effectAllowd, $$event) {
  DragEventBaseUtils$WonderEditor.dragStart(id, widget, dragImg, effectAllowd, $$event);
  return /* DragStart */4;
}

function handleDragEnter(id, isWidgetFunc, handleRelationErrorFunc, _) {
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragEnter(id, isWidgetFunc, handleRelationErrorFunc);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(_, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  return /* DragLeave */2;
}

function handleDragOver(dropEffect, $$event) {
  DragUtils$WonderEditor.setDataTransferDropEffect(dropEffect, $$event);
  return DomHelper$WonderEditor.preventDefault($$event);
}

function handleDrop(id, isWidgetFunc, handleRelationErrorFunc, $$event) {
  var startId = DragUtils$WonderEditor.getDragedId($$event);
  DomHelper$WonderEditor.preventDefault($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragDrop(id, startId, isWidgetFunc, handleRelationErrorFunc);
  if (match) {
    return /* DragDrop */Block.__(1, [
              id,
              startId
            ]);
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
