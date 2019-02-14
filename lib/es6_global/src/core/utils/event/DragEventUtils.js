

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Result$WonderEditor from "../../../module/Result.js";
import * as DragUtils$WonderEditor from "../../atom_component/dragTree/utils/DragUtils.js";
import * as EventHelper$WonderEditor from "../../external/EventHelper.js";
import * as ConsoleUtils$WonderEditor from "../ui/ConsoleUtils.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as DragEventBaseUtils$WonderEditor from "./DragEventBaseUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../service/state/editor/CurrentDragSourceEditorService.js";

function handleDragStart(id, dragStartAction, widget, dragImg, effectAllowd, $$event) {
  DragEventBaseUtils$WonderEditor.dragStart(id, widget, dragImg, effectAllowd, $$event);
  return dragStartAction;
}

function handleDragEnter(id, param, isWidgetFunc, checkNodeRelationFunc, _) {
  var match = DragEventBaseUtils$WonderEditor.checkDragEnter(id, isWidgetFunc, checkNodeRelationFunc);
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

function handleDrop(id, param, isWidgetFunc, checkNodeRelationFunc, $$event) {
  var startId = DragUtils$WonderEditor.getDragedId($$event);
  EventHelper$WonderEditor.preventDefault($$event);
  var match = DragEventBaseUtils$WonderEditor.checkDragDrop(id, startId, isWidgetFunc, checkNodeRelationFunc);
  OptionService$WonderEditor.handleSomeAndIgnore((function (relationResult) {
          return Result$WonderEditor.RelationResult[/* handleError */3]((function (msgOpt) {
                        return OptionService$WonderEditor.handleSomeAndIgnore((function (msg) {
                                      return ConsoleUtils$WonderEditor.error(msg, StateEditorService$WonderEditor.getState(/* () */0));
                                    }), msgOpt);
                      }), relationResult);
        }), match[1]);
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
/* ConsoleUtils-WonderEditor Not a pure module */
