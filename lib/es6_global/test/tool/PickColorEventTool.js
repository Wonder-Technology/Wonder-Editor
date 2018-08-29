

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Color$WonderEditor from "../../src/core/external/Color.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "./ReactTestTool.js";
import * as BuildCanvasTool$WonderEditor from "./BuildCanvasTool.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorPointLight$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/point_light/ui/MainEditorPointLight.js";
import * as MainEditorBasicMaterial$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/basic_material/ui/MainEditorBasicMaterial.js";
import * as MainEditorLightMaterial$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/composable_component/light_material/ui/MainEditorLightMaterial.js";
import * as MainEditorDirectionLight$WonderEditor from "../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/composable_component/direction_light/ui/MainEditorDirectionLight.js";

function triggerShowColorPickEvent(domChildren) {
  var colorArticle = domChildren[0];
  var div = colorArticle.children[0];
  return BaseEventTool$WonderEditor.triggerClickEvent(div.children[2]);
}

function triggerCloseColorPickEvent(domChildren) {
  var colorArticle = domChildren[0];
  var div = colorArticle.children[0];
  var colorPickContent = div.children[3];
  return BaseEventTool$WonderEditor.triggerClickEvent(colorPickContent.children[1]);
}

function triggerChangeBasicMaterialColor(material, color) {
  return MainEditorBasicMaterial$WonderEditor.Method[/* changeColor */1](material, color);
}

function triggerChangeLightMaterialColor(material, color) {
  return MainEditorLightMaterial$WonderEditor.Method[/* changeColor */1](material, color);
}

function triggerChangeDirectionLightColor(material, color) {
  return MainEditorDirectionLight$WonderEditor.Method[/* changeColor */1](material, color);
}

function triggerChangePointLightColor(material, color) {
  return MainEditorPointLight$WonderEditor.Method[/* changeColor */1](material, color);
}

function testOperateColorPickToChangeColor(sandbox, buildComponent, param) {
  var getColorFunc = param[2];
  var changeColorFunc = param[1];
  var getCurrentGameObjectComponentFunc = param[0];
  describe("test change color should set current gameObject color", (function () {
          describe("test snapshot", (function () {
                  Wonder_jest.test("show color picker component for change color", (function () {
                          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
                          var component = Curry._1(buildComponent, /* () */0);
                          BaseEventTool$WonderEditor.triggerComponentEvent(component, triggerShowColorPickEvent);
                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                        }));
                  return Wonder_jest.test("close color picker component", (function () {
                                BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
                                var component = Curry._1(buildComponent, /* () */0);
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, triggerShowColorPickEvent);
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, triggerCloseColorPickEvent);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                              }));
                }));
          describe("test logic", (function () {
                  return Wonder_jest.test("test change color should set into engine", (function () {
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

export {
  triggerShowColorPickEvent ,
  triggerCloseColorPickEvent ,
  triggerChangeBasicMaterialColor ,
  triggerChangeLightMaterialColor ,
  triggerChangeDirectionLightColor ,
  triggerChangePointLightColor ,
  testOperateColorPickToChangeColor ,
  
}
/* Wonder_jest Not a pure module */
