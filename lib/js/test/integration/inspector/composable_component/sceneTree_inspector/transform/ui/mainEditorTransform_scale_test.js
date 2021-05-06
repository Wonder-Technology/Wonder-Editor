'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TransformUtils$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js");
var MainEditorTransformTool$WonderEditor = require("../tool/MainEditorTransformTool.js");
var MainEditorTransformTestTool$WonderEditor = require("../tool/MainEditorTransformTestTool.js");

Wonder_jest.describe("MainEditorTransform scale", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return MainEditorTransformTestTool$WonderEditor.transformBaseTest(sandbox, "test change scale value", /* tuple */[
                    1,
                    TransformUtils$WonderEditor.getTransformScaleData
                  ], /* tuple */[
                    MainEditorTransformTool$WonderEditor.changeScaleX,
                    MainEditorTransformTool$WonderEditor.changeScaleY,
                    MainEditorTransformTool$WonderEditor.changeScaleZ
                  ]);
      }));

/*  Not a pure module */
