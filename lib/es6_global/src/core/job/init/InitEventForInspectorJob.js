

import * as LogUtils$WonderEditor from "../../utils/console/LogUtils.js";
import * as ResizeUtils$WonderEditor from "../../utils/ui/ResizeUtils.js";
import * as ConsoleUtils$WonderEditor from "../../utils/ui/ConsoleUtils.js";
import * as InitEventJobUtils$WonderEditor from "./utils/InitEventJobUtils.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as BrowserEngineService$WonderEditor from "../../../service/state/engine/BrowserEngineService.js";
import * as TargetEventEditorService$WonderEditor from "../../../service/state/editor/event/TargetEventEditorService.js";
import * as InspectorEventEditorService$WonderEditor from "../../../service/state/editor/event/InspectorEventEditorService.js";
import * as StateInspectorEngineService$WonderEditor from "../../../service/state/inspectorEngine/StateInspectorEngineService.js";
import * as HandleMouseEventEngineService$WonderEditor from "../../../service/state/engine/event/HandleMouseEventEngineService.js";

function _isTriggerInspectorEvent(param) {
  return TargetEventEditorService$WonderEditor.getInspectorEventTarget(StateEditorService$WonderEditor.getState(/* () */0)) === /* Inspector */0;
}

function bindDomEventToTriggerPointEvent(editorState, inspectorEngineState) {
  var match = BrowserEngineService$WonderEditor.isPC(inspectorEngineState);
  if (match) {
    return InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                /* MouseDragDrop */8,
                InspectorEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0),
                /* PointDragDrop */7
              ], _isTriggerInspectorEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                    /* MouseDragOver */7,
                    InspectorEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0),
                    /* PointDragOver */6
                  ], _isTriggerInspectorEvent, InitEventJobUtils$WonderEditor.PointEvent[/* bindMouseEventToTriggerPointEvent */2](/* tuple */[
                        /* MouseDragStart */6,
                        InspectorEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0),
                        /* PointDragStart */5
                      ], _isTriggerInspectorEvent, inspectorEngineState)));
  } else {
    ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("unknown browser", "", "", ""), editorState);
    return inspectorEngineState;
  }
}

var PointEvent = /* module */[/* bindDomEventToTriggerPointEvent */bindDomEventToTriggerPointEvent];

function _execMouseEventHandle(mouseEvent) {
  StateInspectorEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function _execMouseDragOverEventHandle(mouseEvent) {
  StateInspectorEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setLastXYByLocation(mouseEvent, HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0))));
  return /* () */0;
}

function _execMouseDragStartEventHandle(mouseEvent) {
  StateInspectorEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setLastXY(undefined, undefined, HandleMouseEventEngineService$WonderEditor.setIsDrag(true, HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)))));
  return /* () */0;
}

function _execMouseDragDropEventHandle(mouseEvent) {
  StateInspectorEngineService$WonderEditor.setState(HandleMouseEventEngineService$WonderEditor.setIsDrag(false, HandleMouseEventEngineService$WonderEditor.execEventHandle(mouseEvent, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0))));
  return /* () */0;
}

function _getInspectorCanvasRect(param) {
  var match = ResizeUtils$WonderEditor.getInspectorCanvasSize(/* () */0);
  return /* tuple */[
          0,
          0,
          match[0],
          match[1]
        ];
}

function _setEventTarget(mouseEvent) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = InitEventJobUtils$WonderEditor.DomEvent[/* isTargetNotCanvas */1](mouseEvent[/* event */6]);
  var eventTarget;
  if (match) {
    eventTarget = /* Other */1;
  } else {
    var match$1 = InitEventJobUtils$WonderEditor.DomEvent[/* isMouseInView */0](mouseEvent[/* locationInView */2], _getInspectorCanvasRect(/* () */0));
    eventTarget = match$1 ? /* Inspector */0 : /* Other */1;
  }
  StateEditorService$WonderEditor.setState(TargetEventEditorService$WonderEditor.setInspectorEventTarget(eventTarget, editorState));
  return mouseEvent;
}

function _convertDomEventToMouseEvent(eventName, $$event) {
  var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
  return HandleMouseEventEngineService$WonderEditor.convertMouseDomEventToMouseEvent(eventName, $$event, inspectorEngineState);
}

function _mapMouseEventToView(mouseEvent) {
  return mouseEvent;
}

function fromPCDomEventArr(inspectorEngineState) {
  return InitEventJobUtils$WonderEditor.DomEvent[/* fromPCDragDomEventArr */4](/* tuple */[
              _setEventTarget,
              _convertDomEventToMouseEvent,
              _mapMouseEventToView,
              _execMouseDragStartEventHandle,
              _execMouseDragOverEventHandle,
              _execMouseDragDropEventHandle
            ], inspectorEngineState);
}

var DomEvent = /* module */[
  /* _execMouseEventHandle */_execMouseEventHandle,
  /* _execMouseDragOverEventHandle */_execMouseDragOverEventHandle,
  /* _execMouseDragStartEventHandle */_execMouseDragStartEventHandle,
  /* _execMouseDragDropEventHandle */_execMouseDragDropEventHandle,
  /* _getInspectorCanvasRect */_getInspectorCanvasRect,
  /* _setEventTarget */_setEventTarget,
  /* _convertDomEventToMouseEvent */_convertDomEventToMouseEvent,
  /* _mapMouseEventToView */_mapMouseEventToView,
  /* fromPCDomEventArr */fromPCDomEventArr
];

function initJob(param, inspectorEngineState) {
  var partial_arg = InitEventJobUtils$WonderEditor.DomEvent[/* fromDomEvent */3];
  var partial_arg$1 = function (param, param$1) {
    return partial_arg(fromPCDomEventArr, param, param$1);
  };
  return InitEventJobUtils$WonderEditor.initJob(/* tuple */[
              (function (param, param$1) {
                  return InitEventJobUtils$WonderEditor.fromDomEventAndHandleError(partial_arg$1, param, param$1);
                }),
              bindDomEventToTriggerPointEvent
            ], inspectorEngineState);
}

export {
  _isTriggerInspectorEvent ,
  PointEvent ,
  DomEvent ,
  initJob ,
  
}
/* LogUtils-WonderEditor Not a pure module */
