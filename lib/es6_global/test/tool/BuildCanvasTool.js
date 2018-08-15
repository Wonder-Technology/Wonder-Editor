

import * as Sinon from "../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";

function _buildFakeContext(sandbox) {
  return {
          drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
          fillStyle: 0,
          fillRect: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
          translate: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
        };
}

function getFakeCanvasDom(id, sandbox) {
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
          getContext: (function () {
              return _buildFakeContext(sandbox);
            }),
          toDataURL: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
        };
}

function buildFakeCanvas(sandbox) {
  var canvasDom = getFakeCanvasDom("a", sandbox);
  var createElementStub = document.createElement;
  Sinon.returns(canvasDom, Sinon.withOneArg("canvas", createElementStub));
  return /* () */0;
}

export {
  _buildFakeContext ,
  getFakeCanvasDom ,
  buildFakeCanvas ,
  
}
/* Sinon Not a pure module */
