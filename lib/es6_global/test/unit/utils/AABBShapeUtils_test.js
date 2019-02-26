

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Matrix4Service$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as AABBShapeUtils$WonderEditor from "../../../src/core/utils/engine/job/init/initPickingJob/AABBShapeUtils.js";

describe("AABBShapeUtils", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("setFromAllPointsAndLocalToWolrdMatrices", (function () {
                return Wonder_jest.test("build aabb of all points", (function () {
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
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](aabb), /* record */[
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
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
