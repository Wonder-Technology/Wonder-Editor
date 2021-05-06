'use strict';

var ResizeUtils$WonderEditor = require("../../../../../src/core/utils/ui/ResizeUtils.js");

function resizeMainCanvasAndInspectorCanvas(param) {
  ResizeUtils$WonderEditor.resizeMainCanvasScreen(/* () */0);
  return ResizeUtils$WonderEditor.resizeInspectorCanvasScreen(/* () */0);
}

var resizeMainCanvasScreen = ResizeUtils$WonderEditor.resizeMainCanvasScreen;

var resizeInspectorCanvasScreen = ResizeUtils$WonderEditor.resizeInspectorCanvasScreen;

exports.resizeMainCanvasScreen = resizeMainCanvasScreen;
exports.resizeInspectorCanvasScreen = resizeInspectorCanvasScreen;
exports.resizeMainCanvasAndInspectorCanvas = resizeMainCanvasAndInspectorCanvas;
/* ResizeUtils-WonderEditor Not a pure module */
