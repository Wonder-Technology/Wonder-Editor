'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Color$WonderEditor = require("../../src/core/external/Color.js");
var StateLogicService$WonderEditor = require("../../src/service/stateTuple/logic/StateLogicService.js");

function testOperateColorPickToChangeColor(sandbox, param) {
  var getColorFunc = param[2];
  var changeColorFunc = param[1];
  var getCurrentSceneTreeNodeComponentFunc = param[0];
  return Wonder_jest.describe("test change color should set current gameObject color", (function (param) {
                return Wonder_jest.describe("test logic", (function (param) {
                              return Wonder_jest.test("test change color should set into engine", (function (param) {
                                            var currentGameObjectComponent = Curry._1(getCurrentSceneTreeNodeComponentFunc, /* () */0);
                                            var newColor = {
                                              hex: "#7df1e8",
                                              rgb: {
                                                r: 125,
                                                g: 241,
                                                b: 232
                                              }
                                            };
                                            Curry._2(changeColorFunc, currentGameObjectComponent, newColor);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(getColorFunc, currentGameObjectComponent)))), newColor.hex);
                                          }));
                            }));
              }));
}

function buildColor1(param) {
  return {
          hex: "#7df1e8",
          rgb: {
            r: 125,
            g: 241,
            b: 232
          }
        };
}

function buildColor2(param) {
  return {
          hex: "#1918e8",
          rgb: {
            r: 25,
            g: 24,
            b: 232
          }
        };
}

exports.testOperateColorPickToChangeColor = testOperateColorPickToChangeColor;
exports.buildColor1 = buildColor1;
exports.buildColor2 = buildColor2;
/* Wonder_jest Not a pure module */
