

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as LogUtils$WonderEditor from "../../console/LogUtils.js";
import * as EventUtils$WonderEditor from "../../event/EventUtils.js";
import * as ConsoleUtils$WonderEditor from "../../ui/ConsoleUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as EventEditorService$WonderEditor from "../../../../service/state/editor/event/EventEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";
import * as BrowserEngineService$WonderEditor from "../../../../service/state/engine/BrowserEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../../../service/state/engine/DirectorEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as NameEventEngineService$WonderEditor from "../../../../service/state/engine/event/NameEventEngineService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as ManageEventEngineService$WonderEditor from "../../../../service/state/engine/event/ManageEventEngineService.js";
import * as HandleDomEventEngineService$WonderEditor from "../../../../service/state/engine/event/HandleDomEventEngineService.js";
import * as HandleMouseEventEngineService$WonderEditor from "../../../../service/state/engine/event/HandleMouseEventEngineService.js";
import * as CreateCustomEventEngineService$WonderEditor from "../../../../service/state/engine/event/CreateCustomEventEngineService.js";
import * as HandleKeyboardEventEngineService$WonderEditor from "../../../../service/state/engine/event/HandleKeyboardEventEngineService.js";

function _loopBodyWhenStop(engineState) {
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    return engineState;
  } else {
    return DirectorEngineService$WonderEditor.loopBody(0, engineState);
  }
}

function _deferExec (func){
      setTimeout(() => {
        func();
      }, 0)
      };

function _triggerRefreshInspectorEvent(engineState) {
  _deferExec((function (param) {
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var match = ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create(EventEditorService$WonderEditor.getRefreshInspectorEventName(/* () */0), undefined), engineState);
          StateEngineService$WonderEditor.setState(match[0]);
          return /* () */0;
        }));
  return engineState;
}

function _isTriggerGameViewEvent(param) {
  return EventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Game */1;
}

function _isTriggerSceneViewEvent(param) {
  return EventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Scene */0;
}

function _isTriggerOtherEvent(param) {
  return EventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Other */2;
}

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
  var eventTarget = param[3];
  var pointEventName = param[2];
  var customEventName = param[1];
  return Curry._4(param$1[0], param[0], (function (mouseEvent, engineState) {
                var match = Curry._1(isTriggerCustomGlobalEventFunc, /* () */0);
                if (match) {
                  var engineState$1 = _triggerRefreshInspectorEvent(engineState);
                  var match$1 = ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create(customEventName, Caml_option.some(Curry._2(convertDomEventToPointEventFunc, pointEventName, mouseEvent))), engineState$1);
                  var engineState$2 = match$1[0];
                  if (eventTarget !== 0) {
                    return engineState$2;
                  } else {
                    return _loopBodyWhenStop(engineState$2);
                  }
                } else {
                  return engineState;
                }
              }), engineState, /* () */0);
}

function _bindMouseEventToTriggerViewPointEvent(mouseEventName, customEventName, pointEventName, eventTarget, isTriggerCustomGlobalEventFunc, engineState) {
  return _bindDomEventToTriggerPointEvent(/* tuple */[
              mouseEventName,
              customEventName,
              pointEventName,
              eventTarget
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

function _bindMouseEventToTriggerSceneViewPointEvent(mouseEventName, customEventName, pointEventName, isTriggerCustomGlobalEventFunc, engineState) {
  return _bindMouseEventToTriggerViewPointEvent(mouseEventName, customEventName, pointEventName, /* Scene */0, isTriggerCustomGlobalEventFunc, engineState);
}

function _bindMouseEventToTriggerGameViewPointEvent(mouseEventName, customEventName, pointEventName, isTriggerCustomGlobalEventFunc, engineState) {
  return _bindMouseEventToTriggerViewPointEvent(mouseEventName, customEventName, pointEventName, /* Game */1, isTriggerCustomGlobalEventFunc, engineState);
}

function bindDomEventToTriggerPointEvent(editorState, engineState) {
  var match = BrowserEngineService$WonderEditor.isPC(engineState);
  if (match) {
    return _bindMouseEventToTriggerSceneViewPointEvent(/* MouseDrag */6, EventEditorService$WonderEditor.getPointDragEventName(/* () */0), /* PointDrag */5, _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* MouseMove */4, EventEditorService$WonderEditor.getPointMoveEventName(/* () */0), /* PointMove */3, _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* MouseWheel */5, EventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* PointScale */4, _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* MouseDown */2, EventEditorService$WonderEditor.getPointDownEventName(/* () */0), /* PointDown */1, _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* MouseUp */3, EventEditorService$WonderEditor.getPointUpEventName(/* () */0), /* PointUp */2, _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* Click */1, EventEditorService$WonderEditor.getPointTapEventName(/* () */0), /* PointTap */0, _isTriggerSceneViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* MouseDrag */6, NameEventEngineService$WonderEditor.getPointDragEventName(/* () */0), /* PointDrag */5, _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* MouseMove */4, NameEventEngineService$WonderEditor.getPointMoveEventName(/* () */0), /* PointMove */3, _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* MouseWheel */5, NameEventEngineService$WonderEditor.getPointScaleEventName(/* () */0), /* PointScale */4, _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* MouseDown */2, NameEventEngineService$WonderEditor.getPointDownEventName(/* () */0), /* PointDown */1, _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* MouseUp */3, NameEventEngineService$WonderEditor.getPointUpEventName(/* () */0), /* PointUp */2, _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* Click */1, NameEventEngineService$WonderEditor.getPointTapEventName(/* () */0), /* PointTap */0, _isTriggerGameViewEvent, engineState))))))))))));
  } else {
    ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("unknown browser", "", "", ""), editorState);
    return engineState;
  }
}

var PointEvent = /* module */[
  /* _convertMouseEventToPointEvent */_convertMouseEventToPointEvent,
  /* _bindDomEventToTriggerPointEvent */_bindDomEventToTriggerPointEvent,
  /* _bindMouseEventToTriggerViewPointEvent */_bindMouseEventToTriggerViewPointEvent,
  /* _bindMouseEventToTriggerSceneViewPointEvent */_bindMouseEventToTriggerSceneViewPointEvent,
  /* _bindMouseEventToTriggerGameViewPointEvent */_bindMouseEventToTriggerGameViewPointEvent,
  /* bindDomEventToTriggerPointEvent */bindDomEventToTriggerPointEvent
];

function _fromPointDomEvent(eventName, engineState) {
  return Most.fromEvent(eventName, EventUtils$WonderEditor.getBody(/* () */0), false);
}

function _fromKeyboardDomEvent(eventName, engineState) {
  return Most.fromEvent(eventName, EventUtils$WonderEditor.getBody(/* () */0), false);
}

function _preventContextMenuEvent($$event) {
  HandleDomEventEngineService$WonderEditor.preventDefault($$event);
  return /* () */0;
}

function _execMouseEventHandle(mouseEvent) {
  StateEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function _execMouseMoveEventHandle(mouseEventName, $$event) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var mouseEvent = HandleMouseEventEngineService$WonderEditor.convertMouseDomEventToMouseEvent(mouseEventName, $$event, engineState);
  StateEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setLastXYWhenMouseMove(mouseEvent, HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, engineState)));
  return /* () */0;
}

function _execMouseDragingEventHandle(mouseEvent) {
  StateEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setLastXYByLocation(mouseEvent, HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
  return /* () */0;
}

function _execMouseDragStartEventHandle(param) {
  StateEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setLastXY(undefined, undefined, HandleMouseEventEngineService$WonderEditor.setIsDrag(true, StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
  return /* () */0;
}

function _execMouseDragEndEventHandle(param) {
  StateEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setIsDrag(false, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function _execKeyboardEventHandle(keyboardEventName, $$event) {
  StateEngineService$WonderEditor.setState(HandleKeyboardEventEngineService$WonderEditor.execEventHandle(keyboardEventName, $$event, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function _isMouseInView(param, param$1) {
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

function _isTargetNotCanvas($$event) {
  return $$event.target.tagName !== "CANVAS";
}

function _setEventTarget(mouseEvent) {
  var locationInView = mouseEvent[/* locationInView */2];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = _isTargetNotCanvas(mouseEvent[/* event */6]);
  var eventTarget;
  if (match) {
    eventTarget = /* Other */2;
  } else {
    var match$1 = _isMouseInView(locationInView, SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState));
    if (match$1) {
      eventTarget = /* Scene */0;
    } else {
      var match$2 = _isMouseInView(locationInView, GameViewEditorService$WonderEditor.unsafeGetViewRect(editorState));
      eventTarget = match$2 ? /* Game */1 : /* Other */2;
    }
  }
  StateEditorService$WonderEditor.setState(EventEditorService$WonderEditor.setEventTarget(eventTarget, editorState));
  return mouseEvent;
}

function _mapMouseEventToView(mouseEvent) {
  var locationInView = mouseEvent[/* locationInView */2];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = GameViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
  var match$1 = EventEditorService$WonderEditor.getEventTarget(editorState);
  if (match$1 !== 1) {
    return mouseEvent;
  } else {
    return /* record */[
            /* name */mouseEvent[/* name */0],
            /* location */mouseEvent[/* location */1],
            /* locationInView : tuple */[
              locationInView[0] - match[0] | 0,
              locationInView[1] - match[1] | 0
            ],
            /* button */mouseEvent[/* button */3],
            /* wheel */mouseEvent[/* wheel */4],
            /* movementDelta */mouseEvent[/* movementDelta */5],
            /* event */mouseEvent[/* event */6]
          ];
  }
}

function _convertDomEventToMouseEvent(eventName, $$event) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return HandleMouseEventEngineService$WonderEditor.convertMouseDomEventToMouseEvent(eventName, $$event, engineState);
}

function _mapAndExecMouseEventHandle(eventName, $$event) {
  return _execMouseEventHandle(_mapMouseEventToView(_convertDomEventToMouseEvent(eventName, $$event)));
}

function _execViewKeyboardEventHandle(sceneViewEventName, gameViewEventName, $$event) {
  var match = _isTriggerGameViewEvent(/* () */0);
  if (match) {
    StateLogicService$WonderEditor.getAndSetEngineState(_triggerRefreshInspectorEvent);
    return _execKeyboardEventHandle(gameViewEventName, $$event);
  } else {
    var match$1 = _isTriggerSceneViewEvent(/* () */0);
    if (match$1) {
      _execKeyboardEventHandle(sceneViewEventName, $$event);
      return StateLogicService$WonderEditor.getAndSetEngineState(_loopBodyWhenStop);
    } else {
      return /* () */0;
    }
  }
}

function _fromPCDomEventArr(engineState) {
  return /* array */[
          Most.tap(_preventContextMenuEvent, Most.fromEvent("contextmenu", EventUtils$WonderEditor.getBody(/* () */0), false)),
          Most.tap((function ($$event) {
                  return _mapAndExecMouseEventHandle(/* Click */1, $$event);
                }), _fromPointDomEvent("click", engineState)),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(_mapMouseEventToView(_setEventTarget(_convertDomEventToMouseEvent(/* MouseDown */2, $$event))));
                }), _fromPointDomEvent("mousedown", engineState)),
          Most.tap((function ($$event) {
                  return _mapAndExecMouseEventHandle(/* MouseUp */3, $$event);
                }), _fromPointDomEvent("mouseup", engineState)),
          Most.tap((function ($$event) {
                  return _mapAndExecMouseEventHandle(/* MouseMove */4, $$event);
                }), _fromPointDomEvent("mousemove", engineState)),
          Most.tap((function ($$event) {
                  return _mapAndExecMouseEventHandle(/* MouseWheel */5, $$event);
                }), _fromPointDomEvent("mousewheel", engineState)),
          Most.tap((function ($$event) {
                  return _execMouseDragingEventHandle(_mapMouseEventToView(_convertDomEventToMouseEvent(/* MouseDrag */6, $$event)));
                }), Most.flatMap((function ($$event) {
                      return Most.until(Most.tap((function ($$event) {
                                        return _execMouseDragEndEventHandle(/* () */0);
                                      }), _fromPointDomEvent("mouseup", engineState)), _fromPointDomEvent("mousemove", engineState));
                    }), Most.tap((function ($$event) {
                          return _execMouseDragStartEventHandle(/* () */0);
                        }), _fromPointDomEvent("mousedown", engineState)))),
          Most.tap((function ($$event) {
                  return _execViewKeyboardEventHandle(/* KeyUp_editor */15, /* KeyUp */7, $$event);
                }), _fromKeyboardDomEvent("keyup", engineState)),
          Most.tap((function ($$event) {
                  return _execViewKeyboardEventHandle(/* KeyDown_editor */16, /* KeyDown */8, $$event);
                }), _fromKeyboardDomEvent("keydown", engineState)),
          Most.tap((function ($$event) {
                  return _execViewKeyboardEventHandle(/* KeyPress_editor */17, /* KeyPress */9, $$event);
                }), _fromKeyboardDomEvent("keypress", engineState))
        ];
}

function fromDomEvent(editorState, engineState) {
  var match = BrowserEngineService$WonderEditor.isPC(engineState);
  return Most.mergeArray(match ? _fromPCDomEventArr(engineState) : (ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("unknown browser", "", "", ""), editorState), /* array */[]));
}

function handleDomEventStreamError(e, editorState) {
  var message = e.message;
  var stack = e.stack;
  var partial_arg = "message:" + (String(message) + ("\nstack:" + (String(stack) + "")));
  var partial_arg$1 = "from dom event stream error";
  return ConsoleUtils$WonderEditor.debug((function (param) {
                return LogUtils$WonderEditor.buildDebugMessage(partial_arg$1, partial_arg, param);
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), editorState);
}

var DomEvent = /* module */[
  /* _fromPointDomEvent */_fromPointDomEvent,
  /* _fromKeyboardDomEvent */_fromKeyboardDomEvent,
  /* _preventContextMenuEvent */_preventContextMenuEvent,
  /* _execMouseEventHandle */_execMouseEventHandle,
  /* _execMouseMoveEventHandle */_execMouseMoveEventHandle,
  /* _execMouseDragingEventHandle */_execMouseDragingEventHandle,
  /* _execMouseDragStartEventHandle */_execMouseDragStartEventHandle,
  /* _execMouseDragEndEventHandle */_execMouseDragEndEventHandle,
  /* _execKeyboardEventHandle */_execKeyboardEventHandle,
  /* _isMouseInView */_isMouseInView,
  /* _isTargetNotCanvas */_isTargetNotCanvas,
  /* _setEventTarget */_setEventTarget,
  /* _mapMouseEventToView */_mapMouseEventToView,
  /* _convertDomEventToMouseEvent */_convertDomEventToMouseEvent,
  /* _mapAndExecMouseEventHandle */_mapAndExecMouseEventHandle,
  /* _execViewKeyboardEventHandle */_execViewKeyboardEventHandle,
  /* _fromPCDomEventArr */_fromPCDomEventArr,
  /* fromDomEvent */fromDomEvent,
  /* handleDomEventStreamError */handleDomEventStreamError
];

function initEventForEditorJob(param, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var domEventStreamSubscription = fromDomEvent(editorState, engineState).subscribe({
        next: (function (param) {
            return /* () */0;
          }),
        error: (function (e) {
            return handleDomEventStreamError(e, editorState);
          }),
        complete: (function (param) {
            return /* () */0;
          })
      });
  return bindDomEventToTriggerPointEvent(editorState, ManageEventEngineService$WonderEditor.setDomEventStreamSubscription(domEventStreamSubscription, engineState));
}

export {
  _loopBodyWhenStop ,
  _deferExec ,
  _triggerRefreshInspectorEvent ,
  _isTriggerGameViewEvent ,
  _isTriggerSceneViewEvent ,
  _isTriggerOtherEvent ,
  PointEvent ,
  DomEvent ,
  initEventForEditorJob ,
  
}
/* most Not a pure module */
