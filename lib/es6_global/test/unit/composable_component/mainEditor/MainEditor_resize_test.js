

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as AssetTool$WonderImgui from "../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/AssetTool.js";
import * as MainEditor$WonderEditor from "../../../../src/core/composable_component/mainEditor/ui/MainEditor.js";
import * as OptionService$WonderEditor from "../../../../src/service/primitive/OptionService.js";
import * as TestToolEngine$WonderEditor from "../../../tool/engine/TestToolEngine.js";
import * as BuildCanvasTool$WonderEditor from "../../../tool/BuildCanvasTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../../src/service/state/engine/DeviceManagerEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("test mainEditor resize", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var prepareImgui = function () {
          var prepareFontAsset = function (state) {
            var newrecord = Caml_array.caml_array_dup(state);
            var init = state[/* imguiRecord */42];
            newrecord[/* imguiRecord */42] = /* record */[
              /* ioData */init[/* ioData */0],
              /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
              /* wonderImguiIMGUIRecord */AssetTool$WonderImgui.prepareFontAsset(state[/* imguiRecord */42][/* wonderImguiIMGUIRecord */2])
            ];
            return newrecord;
          };
          StateLogicService$WonderEditor.setEditEngineState(prepareFontAsset(StateLogicService$WonderEditor.getEditEngineState(/* () */0)));
          StateLogicService$WonderEditor.setRunEngineState(prepareFontAsset(StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
          return TestToolEngine$WonderEditor.initEngineState(/* () */0);
        };
        var stubCanvasParentAndCanvas = function (sandbox) {
          var parentDom = {
            offsetWidth: 300,
            offsetHeight: 500
          };
          var editCanvasDom = BuildCanvasTool$WonderEditor.getFakeCanvasDom("a", sandbox);
          var runCanvasDom = BuildCanvasTool$WonderEditor.getFakeCanvasDom("a", sandbox);
          var getElementStub = Sinon.createMethodStubWithJsObjSandbox(sandbox, document, "getElementById");
          Sinon.returns(parentDom, Sinon.withOneArg("editCanvasParent", getElementStub));
          Sinon.returns(editCanvasDom, Sinon.withOneArg("editCanvas", getElementStub));
          Sinon.returns(runCanvasDom, Sinon.withOneArg("runCanvas", getElementStub));
          prepareImgui(/* () */0);
          return /* tuple */[
                  parentDom,
                  editCanvasDom,
                  runCanvasDom
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_imgui\"\n        }\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n      ]\n    }\n  ]\n        ", "\n        [\n          { \"name\": \"init_imgui\" }\n        ]\n        ", "\n        []\n        ", /* () */0), undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test resize should set canvas size and set viewport", (function () {
                Wonder_jest.test("test two canvas width and height should == these parent width and height", (function () {
                        var match = stubCanvasParentAndCanvas(sandbox);
                        var runCanvasDom = match[2];
                        var editCanvasDom = match[1];
                        var parentDom = match[0];
                        MainEditor$WonderEditor.Method[/* resizeCanvasAndViewPort */3](/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        editCanvasDom.width,
                                        editCanvasDom.height,
                                        runCanvasDom.width,
                                        runCanvasDom.height
                                      ]), /* tuple */[
                                    parentDom.offsetWidth,
                                    parentDom.offsetHeight,
                                    parentDom.offsetWidth,
                                    parentDom.offsetHeight
                                  ]);
                      }));
                return Wonder_jest.test("test two canvas viewport should == canvas parent width and height", (function () {
                              var match = stubCanvasParentAndCanvas(sandbox);
                              var parentDom = match[0];
                              MainEditor$WonderEditor.Method[/* resizeCanvasAndViewPort */3](/* () */0);
                              var match$1 = OptionService$WonderEditor.unsafeGet(DeviceManagerEngineService$WonderEditor.getViewport(StateLogicService$WonderEditor.getEditEngineState(/* () */0)));
                              var match$2 = OptionService$WonderEditor.unsafeGet(DeviceManagerEngineService$WonderEditor.getViewport(StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              match$1[2],
                                              match$1[3],
                                              match$2[2],
                                              match$2[3]
                                            ]), /* tuple */[
                                          parentDom.offsetWidth,
                                          parentDom.offsetHeight,
                                          parentDom.offsetWidth,
                                          parentDom.offsetHeight
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
