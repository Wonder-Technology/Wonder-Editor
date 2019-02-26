

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as DragUtils$WonderEditor from "../../atom_component/dragTree/utils/DragUtils.js";
import * as EventHelper$WonderEditor from "../../external/EventHelper.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as DragEventBaseUtils$WonderEditor from "./DragEventBaseUtils.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../service/state/editor/CurrentDragSourceEditorService.js";

function handleDragStart(param, param$1, $$event) {
  DragEventBaseUtils$WonderEditor.dragStart(param[0], param[2], /* tuple */[
        param$1[0],
        param$1[1]
      ], $$event);
  return param[1];
}

function handleDragEnter(id, param, param$1, _) {
  var match = DragEventBaseUtils$WonderEditor.isValidForDragEnter(id, param$1[0], param$1[1]);
  if (match[0]) {
    return param[0];
  } else {
    return param[1];
  }
}

function handleDragLeave(_, dragLeaveAction, $$event) {
  EventHelper$WonderEditor.stopPropagation($$event);
  return dragLeaveAction;
}

function handleDragOver(dropEffect, $$event) {
  DragUtils$WonderEditor.setDataTransferDropEffect(dropEffect, $$event);
  return EventHelper$WonderEditor.preventDefault($$event);
}

function handleDrop(id, param, param$1, $$event) {
  var startId = DragUtils$WonderEditor.getDragedId($$event);
  EventHelper$WonderEditor.preventDefault($$event);
  var match = DragEventBaseUtils$WonderEditor.isValidForDragDrop(id, startId, param$1[0], param$1[1]);
  if (match[0]) {
    return Curry._2(param[0], id, startId);
  } else {
    return param[1];
  }
}

function handleDragEnd(dragEndAction, _) {
  StateLogicService$WonderEditor.getAndSetEditorState(CurrentDragSourceEditorService$WonderEditor.clearCurrentDragSource);
  return dragEndAction;
}

export {
  handleDragStart ,
  handleDragEnter ,
  handleDragLeave ,
  handleDragOver ,
  handleDrop ,
  handleDragEnd ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
