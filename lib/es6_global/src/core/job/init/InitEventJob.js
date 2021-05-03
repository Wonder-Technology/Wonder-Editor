

import * as Most from "most";
import * as LogUtils$WonderEditor from "../../utils/console/LogUtils.js";
import * as EventUtils$WonderEditor from "../../utils/event/EventUtils.js";
import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../utils/ui/ConsoleUtils.js";
import * as InitEventJobUtils$WonderEditor from "./utils/InitEventJobUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as BrowserEngineService$WonderEditor from "../../../service/state/engine/BrowserEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TargetEventEditorService$WonderEditor from "../../../service/state/editor/event/TargetEventEditorService.js";
import * as GameViewEventEditorService$WonderEditor from "../../../service/state/editor/event/GameViewEventEditorService.js";
import * as HandleDomEventEngineService$WonderEditor from "../../../service/state/engine/event/HandleDomEventEngineService.js";
import * as SceneViewEventEditorService$WonderEditor from "../../../service/state/editor/event/SceneViewEventEditorService.js";
import * as HandleMouseEventEngineService$WonderEditor from "../../../service/state/engine/event/HandleMouseEventEngineService.js";
import * as HandleKeyboardEventEngineService$WonderEditor from "../../../service/state/engine/event/HandleKeyboardEventEngineService.js";

function _isTriggerGameViewEvent(param) {
  return TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Game */1;
}

function _isTriggerSceneViewEvent(param) {
  return TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Scene */0;
}

function _isTriggerOtherEvent(param) {
  return TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Other */2;
}

function bindDomEventToTriggerPointEvent(editorState, engineState) {
  var match = BrowserEngineService$WonderEditor.isPC(engineState);
  if (match) {
    return InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                /* MouseDragDrop */8,
                SceneViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0),
                /* PointDragDrop */7
              ], _isTriggerSceneViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                    /* MouseDragOver */7,
                    SceneViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0),
                    /* PointDragOver */6
                  ], _isTriggerSceneViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                        /* MouseDragStart */6,
                        SceneViewEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0),
                        /* PointDragStart */5
                      ], _isTriggerSceneViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                            /* MouseMove */4,
                            SceneViewEventEditorService$WonderEditor.getPointMoveEventName(/* () */0),
                            /* PointMove */3
                          ], _isTriggerSceneViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                /* MouseWheel */5,
                                SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0),
                                /* PointScale */4
                              ], _isTriggerSceneViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                    /* MouseDown */2,
                                    SceneViewEventEditorService$WonderEditor.getPointDownEventName(/* () */0),
                                    /* PointDown */1
                                  ], _isTriggerSceneViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                        /* MouseUp */3,
                                        SceneViewEventEditorService$WonderEditor.getPointUpEventName(/* () */0),
                                        /* PointUp */2
                                      ], _isTriggerSceneViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                            /* Click */1,
                                            SceneViewEventEditorService$WonderEditor.getPointTapEventName(/* () */0),
                                            /* PointTap */0
                                          ], _isTriggerSceneViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                                /* MouseDragDrop */8,
                                                GameViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0),
                                                /* PointDragDrop */7
                                              ], _isTriggerGameViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                                    /* MouseDragOver */7,
                                                    GameViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0),
                                                    /* PointDragOver */6
                                                  ], _isTriggerGameViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                                        /* MouseDragStart */6,
                                                        GameViewEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0),
                                                        /* PointDragStart */5
                                                      ], _isTriggerGameViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                                            /* MouseMove */4,
                                                            GameViewEventEditorService$WonderEditor.getPointMoveEventName(/* () */0),
                                                            /* PointMove */3
                                                          ], _isTriggerGameViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                                                /* MouseWheel */5,
                                                                GameViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0),
                                                                /* PointScale */4
                                                              ], _isTriggerGameViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                                                    /* MouseDown */2,
                                                                    GameViewEventEditorService$WonderEditor.getPointDownEventName(/* () */0),
                                                                    /* PointDown */1
                                                                  ], _isTriggerGameViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                                                        /* MouseUp */3,
                                                                        GameViewEventEditorService$WonderEditor.getPointUpEventName(/* () */0),
                                                                        /* PointUp */2
                                                                      ], _isTriggerGameViewEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                                                                            /* Click */1,
                                                                            GameViewEventEditorService$WonderEditor.getPointTapEventName(/* () */0),
                                                                            /* PointTap */0
                                                                          ], _isTriggerGameViewEvent, engineState))))))))))))))));
  } else {
    ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("unknown browser", "", "", ""), editorState);
    return engineState;
  }
}

var PointEvent = /* module */[/* bindDomEventToTriggerPointEvent */bindDomEventToTriggerPointEvent];

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

function _setEventTarget(mouseEvent) {
  var locationInView = mouseEvent[/* locationInView */2];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = InitEventJobUtils$WonderEditor.DomEvent[/* isTargetNotCanvas */1](mouseEvent[/* event */6]);
  var eventTarget;
  if (match) {
    eventTarget = /* Other */2;
  } else {
    var match$1 = InitEventJobUtils$WonderEditor.DomEvent[/* isMouseInView */0](locationInView, SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState));
    if (match$1) {
      eventTarget = /* Scene */0;
    } else {
      var match$2 = InitEventJobUtils$WonderEditor.DomEvent[/* isMouseInView */0](locationInView, GameViewEditorService$WonderEditor.unsafeGetViewRect(editorState));
      eventTarget = match$2 ? /* Game */1 : /* Other */2;
    }
  }
  StateEditorService$WonderEditor.setState(TargetEventEditorService$WonderEditor.setEventTarget(eventTarget, editorState));
  return mouseEvent;
}

function _mapMouseEventToView(mouseEvent) {
  var locationInView = mouseEvent[/* locationInView */2];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = GameViewEditorService$WonderEditor.getViewRect(editorState);
  var match$1 = match !== undefined ? match : /* tuple */[
      0,
      0,
      0,
      0
    ];
  var match$2 = TargetEventEditorService$WonderEditor.getEventTarget(editorState);
  if (match$2 !== 1) {
    return mouseEvent;
  } else {
    return /* record */[
            /* name */mouseEvent[/* name */0],
            /* location */mouseEvent[/* location */1],
            /* locationInView : tuple */[
              locationInView[0] - match$1[0] | 0,
              locationInView[1] - match$1[1] | 0
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

function fromPCDomEventArr(engineState) {
  return ArrayService$WonderEditor.fastConcat(/* array */[
              Most.tap(_preventContextMenuEvent, Most.fromEvent("contextmenu", EventUtils$WonderEditor.getBody(/* () */0), false)),
              Most.tap((function ($$event) {
                      return _mapAndExecMouseEventHandle(/* Click */1, $$event);
                    }), InitEventJobUtils$WonderEditor.DomEvent[/* fromPointDomEvent */2]("click", engineState)),
              Most.tap((function ($$event) {
                      return _execMouseEventHandle(_mapMouseEventToView(_setEventTarget(_convertDomEventToMouseEvent(/* MouseDown */2, $$event))));
                    }), InitEventJobUtils$WonderEditor.DomEvent[/* fromPointDomEvent */2]("mousedown", engineState)),
              Most.tap((function ($$event) {
                      return _mapAndExecMouseEventHandle(/* MouseUp */3, $$event);
                    }), InitEventJobUtils$WonderEditor.DomEvent[/* fromPointDomEvent */2]("mouseup", engineState)),
              Most.tap((function ($$event) {
                      return _mapAndExecMouseEventHandle(/* MouseMove */4, $$event);
                    }), InitEventJobUtils$WonderEditor.DomEvent[/* fromPointDomEvent */2]("mousemove", engineState)),
              Most.tap((function ($$event) {
                      return _execMouseEventHandle(_mapMouseEventToView(_setEventTarget(_convertDomEventToMouseEvent(/* MouseWheel */5, $$event))));
                    }), InitEventJobUtils$WonderEditor.DomEvent[/* fromPointDomEvent */2]("mousewheel", engineState)),
              Most.tap((function ($$event) {
                      return _execViewKeyboardEventHandle(/* KeyUp_SceneView */19, /* KeyUp_GameView */9, $$event);
                    }), _fromKeyboardDomEvent("keyup", engineState)),
              Most.tap((function ($$event) {
                      return _execViewKeyboardEventHandle(/* KeyDown_SceneView */20, /* KeyDown_GameView */10, $$event);
                    }), _fromKeyboardDomEvent("keydown", engineState)),
              Most.tap((function ($$event) {
                      return _execViewKeyboardEventHandle(/* KeyPress_SceneView */21, /* KeyPress_GameView */11, $$event);
                    }), _fromKeyboardDomEvent("keypress", engineState))
            ], InitEventJobUtils$WonderEditor.DomEvent[/* fromPCDragDomEventArr */4](/* tuple */[
                  _setEventTarget,
                  _convertDomEventToMouseEvent,
                  _mapMouseEventToView,
                  _execMouseDragStartEventHandle,
                  _execMouseDragOverEventHandle,
                  _execMouseDragDropEventHandle
                ], engineState));
}

var DomEvent = /* module */[
  /* _fromKeyboardDomEvent */_fromKeyboardDomEvent,
  /* _preventContextMenuEvent */_preventContextMenuEvent,
  /* _execMouseEventHandle */_execMouseEventHandle,
  /* _execMouseMoveEventHandle */_execMouseMoveEventHandle,
  /* _execMouseDragOverEventHandle */_execMouseDragOverEventHandle,
  /* _execMouseDragStartEventHandle */_execMouseDragStartEventHandle,
  /* _execMouseDragDropEventHandle */_execMouseDragDropEventHandle,
  /* _execKeyboardEventHandle */_execKeyboardEventHandle,
  /* _setEventTarget */_setEventTarget,
  /* _mapMouseEventToView */_mapMouseEventToView,
  /* _convertDomEventToMouseEvent */_convertDomEventToMouseEvent,
  /* _mapAndExecMouseEventHandle */_mapAndExecMouseEventHandle,
  /* _execViewKeyboardEventHandle */_execViewKeyboardEventHandle,
  /* fromPCDomEventArr */fromPCDomEventArr
];

function initEventForEditorJob(param, engineState) {
  var partial_arg = InitEventJobUtils$WonderEditor.DomEvent[/* fromDomEvent */3];
  var partial_arg$1 = function (param, param$1) {
    return partial_arg(fromPCDomEventArr, param, param$1);
  };
  return InitEventJobUtils$WonderEditor.initJob(/* tuple */[
              (function (param, param$1) {
                  return InitEventJobUtils$WonderEditor.fromDomEventAndHandleError(partial_arg$1, param, param$1);
                }),
              bindDomEventToTriggerPointEvent
            ], engineState);
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
