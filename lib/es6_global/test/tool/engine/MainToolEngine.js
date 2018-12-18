

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as StateDataMain$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/state/IsDebugMainService.js";

function createGetContextStub(fakeGl, sandbox) {
  return Sinon.returns(fakeGl, Curry._1(Sinon.createEmptyStub, sandbox[0]));
}

function buildFakeGl(sandbox) {
  return {
          VERTEX_SHADER: 0,
          FRAGMENT_SHADER: 1,
          HIGH_FLOAT: 2,
          MEDIUM_FLOAT: 3,
          viewport: Curry._1(Sinon.createEmptyStub, sandbox[0]),
          getShaderPrecisionFormat: Sinon.returns({
                precision: 1
              }, Curry._1(Sinon.createEmptyStub, sandbox[0])),
          getExtension: Sinon.returns(0, Curry._1(Sinon.createEmptyStub, sandbox[0]))
        };
}

function buildFakeCanvas(id, gl, sandbox) {
  return {
          id: id,
          nodeType: 1,
          style: {
            left: "",
            top: "",
            width: "",
            height: "",
            position: "static"
          },
          width: 0,
          height: 0,
          getContext: createGetContextStub(gl, sandbox)
        };
}

function buildFakeDomForPassCanvasId($staropt$star, sandbox) {
  var id = $staropt$star !== undefined ? $staropt$star : "webgl";
  var canvasDom = buildFakeCanvas(id, buildFakeGl(sandbox), sandbox);
  var querySelectorAll = Curry._3(Sinon.createMethodStub, sandbox[0], document, "querySelectorAll");
  Sinon.returns(/* array */[], querySelectorAll);
  return Sinon.returns(/* array */[canvasDom], Sinon.withOneArg("#" + (String(id) + ""), querySelectorAll));
}

function buildFakeDomForNotPassCanvasId(sandbox) {
  var fakeGl = buildFakeGl(sandbox);
  var canvasDom = buildFakeCanvas("a", fakeGl, sandbox);
  var div = {
    innerHTML: "",
    firstChild: canvasDom
  };
  var body = {
    prepend: Curry._1(Sinon.createEmptyStub, sandbox[0]),
    style: {
      cssText: ""
    }
  };
  Sinon.returns(div, Sinon.withOneArg("div", Curry._3(Sinon.createMethodStub, sandbox[0], document, "createElement")));
  Sinon.returns(/* :: */[
        body,
        /* [] */0
      ], Sinon.withOneArg("body", Curry._3(Sinon.createMethodStub, sandbox[0], document, "querySelectorAll")));
  return /* tuple */[
          canvasDom,
          fakeGl,
          div,
          body
        ];
}

function buildMainConfig($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var bufferConfig = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var gpuConfig = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var canvasId = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var isDebug = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : undefined;
  var contextConfig = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : undefined;
  return {
          bufferConfig: bufferConfig,
          gpuConfig: gpuConfig,
          canvasId: canvasId,
          isDebug: isDebug,
          contextConfig: contextConfig
        };
}

function getIsDebug(param) {
  return IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData);
}

export {
  createGetContextStub ,
  buildFakeGl ,
  buildFakeCanvas ,
  buildFakeDomForPassCanvasId ,
  buildFakeDomForNotPassCanvasId ,
  buildMainConfig ,
  getIsDebug ,
  
}
/* Sinon Not a pure module */
