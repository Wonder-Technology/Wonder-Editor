

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Color$WonderEditor from "../../src/core/external/Color.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";

function testOperateColorPickToChangeColor(sandbox, buildComponent, param) {
  var getColorFunc = param[2];
  var changeColorFunc = param[1];
  var getCurrentGameObjectComponentFunc = param[0];
  describe("test change color should set current gameObject color", (function (param) {
          describe("test logic", (function (param) {
                  return Wonder_jest.test("test change color should set into engine", (function (param) {
                                var currentGameObjectComponent = Curry._1(getCurrentGameObjectComponentFunc, /* () */0);
                                var newColor = {
                                  hex: "#7df1e8",
                                  rgb: {
                                    r: 125,
                                    g: 241,
                                    b: 232
                                  }
                                };
                                Curry._2(changeColorFunc, currentGameObjectComponent, newColor);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(getColorFunc, currentGameObjectComponent)))), newColor.hex);
                              }));
                }));
          return /* () */0;
        }));
  return /* () */0;
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

export {
  testOperateColorPickToChangeColor ,
  buildColor1 ,
  buildColor2 ,
  
}
/* Wonder_jest Not a pure module */
