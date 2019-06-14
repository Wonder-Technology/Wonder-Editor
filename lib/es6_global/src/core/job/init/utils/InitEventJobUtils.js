

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Console$WonderEditor from "../../../external/Console.js";
import * as LogUtils$WonderEditor from "../../../utils/console/LogUtils.js";
import * as EventUtils$WonderEditor from "../../../utils/event/EventUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../utils/ui/ConsoleUtils.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as BrowserEngineService$WonderEditor from "../../../../service/state/engine/BrowserEngineService.js";
import * as ManageEventEngineService$WonderEditor from "../../../../service/state/engine/event/ManageEventEngineService.js";
import * as CreateCustomEventEngineService$WonderEditor from "../../../../service/state/engine/event/CreateCustomEventEngineService.js";

function fromDomEventAndHandleError(fromDomEventFunc, editorState, engineState) {
  return Most.recoverWith((function (e) {
                Console$WonderEditor.throwFatal(e);
                return fromDomEventAndHandleError(fromDomEventFunc, editorState, engineState);
              }), Curry._2(fromDomEventFunc, editorState, engineState));
}

function initJob(param, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var domEventStreamSubscription = Curry._2(param[0], editorState, engineState).subscribe({
        next: (function (param) {
            return /* () */0;
          }),
        error: (function (e) {
            Console$WonderEditor.throwFatal(e);
            return /* () */0;
          }),
        complete: (function (param) {
            return /* () */0;
          })
      });
  return Curry._2(param[1], editorState, ManageEventEngineService$WonderEditor.setDomEventStreamSubscription(domEventStreamSubscription, engineState));
}

function isMouseInView(param, param$1) {
  var y = param$1[1];
  var x = param$1[0];
  var mouseY = param[1];
  var mouseX = param[0];
  if (mouseX >= x && mouseX <= (x + param$1[2] | 0) && mouseY >= y) {
    return mouseY <= (y + param$1[3] | 0);
  } else {
    return false;
  }
}

function isTargetNotCanvas($$event) {
  return $$event.target.tagName !== "CANVAS";
}

function fromPointDomEvent(eventName, engineState) {
  return Most.fromEvent(eventName, EventUtils$WonderEditor.getBody(/* () */0), false);
}

function fromDomEvent(fromPCDomEventArrFunc, editorState, engineState) {
  var match = BrowserEngineService$WonderEditor.isPC(engineState);
  return Most.mergeArray(match ? Curry._1(fromPCDomEventArrFunc, engineState) : (ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("unknown browser", "", "", ""), editorState), /* array */[]));
}

function fromPCDragDomEventArr(param, engineState) {
  var execMouseDragDropEventHandleFunc = param[5];
  var execMouseDragOverEventHandleFunc = param[4];
  var execMouseDragStartEventHandleFunc = param[3];
  var mapMouseEventToViewFunc = param[2];
  var convertDomEventToMouseEventFunc = param[1];
  var setEventTargetFunc = param[0];
  return /* array */[Most.tap((function ($$event) {
                  return Curry._1(execMouseDragOverEventHandleFunc, Curry._1(mapMouseEventToViewFunc, Curry._2(convertDomEventToMouseEventFunc, /* MouseDragOver */7, $$event)));
                }), Most.flatMap((function ($$event) {
                      return Most.until(Most.tap((function ($$event) {
                                        return Curry._1(execMouseDragDropEventHandleFunc, Curry._1(mapMouseEventToViewFunc, Curry._2(convertDomEventToMouseEventFunc, /* MouseDragDrop */8, $$event)));
                                      }), fromPointDomEvent("mouseup", engineState)), Most.skip(2, fromPointDomEvent("mousemove", engineState)));
                    }), Most.tap((function ($$event) {
                          return Curry._1(execMouseDragStartEventHandleFunc, Curry._1(mapMouseEventToViewFunc, Curry._1(setEventTargetFunc, Curry._2(convertDomEventToMouseEventFunc, /* MouseDragStart */6, $$event))));
                        }), fromPointDomEvent("mousedown", engineState))))];
}

var DomEvent = /* module */[
  /* isMouseInView */isMouseInView,
  /* isTargetNotCanvas */isTargetNotCanvas,
  /* fromPointDomEvent */fromPointDomEvent,
  /* fromDomEvent */fromDomEvent,
  /* fromPCDragDomEventArr */fromPCDragDomEventArr
];

function _convertMouseEventToPointEvent(eventName, param) {
  return /* record */[
          /* name */eventName,
          /* location */param[/* location */1],
          /* locationInView */param[/* locationInView */2],
          /* button */param[/* button */3],
          /* wheel */param[/* wheel */4],
          /* movementDelta */param[/* movementDelta */5],
          /* event */param[/* event */6]
        ];
}

function _bindDomEventToTriggerPointEvent(param, param$1, engineState) {
  var isTriggerCustomGlobalEventFunc = param$1[2];
  var convertDomEventToPointEventFunc = param$1[1];
  var pointEventName = param[2];
  var customEventName = param[1];
  return Curry._4(param$1[0], param[0], (function (mouseEvent, engineState) {
                var match = Curry._1(isTriggerCustomGlobalEventFunc, /* () */0);
                if (match) {
                  return ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create(customEventName, Caml_option.some(Curry._2(convertDomEventToPointEventFunc, pointEventName, mouseEvent))), engineState)[0];
                } else {
                  return engineState;
                }
              }), engineState, /* () */0);
}

function bindMouseEventToTriggerPointEvent(param, isTriggerCustomGlobalEventFunc, engineState) {
  return _bindDomEventToTriggerPointEvent(/* tuple */[
              param[0],
              param[1],
              param[2]
            ], /* tuple */[
              (function (param) {
                  var func = function (param$1, param$2, param$3, param$4) {
                    return ManageEventEngineService$WonderEditor.onMouseEvent(param, param$1, param$2, param$3, param$4);
                  };
                  return (function (param) {
                      var func$1 = Curry._1(func, param);
                      return (function (param) {
                          return Curry._2(func$1, param, 0);
                        });
                    });
                }),
              _convertMouseEventToPointEvent,
              isTriggerCustomGlobalEventFunc
            ], engineState);
}

var PointEvent = /* module */[
  /* _convertMouseEventToPointEvent */_convertMouseEventToPointEvent,
  /* _bindDomEventToTriggerPointEvent */_bindDomEventToTriggerPointEvent,
  /* bindMouseEventToTriggerPointEvent */bindMouseEventToTriggerPointEvent
];

export {
  fromDomEventAndHandleError ,
  initJob ,
  DomEvent ,
  PointEvent ,
  
}
/* most Not a pure module */
