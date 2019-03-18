

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as EventTool$WonderEditor from "./EventTool.js";
import * as ViewToolEngine$WonderEditor from "../../../tool/engine/ViewToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../../tool/engine/FakeGlToolEngine.js";
import * as ViewEngineService$WonderEditor from "../../../../src/service/state/engine/ViewEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as BrowserDetectToolEngine$WonderEditor from "../../../tool/engine/BrowserDetectToolEngine.js";

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

function prepareWithState(sandbox, engineState, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var canvasWidth = $staropt$star !== undefined ? $staropt$star : 0;
  var canvasHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
  var offsetLeft = $staropt$star$2 !== undefined ? $staropt$star$2 : 1;
  var offsetTop = $staropt$star$3 !== undefined ? $staropt$star$3 : 2;
  var offsetParent = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : undefined;
  var setBrowserFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : BrowserDetectToolEngine$WonderEditor.setChrome;
  var canvasDom = EventTool$WonderEditor.buildFakeCanvasWithSize(canvasWidth, canvasHeight, /* tuple */[
        offsetLeft,
        offsetTop,
        offsetParent
      ]);
  var engineState$1 = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), ViewToolEngine$WonderEditor.setCanvas(canvasDom, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  StateEngineService$WonderEditor.setState(engineState$1);
  return Curry._1(setBrowserFunc, /* () */0);
}

function prepareForPointerLock(sandbox) {
  var canvas = ViewEngineService$WonderEditor.unsafeGetCanvas(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var requestPointerLockStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  canvas.requestPointerLock = requestPointerLockStub;
  return requestPointerLockStub;
}

export {
  buildMouseDomEvent ,
  buildMouseEvent ,
  setPointerLocked ,
  setNotPointerLocked ,
  prepareWithState ,
  prepareForPointerLock ,
  
}
/* Sinon Not a pure module */
