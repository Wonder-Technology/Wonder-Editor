

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../../tool/MainEditorSceneTreeTool.js";

describe("mainEditor sceneTree specific function", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test getDragedSceneGraphData function", (function () {
                describe("should move draged tree node to be target tree node's child", (function () {
                        beforeEach((function () {
                                return TestTool$WonderEditor.closeContractCheck(/* () */0);
                              }));
                        afterEach((function () {
                                return TestTool$WonderEditor.openContractCheck(/* () */0);
                              }));
                        Wonder_jest.test("test haven't children case", (function () {
                                var dragedSceneGraph = MainEditorSceneTreeTool$WonderEditor.getDragedSceneGraphData(2, 1, MainEditorSceneTreeTool$WonderEditor.getSimpleSceneTree(/* () */0));
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](dragedSceneGraph), /* array */[/* record */[
                                              /* name */"root",
                                              /* uid */0,
                                              /* isShowChildren */true,
                                              /* children : array */[
                                                /* record */[
                                                  /* name */"gameObject2",
                                                  /* uid */2,
                                                  /* isShowChildren */true,
                                                  /* children : array */[/* record */[
                                                      /* name */"gameObject1",
                                                      /* uid */1,
                                                      /* isShowChildren */true,
                                                      /* children : array */[]
                                                    ]]
                                                ],
                                                /* record */[
                                                  /* name */"gameObject3",
                                                  /* uid */3,
                                                  /* isShowChildren */true,
                                                  /* children : array */[]
                                                ]
                                              ]
                                            ]]);
                              }));
                        Wonder_jest.test("shouldn't change origin sceneGraphData, get new array data", (function () {
                                var sceneGraphData = MainEditorSceneTreeTool$WonderEditor.getSimpleSceneTree(/* () */0);
                                MainEditorSceneTreeTool$WonderEditor.getDragedSceneGraphData(1, 2, sceneGraphData);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](sceneGraphData), MainEditorSceneTreeTool$WonderEditor.getSimpleSceneTree(/* () */0));
                              }));
                        describe("test has children case", (function () {
                                describe("has first layer children", (function () {
                                        Wonder_jest.test("add into first layer parent", (function () {
                                                var dragedSceneGraph = MainEditorSceneTreeTool$WonderEditor.getDragedSceneGraphData(3, 2, MainEditorSceneTreeTool$WonderEditor.getTwoLayerSceneTree(/* () */0));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](dragedSceneGraph), /* array */[/* record */[
                                                              /* name */"root",
                                                              /* uid */0,
                                                              /* isShowChildren */true,
                                                              /* children : array */[
                                                                /* record */[
                                                                  /* name */"gameObject1",
                                                                  /* uid */1,
                                                                  /* isShowChildren */true,
                                                                  /* children : array */[]
                                                                ],
                                                                /* record */[
                                                                  /* name */"gameObject3",
                                                                  /* uid */3,
                                                                  /* isShowChildren */true,
                                                                  /* children : array */[
                                                                    /* record */[
                                                                      /* name */"gameObject4",
                                                                      /* uid */4,
                                                                      /* isShowChildren */true,
                                                                      /* children : array */[]
                                                                    ],
                                                                    /* record */[
                                                                      /* name */"gameObject5",
                                                                      /* uid */5,
                                                                      /* isShowChildren */true,
                                                                      /* children : array */[]
                                                                    ],
                                                                    /* record */[
                                                                      /* name */"gameObject2",
                                                                      /* uid */2,
                                                                      /* isShowChildren */true,
                                                                      /* children : array */[]
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]]);
                                              }));
                                        Wonder_jest.test("add into first layer children", (function () {
                                                var dragedSceneGraph = MainEditorSceneTreeTool$WonderEditor.getDragedSceneGraphData(4, 2, MainEditorSceneTreeTool$WonderEditor.getTwoLayerSceneTree(/* () */0));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](dragedSceneGraph), /* array */[/* record */[
                                                              /* name */"root",
                                                              /* uid */0,
                                                              /* isShowChildren */true,
                                                              /* children : array */[
                                                                /* record */[
                                                                  /* name */"gameObject1",
                                                                  /* uid */1,
                                                                  /* isShowChildren */true,
                                                                  /* children : array */[]
                                                                ],
                                                                /* record */[
                                                                  /* name */"gameObject3",
                                                                  /* uid */3,
                                                                  /* isShowChildren */true,
                                                                  /* children : array */[
                                                                    /* record */[
                                                                      /* name */"gameObject4",
                                                                      /* uid */4,
                                                                      /* isShowChildren */true,
                                                                      /* children : array */[/* record */[
                                                                          /* name */"gameObject2",
                                                                          /* uid */2,
                                                                          /* isShowChildren */true,
                                                                          /* children : array */[]
                                                                        ]]
                                                                    ],
                                                                    /* record */[
                                                                      /* name */"gameObject5",
                                                                      /* uid */5,
                                                                      /* isShowChildren */true,
                                                                      /* children : array */[]
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]]);
                                              }));
                                        return Wonder_jest.test("shouldn't change origin sceneGraphData, get new array data", (function () {
                                                      var sceneGraphData = MainEditorSceneTreeTool$WonderEditor.getTwoLayerSceneTree(/* () */0);
                                                      MainEditorSceneTreeTool$WonderEditor.getDragedSceneGraphData(1, 2, sceneGraphData);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](sceneGraphData), MainEditorSceneTreeTool$WonderEditor.getTwoLayerSceneTree(/* () */0));
                                                    }));
                                      }));
                                describe("has two layer children", (function () {
                                        return Wonder_jest.test("add into second layer children", (function () {
                                                      var dragedSceneGraph = MainEditorSceneTreeTool$WonderEditor.getDragedSceneGraphData(6, 2, MainEditorSceneTreeTool$WonderEditor.getThreeLayerSceneTree(/* () */0));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](dragedSceneGraph), /* array */[/* record */[
                                                                    /* name */"root",
                                                                    /* uid */0,
                                                                    /* isShowChildren */true,
                                                                    /* children : array */[
                                                                      /* record */[
                                                                        /* name */"gameObject1",
                                                                        /* uid */1,
                                                                        /* isShowChildren */true,
                                                                        /* children : array */[]
                                                                      ],
                                                                      /* record */[
                                                                        /* name */"gameObject3",
                                                                        /* uid */3,
                                                                        /* isShowChildren */true,
                                                                        /* children : array */[
                                                                          /* record */[
                                                                            /* name */"gameObject4",
                                                                            /* uid */4,
                                                                            /* isShowChildren */true,
                                                                            /* children : array */[]
                                                                          ],
                                                                          /* record */[
                                                                            /* name */"gameObject5",
                                                                            /* uid */5,
                                                                            /* isShowChildren */true,
                                                                            /* children : array */[/* record */[
                                                                                /* name */"gameObject6",
                                                                                /* uid */6,
                                                                                /* isShowChildren */true,
                                                                                /* children : array */[/* record */[
                                                                                    /* name */"gameObject2",
                                                                                    /* uid */2,
                                                                                    /* isShowChildren */true,
                                                                                    /* children : array */[]
                                                                                  ]]
                                                                              ]]
                                                                          ]
                                                                        ]
                                                                      ]
                                                                    ]
                                                                  ]]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("deal with specific case", (function () {
                        return Wonder_jest.test("test if drageId is can't find in array, should throw error", (function () {
                                      return Wonder_jest.Expect[/* toThrowMessageRe */21]((/expect dragedTreeNode should exist, but actual not/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                        return MainEditorSceneTreeTool$WonderEditor.getDragedSceneGraphData(1, 5, MainEditorSceneTreeTool$WonderEditor.getSimpleSceneTree(/* () */0));
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
