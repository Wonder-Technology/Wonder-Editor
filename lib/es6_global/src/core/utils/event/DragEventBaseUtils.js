

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Result$WonderEditor from "../../../module/Result.js";
import * as DragUtils$WonderEditor from "../../atom_component/dragTree/utils/DragUtils.js";
import * as EventHelper$WonderEditor from "../../external/EventHelper.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../service/state/editor/CurrentDragSourceEditorService.js";

function dragStart(id, widget, dragImg, effectAllowd, $$event) {
  EventHelper$WonderEditor.stopPropagation($$event);
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

function _isTreeNodeRelationValid(targetId, startId, checkNodeRelationFunc) {
  if (startId !== undefined) {
    var relationResult = StateLogicService$WonderEditor.getStateToGetData(Curry._2(checkNodeRelationFunc, Js_primitive.valFromOption(startId), targetId));
    return /* tuple */[
            Result$WonderEditor.RelationResult[/* isSuccess */2](relationResult),
            relationResult
          ];
  } else {
    return /* tuple */[
            false,
            undefined
          ];
  }
}

function isValidForDragEnter(id, isWidgetFunc, checkNodeRelationFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  var match$1 = !Curry._1(isWidgetFunc, match[0]);
  if (match$1) {
    return /* tuple */[
            false,
            undefined
          ];
  } else {
    return _isTreeNodeRelationValid(id, match[1], checkNodeRelationFunc);
  }
}

function isValidForDragDrop(id, startId, isWidgetFunc, checkNodeRelationFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  var match$1 = !Curry._1(isWidgetFunc, match[0]);
  if (match$1) {
    return /* tuple */[
            false,
            undefined
          ];
  } else {
    return _isTreeNodeRelationValid(id, Js_primitive.some(startId), checkNodeRelationFunc);
  }
}

export {
  dragStart ,
  _isTreeNodeRelationValid ,
  isValidForDragEnter ,
  isValidForDragDrop ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
