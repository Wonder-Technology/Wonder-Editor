

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as EventTool$WonderEditor from "./EventTool.js";
import * as ViewToolEngine$WonderEditor from "../../../tool/engine/ViewToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../../tool/engine/FakeGlToolEngine.js";
import * as ViewEngineService$WonderEditor from "../../../../src/service/state/engine/ViewEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as BrowserDetectToolEngine$WonderEditor from "../../../tool/engine/BrowserDetectToolEngine.js";

function buildMouseEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, param) {
  var pageX = $staropt$star !== undefined ? $staropt$star : 10;
  var pageY = $staropt$star$1 !== undefined ? $staropt$star$1 : 20;
  var button = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var movementX = $staropt$star$3 !== undefined ? $staropt$star$3 : 1;
  var movementY = $staropt$star$4 !== undefined ? $staropt$star$4 : 2;
  var detail = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : undefined;
  var wheelDelta = $staropt$star$6 !== undefined ? Caml_option.valFromOption($staropt$star$6) : undefined;
  var preventDefaultFunc = $staropt$star$7 !== undefined ? $staropt$star$7 : (function (param) {
        return /* () */0;
      });
  var stopPropagationFunc = $staropt$star$8 !== undefined ? $staropt$star$8 : (function (param) {
        return /* () */0;
      });
  var target = $staropt$star$9 !== undefined ? Caml_option.valFromOption($staropt$star$9) : ({
        tagName: "CANVAS"
      });
  return {
          pageX: pageX,
          pageY: pageY,
          button: button,
          movementX: movementX,
          movementY: movementY,
          detail: detail,
          wheelDelta: wheelDelta,
          preventDefault: preventDefaultFunc,
          stopPropagation: stopPropagationFunc,
          target: target
        };
}

function setPointerLocked (){
 document.pointerLockElement = {};
  };

function setNotPointerLocked (){
 document.pointerLockElement = undefined;
  };

function prepareWithState(sandbox, engineState, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var offsetLeft = $staropt$star !== undefined ? $staropt$star : 1;
  var offsetTop = $staropt$star$1 !== undefined ? $staropt$star$1 : 2;
  var offsetParent = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var setBrowserFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : BrowserDetectToolEngine$WonderEditor.setChrome;
  var canvasDom = EventTool$WonderEditor.buildFakeCanvas(/* tuple */[
        offsetLeft,
        offsetTop,
        offsetParent
      ]);
  var engineState$1 = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), ViewToolEngine$WonderEditor.setCanvas(canvasDom, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
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
  buildMouseEvent ,
  setPointerLocked ,
  setNotPointerLocked ,
  prepareWithState ,
  prepareForPointerLock ,
  
}
/* Sinon Not a pure module */
