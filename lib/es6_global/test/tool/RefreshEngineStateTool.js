

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as FakeGlToolEngine$WonderEditor from "./engine/FakeGlToolEngine.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "./MainEditorSceneTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "./engine/NoWorkerJobConfigToolEngine.js";

function testRefreshEngineState(sandbox, execFunc) {
  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n            {\n                \"name\": \"clear_buffer\"\n            }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
  MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
  var clear = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(clear), undefined, undefined, undefined, undefined, /* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  Curry._1(execFunc, /* () */0);
  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](clear));
}

export {
  testRefreshEngineState ,
  
}
/* Sinon Not a pure module */
