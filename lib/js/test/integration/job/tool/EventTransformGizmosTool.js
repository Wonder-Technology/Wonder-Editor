'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var EventTool$WonderEditor = require("./EventTool.js");
var MouseEventTool$WonderEditor = require("./MouseEventTool.js");

function triggerMouseDown($staropt$star, sandbox, pageX, pageY, param) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  var target = EventTool$WonderEditor.buildCanvasTarget(/* () */0);
  return EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(target), /* () */0));
}

function triggerMouseMove($staropt$star, sandbox, pageX, pageY, param) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  var target = EventTool$WonderEditor.buildCanvasTarget(/* () */0);
  return EventTool$WonderEditor.triggerDomEvent("mousemove", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(target), /* () */0));
}

function triggerFirstMouseDragOverEvent($staropt$star, sandbox, pageX, pageY, param) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  var target = EventTool$WonderEditor.buildCanvasTarget(/* () */0);
  return EventTool$WonderEditor.triggerFirstMouseDragOverEvent(MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(target), /* () */0));
}

function triggerMouseUp($staropt$star, $staropt$star$1, $staropt$star$2, sandbox, param) {
  var eventButton = $staropt$star !== undefined ? $staropt$star : 1;
  var pageX = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
  var pageY = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var target = EventTool$WonderEditor.buildCanvasTarget(/* () */0);
  return EventTool$WonderEditor.triggerDomEvent("mouseup", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(target), /* () */0));
}

exports.triggerMouseDown = triggerMouseDown;
exports.triggerMouseMove = triggerMouseMove;
exports.triggerFirstMouseDragOverEvent = triggerFirstMouseDragOverEvent;
exports.triggerMouseUp = triggerMouseUp;
/* EventTool-WonderEditor Not a pure module */
