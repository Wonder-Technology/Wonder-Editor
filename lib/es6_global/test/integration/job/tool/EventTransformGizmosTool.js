

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as EventTool$WonderEditor from "./EventTool.js";
import * as MouseEventTool$WonderEditor from "./MouseEventTool.js";

function triggerMouseDown($staropt$star, _, pageX, pageY, _$1) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  var target = EventTool$WonderEditor.buildCanvasTarget(/* () */0);
  return EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(target), /* () */0));
}

function triggerMouseMove($staropt$star, _, pageX, pageY, _$1) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  var target = EventTool$WonderEditor.buildCanvasTarget(/* () */0);
  return EventTool$WonderEditor.triggerDomEvent("mousemove", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(target), /* () */0));
}

function triggerMouseUp($staropt$star, $staropt$star$1, $staropt$star$2, _, _$1) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  var pageX = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
  var pageY = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var target = EventTool$WonderEditor.buildCanvasTarget(/* () */0);
  return EventTool$WonderEditor.triggerDomEvent("mouseup", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(target), /* () */0));
}

export {
  triggerMouseDown ,
  triggerMouseMove ,
  triggerMouseUp ,
  
}
/* EventTool-WonderEditor Not a pure module */
