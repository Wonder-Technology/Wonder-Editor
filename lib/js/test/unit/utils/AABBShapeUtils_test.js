'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Matrix4Service$Wonderjs = require("wonder.js/lib/js/src/service/atom/Matrix4Service.js");
var AABBShapeUtils$WonderEditor = require("../../../src/core/utils/engine/job/init/initPickingJob/AABBShapeUtils.js");

Wonder_jest.describe("AABBShapeUtils", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("setFromAllPointsAndLocalToWolrdMatrices", (function (param) {
                      return Wonder_jest.test("build aabb of all points", (function (param) {
                                    var aabb = AABBShapeUtils$WonderEditor.setFromAllPointsAndLocalToWolrdMatrices(/* array */[
                                          /* tuple */[
                                            new Float32Array(/* array */[
                                                  1,
                                                  1,
                                                  1
                                                ]),
                                            Matrix4Service$Wonderjs.fromTranslation(/* tuple */[
                                                  2,
                                                  0,
                                                  0
                                                ], Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0))
                                          ],
                                          /* tuple */[
                                            new Float32Array(/* array */[
                                                  -1,
                                                  1,
                                                  1
                                                ]),
                                            Matrix4Service$Wonderjs.fromTranslation(/* tuple */[
                                                  -2,
                                                  0,
                                                  0
                                                ], Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0))
                                          ]
                                        ]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](aabb), /* record */[
                                                /* min : tuple */[
                                                  -3,
                                                  1,
                                                  1
                                                ],
                                                /* max : tuple */[
                                                  3,
                                                  1,
                                                  1
                                                ]
                                              ]);
                                  }));
                    }));
      }));

/*  Not a pure module */
