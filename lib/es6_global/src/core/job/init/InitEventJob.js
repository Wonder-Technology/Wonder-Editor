

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as LogUtils$WonderEditor from "../../utils/console/LogUtils.js";
import * as EventUtils$WonderEditor from "../../utils/event/EventUtils.js";
import * as ConsoleUtils$WonderEditor from "../../utils/ui/ConsoleUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as BrowserEngineService$WonderEditor from "../../../service/state/engine/BrowserEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as ManageEventEngineService$WonderEditor from "../../../service/state/engine/event/ManageEventEngineService.js";
import * as TargetEventEditorService$WonderEditor from "../../../service/state/editor/event/TargetEventEditorService.js";
import * as GameViewEventEditorService$WonderEditor from "../../../service/state/editor/event/GameViewEventEditorService.js";
import * as HandleDomEventEngineService$WonderEditor from "../../../service/state/engine/event/HandleDomEventEngineService.js";
import * as SceneViewEventEditorService$WonderEditor from "../../../service/state/editor/event/SceneViewEventEditorService.js";
import * as HandleMouseEventEngineService$WonderEditor from "../../../service/state/engine/event/HandleMouseEventEngineService.js";
import * as CreateCustomEventEngineService$WonderEditor from "../../../service/state/engine/event/CreateCustomEventEngineService.js";
import * as HandleKeyboardEventEngineService$WonderEditor from "../../../service/state/engine/event/HandleKeyboardEventEngineService.js";

function _isTriggerGameViewEvent() {
  return TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Game */1;
}

function _isTriggerSceneViewEvent() {
  return TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Scene */0;
}

function _isTriggerOtherEvent() {
  return TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Other */2;
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
  var pointEventName = param[2];
  var customEventName = param[1];
  return Curry._4(param$1[0], param[0], (function (mouseEvent, engineState) {
                var match = Curry._1(isTriggerCustomGlobalEventFunc, /* () */0);
                if (match) {
                  return ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create(customEventName, Js_primitive.some(Curry._2(convertDomEventToPointEventFunc, pointEventName, mouseEvent))), engineState)[0];
                } else {
                  return engineState;
                }
              }), engineState, /* () */0);
}

function _bindMouseEventToTriggerViewPointEvent(param, eventTarget, isTriggerCustomGlobalEventFunc, engineState) {
  return _bindDomEventToTriggerPointEvent(/* tuple */[
              param[0],
              param[1],
              param[2],
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

function _bindMouseEventToTriggerSceneViewPointEvent(param, isTriggerCustomGlobalEventFunc, engineState) {
  return _bindMouseEventToTriggerViewPointEvent(/* tuple */[
              param[0],
              param[1],
              param[2]
            ], /* Scene */0, isTriggerCustomGlobalEventFunc, engineState);
}

function _bindMouseEventToTriggerGameViewPointEvent(param, isTriggerCustomGlobalEventFunc, engineState) {
  return _bindMouseEventToTriggerViewPointEvent(/* tuple */[
              param[0],
              param[1],
              param[2]
            ], /* Game */1, isTriggerCustomGlobalEventFunc, engineState);
}

function bindDomEventToTriggerPointEvent(editorState, engineState) {
  var match = BrowserEngineService$WonderEditor.isPC(engineState);
  if (match) {
    return _bindMouseEventToTriggerSceneViewPointEvent(/* tuple */[
                /* MouseDragDrop */8,
                SceneViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0),
                /* PointDragDrop */7
              ], _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* tuple */[
                    /* MouseDragOver */7,
                    SceneViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0),
                    /* PointDragOver */6
                  ], _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* tuple */[
                        /* MouseDragStart */6,
                        SceneViewEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0),
                        /* PointDragStart */5
                      ], _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* tuple */[
                            /* MouseMove */4,
                            SceneViewEventEditorService$WonderEditor.getPointMoveEventName(/* () */0),
                            /* PointMove */3
                          ], _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* tuple */[
                                /* MouseWheel */5,
                                SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0),
                                /* PointScale */4
                              ], _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* tuple */[
                                    /* MouseDown */2,
                                    SceneViewEventEditorService$WonderEditor.getPointDownEventName(/* () */0),
                                    /* PointDown */1
                                  ], _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* tuple */[
                                        /* MouseUp */3,
                                        SceneViewEventEditorService$WonderEditor.getPointUpEventName(/* () */0),
                                        /* PointUp */2
                                      ], _isTriggerSceneViewEvent, _bindMouseEventToTriggerSceneViewPointEvent(/* tuple */[
                                            /* Click */1,
                                            SceneViewEventEditorService$WonderEditor.getPointTapEventName(/* () */0),
                                            /* PointTap */0
                                          ], _isTriggerSceneViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* tuple */[
                                                /* MouseDragDrop */8,
                                                GameViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0),
                                                /* PointDragDrop */7
                                              ], _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* tuple */[
                                                    /* MouseDragOver */7,
                                                    GameViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0),
                                                    /* PointDragOver */6
                                                  ], _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* tuple */[
                                                        /* MouseDragStart */6,
                                                        GameViewEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0),
                                                        /* PointDragStart */5
                                                      ], _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* tuple */[
                                                            /* MouseMove */4,
                                                            GameViewEventEditorService$WonderEditor.getPointMoveEventName(/* () */0),
                                                            /* PointMove */3
                                                          ], _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* tuple */[
                                                                /* MouseWheel */5,
                                                                GameViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0),
                                                                /* PointScale */4
                                                              ], _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* tuple */[
                                                                    /* MouseDown */2,
                                                                    GameViewEventEditorService$WonderEditor.getPointDownEventName(/* () */0),
                                                                    /* PointDown */1
                                                                  ], _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* tuple */[
                                                                        /* MouseUp */3,
                                                                        GameViewEventEditorService$WonderEditor.getPointUpEventName(/* () */0),
                                                                        /* PointUp */2
                                                                      ], _isTriggerGameViewEvent, _bindMouseEventToTriggerGameViewPointEvent(/* tuple */[
                                                                            /* Click */1,
                                                                            GameViewEventEditorService$WonderEditor.getPointTapEventName(/* () */0),
                                                                            /* PointTap */0
                                                                          ], _isTriggerGameViewEvent, engineState))))))))))))))));
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

function _fromPointDomEvent(eventName, _) {
  return Most.fromEvent(eventName, EventUtils$WonderEditor.getBody(/* () */0), false);
}

function _fromKeyboardDomEvent(eventName, _) {
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

function _execMouseDragOverEventHandle(mouseEvent) {
  StateEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setLastXYByLocation(mouseEvent, HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
  return /* () */0;
}

function _execMouseDragStartEventHandle(mouseEvent) {
  StateEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setLastXY(undefined, undefined, HandleMouseEventEngineService$WonderEditor.setIsDrag(true, HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)))));
  return /* () */0;
}

function _execMouseDragDropEventHandle(mouseEvent) {
  StateEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setIsDrag(false, HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
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
  StateEditorService$WonderEditor.setState(TargetEventEditorService$WonderEditor.setEventTarget(eventTarget, editorState));
  return mouseEvent;
}

function _mapMouseEventToView(mouseEvent) {
  var locationInView = mouseEvent[/* locationInView */2];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = GameViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
  var match$1 = TargetEventEditorService$WonderEditor.getEventTarget(editorState);
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
    return _execKeyboardEventHandle(gameViewEventName, $$event);
  } else {
    var match$1 = _isTriggerSceneViewEvent(/* () */0);
    if (match$1) {
      return _execKeyboardEventHandle(sceneViewEventName, $$event);
    } else {
      return /* () */0;
    }
  }
}

function _fromPCDomEventArr(engineState) {
  return /* array */[
          Most.tap((function ($$event) {
                  HandleDomEventEngineService$WonderEditor.preventDefault($$event);
                  return /* () */0;
                }), Most.fromEvent("contextmenu", EventUtils$WonderEditor.getBody(/* () */0), false)),
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
                  return _execMouseDragOverEventHandle(_mapMouseEventToView(_convertDomEventToMouseEvent(/* MouseDragOver */7, $$event)));
                }), Most.flatMap((function () {
                      return Most.until(Most.tap((function ($$event) {
                                        return _execMouseDragDropEventHandle(_mapMouseEventToView(_convertDomEventToMouseEvent(/* MouseDragDrop */8, $$event)));
                                      }), _fromPointDomEvent("mouseup", engineState)), _fromPointDomEvent("mousemove", engineState));
                    }), Most.tap((function ($$event) {
                          return _execMouseDragStartEventHandle(_mapMouseEventToView(_convertDomEventToMouseEvent(/* MouseDragStart */6, $$event)));
                        }), _fromPointDomEvent("mousedown", engineState)))),
          Most.tap((function ($$event) {
                  return _execViewKeyboardEventHandle(/* KeyUp_SceneView */19, /* KeyUp_GameView */9, $$event);
                }), _fromKeyboardDomEvent("keyup", engineState)),
          Most.tap((function ($$event) {
                  return _execViewKeyboardEventHandle(/* KeyDown_SceneView */20, /* KeyDown_GameView */10, $$event);
                }), _fromKeyboardDomEvent("keydown", engineState)),
          Most.tap((function ($$event) {
                  return _execViewKeyboardEventHandle(/* KeyPress_SceneView */21, /* KeyPress_GameView */11, $$event);
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
  /* _execMouseDragOverEventHandle */_execMouseDragOverEventHandle,
  /* _execMouseDragStartEventHandle */_execMouseDragStartEventHandle,
  /* _execMouseDragDropEventHandle */_execMouseDragDropEventHandle,
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

function initEventForEditorJob(_, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var domEventStreamSubscription = fromDomEvent(editorState, engineState).subscribe({
        next: (function () {
            return /* () */0;
          }),
        error: (function (e) {
            return handleDomEventStreamError(e, editorState);
          }),
        complete: (function () {
            return /* () */0;
          })
      });
  return bindDomEventToTriggerPointEvent(editorState, ManageEventEngineService$WonderEditor.setDomEventStreamSubscription(domEventStreamSubscription, engineState));
}

export {
  _isTriggerGameViewEvent ,
  _isTriggerSceneViewEvent ,
  _isTriggerOtherEvent ,
  PointEvent ,
  DomEvent ,
  initEventForEditorJob ,
  
}
/* most Not a pure module */
