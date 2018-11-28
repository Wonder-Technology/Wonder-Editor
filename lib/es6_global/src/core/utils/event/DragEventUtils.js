

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../atom_component/dragTree/utils/DragUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as DragEventBaseUtils$WonderEditor from "./DragEventBaseUtils.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../service/state/editor/CurrentDragSourceEditorService.js";

function handleDragStart(id, widge, dragImg, $$event) {
  DragEventBaseUtils$WonderEditor.dragStart(id, widge, dragImg, $$event);
  return /* DragStart */4;
}

function handleDragEnter(id, handleWidgeFunc, handleRelationErrorFunc, _) {
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragEnter(id, handleWidgeFunc, handleRelationErrorFunc);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(_, _$1, _$2, $$event) {
  DomHelper$WonderEditor.stopPropagation($$event);
  return /* DragLeave */2;
}

var handleDragOver = DomHelper$WonderEditor.preventDefault;

function handleDrop(uid, handleWidgeFunc, handleRelationErrorFunc, $$event) {
  var startId = DragUtils$WonderEditor.getDragedUid($$event);
  var match = DragEventBaseUtils$WonderEditor.isTriggerDragDrop(uid, startId, handleWidgeFunc, handleRelationErrorFunc);
  if (match) {
    return /* DragDrop */Block.__(1, [
              uid,
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
