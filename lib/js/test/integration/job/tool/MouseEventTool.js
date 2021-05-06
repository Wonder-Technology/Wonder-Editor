'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var EventTool$WonderEditor = require("./EventTool.js");
var ViewToolEngine$WonderEditor = require("../../../tool/engine/ViewToolEngine.js");
var FakeGlToolEngine$WonderEditor = require("../../../tool/engine/FakeGlToolEngine.js");
var ViewEngineService$WonderEditor = require("../../../../src/service/state/engine/ViewEngineService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var BrowserDetectToolEngine$WonderEditor = require("../../../tool/engine/BrowserDetectToolEngine.js");

function buildMouseDomEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, param) {
  var pageX = $staropt$star !== undefined ? $staropt$star : 10;
  var pageY = $staropt$star$1 !== undefined ? $staropt$star$1 : 20;
  var which = $staropt$star$2 !== undefined ? $staropt$star$2 : 1;
  var movementX = $staropt$star$3 !== undefined ? $staropt$star$3 : 1;
  var movementY = $staropt$star$4 !== undefined ? $staropt$star$4 : 2;
  var detail = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : undefined;
  var wheelDelta = $staropt$star$6 !== undefined ? Caml_option.valFromOption($staropt$star$6) : undefined;
  var preventDefaultFunc = $staropt$star$7 !== undefined ? Caml_option.valFromOption($staropt$star$7) : (function () {
        return /* () */0;
      });
  var stopPropagationFunc = $staropt$star$8 !== undefined ? Caml_option.valFromOption($staropt$star$8) : (function () {
        return /* () */0;
      });
  var target = $staropt$star$9 !== undefined ? Caml_option.valFromOption($staropt$star$9) : ({
        tagName: "CANVAS"
      });
  return {
          pageX: pageX,
          pageY: pageY,
          which: which,
          movementX: movementX,
          movementY: movementY,
          webkitMovementX: movementX,
          mozMovementX: movementX,
          webkitMovementY: movementY,
          mozMovementY: movementY,
          detail: detail,
          wheelDelta: wheelDelta,
          preventDefault: preventDefaultFunc,
          stopPropagation: stopPropagationFunc,
          target: target
        };
}

function buildMouseEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var eventName = $staropt$star !== undefined ? $staropt$star : /* Click */1;
  var $$location = $staropt$star$1 !== undefined ? $staropt$star$1 : /* tuple */[
      0,
      0
    ];
  var locationInView = $staropt$star$2 !== undefined ? $staropt$star$2 : /* tuple */[
      0,
      0
    ];
  var button = $staropt$star$3 !== undefined ? $staropt$star$3 : /* Left */1;
  var wheel = $staropt$star$4 !== undefined ? $staropt$star$4 : 0;
  var movementDelta = $staropt$star$5 !== undefined ? $staropt$star$5 : /* tuple */[
      1,
      2
    ];
  var $$event = $staropt$star$6 !== undefined ? Caml_option.valFromOption($staropt$star$6) : buildMouseDomEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return /* record */[
          /* name */eventName,
          /* location */$$location,
          /* locationInView */locationInView,
          /* button */button,
          /* wheel */wheel,
          /* movementDelta */movementDelta,
          /* event */$$event
        ];
}

function setPointerLocked (param){
 document.pointerLockElement = {};
  };

function setNotPointerLocked (param){
 document.pointerLockElement = undefined;
  };

function prepareWithState(sandbox, engineState, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var canvasWidth = $staropt$star !== undefined ? $staropt$star : 0;
  var canvasHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
  var offsetLeft = $staropt$star$2 !== undefined ? $staropt$star$2 : 1;
  var offsetTop = $staropt$star$3 !== undefined ? $staropt$star$3 : 2;
  var offsetParent = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : undefined;
  var setBrowserFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : BrowserDetectToolEngine$WonderEditor.setChrome;
  var setEngineFunc = $staropt$star$6 !== undefined ? $staropt$star$6 : StateEngineService$WonderEditor.setState;
  var canvasDom = EventTool$WonderEditor.buildFakeCanvasWithSize(canvasWidth, canvasHeight, /* tuple */[
        offsetLeft,
        offsetTop,
        offsetParent
      ]);
  var engineState$1 = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), ViewToolEngine$WonderEditor.setCanvas(canvasDom, engineState));
  Curry._1(setEngineFunc, engineState$1);
  return Curry._1(setBrowserFunc, /* () */0);
}

function prepareForPointerLock(sandbox, $staropt$star, param) {
  var unsafeGetStateFunc = $staropt$star !== undefined ? $staropt$star : StateEngineService$WonderEditor.unsafeGetState;
  var canvas = ViewEngineService$WonderEditor.unsafeGetCanvas(Curry._1(unsafeGetStateFunc, /* () */0));
  var requestPointerLockStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  canvas.requestPointerLock = requestPointerLockStub;
  return requestPointerLockStub;
}

exports.buildMouseDomEvent = buildMouseDomEvent;
exports.buildMouseEvent = buildMouseEvent;
exports.setPointerLocked = setPointerLocked;
exports.setNotPointerLocked = setNotPointerLocked;
exports.prepareWithState = prepareWithState;
exports.prepareForPointerLock = prepareForPointerLock;
/* Sinon Not a pure module */
