

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as EventTool$WonderEditor from "../tool/EventTool.js";
import * as CameraToolEngine$WonderEditor from "../../../tool/engine/CameraToolEngine.js";
import * as InitPickingJobTool$WonderEditor from "../tool/InitPickingJobTool.js";
import * as SceneEngineService$WonderEditor from "../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as PointLightToolEngine$WonderEditor from "../../../tool/engine/PointLightToolEngine.js";
import * as DirectionLightToolEngine$WonderEditor from "../../../tool/engine/DirectionLightToolEngine.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js";

describe("test pick imgui gameObject", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _test = function (imguiGameObject, $staropt$star, $staropt$star$1, $staropt$star$2, _) {
          var imguiPos = $staropt$star !== undefined ? $staropt$star : /* tuple */[
              2,
              1,
              -1
            ];
          var pageX = $staropt$star$1 !== undefined ? $staropt$star$1 : 350;
          var pageY = $staropt$star$2 !== undefined ? $staropt$star$2 : 50;
          StateEditorService$WonderEditor.getState(/* () */0);
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var engineState$1 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(imguiGameObject, imguiPos, engineState);
          SceneEngineService$WonderEditor.addSceneChild(imguiGameObject, engineState$1);
          InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, pageX, pageY, /* () */0);
          return InitPickingJobTool$WonderEditor.pickOne(imguiGameObject);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                InitPickingJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 10, 20, /* tuple */[
                      0,
                      1,
                      3
                    ], /* tuple */[
                      0,
                      0,
                      0
                    ], /* tuple */[
                      45,
                      0,
                      0
                    ], /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return EventTool$WonderEditor.restore(/* () */0);
              }));
        Wonder_jest.test("test pick direction light gameObject", (function () {
                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                var match = DirectionLightToolEngine$WonderEditor.createGameObject(engineState);
                return _test(match[1], undefined, undefined, undefined, /* () */0);
              }));
        Wonder_jest.test("test pick point light gameObject", (function () {
                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                var match = PointLightToolEngine$WonderEditor.createGameObject(engineState);
                return _test(match[1], undefined, undefined, undefined, /* () */0);
              }));
        Wonder_jest.test("test pick camera gameObject", (function () {
                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                var match = CameraToolEngine$WonderEditor.createCameraGameObject(engineState);
                return _test(match[1], undefined, undefined, undefined, /* () */0);
              }));
        return Wonder_jest.test("if imgui gameObject and other gameObject is in the same pos, pick the imgui one", (function () {
                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                      var match = CameraToolEngine$WonderEditor.createCameraGameObject(engineState);
                      return _test(match[1], /* tuple */[
                                  0,
                                  0,
                                  0
                                ], 260, 120, /* () */0);
                    }));
      }));

export {
  
}
/*  Not a pure module */
