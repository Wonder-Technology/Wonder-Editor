'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var ReactTestRenderer = require("react-test-renderer");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var HeaderSetting$WonderEditor = require("../../../../../src/core/composable_component/header/composable_component/setting/HeaderSetting.js");
var SettingSceneModal$WonderEditor = require("../../../../../src/core/composable_component/header/composable_component/setting/composable_component/settingSceneModal/ui/SettingSceneModal.js");

function getColor(param) {
  return SettingSceneModal$WonderEditor.Method[/* _getAmbientLightColor */1](/* () */0);
}

function changeColor(color) {
  return SettingSceneModal$WonderEditor.Method[/* _changeAmbientLightColor */0](color);
}

function closeColorPicker(color, $staropt$star, $staropt$star$1, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return Curry._3(SettingSceneModal$WonderEditor.Method[/* _closeAmbientLightColorPick */2], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, color);
}

var Ambient = /* module */[
  /* getColor */getColor,
  /* changeColor */changeColor,
  /* closeColorPicker */closeColorPicker
];

function setCubemapTextureToSceneSkybox(cubemapTexture) {
  return SettingSceneModal$WonderEditor.Method[/* setCubemapTextureToSceneSkybox */6](/* tuple */[
              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
              TestTool$WonderEditor.getDispatch(/* () */0)
            ], cubemapTexture);
}

function removeCubemap(param) {
  return Curry._3(SettingSceneModal$WonderEditor.Method[/* removeCubemap */5], /* tuple */[
              TestTool$WonderEditor.buildEmptyAppState(/* () */0),
              TestTool$WonderEditor.getDispatch(/* () */0)
            ], /* () */0, /* () */0);
}

var Skybox = /* module */[
  /* setCubemapTextureToSceneSkybox */setCubemapTextureToSceneSkybox,
  /* removeCubemap */removeCubemap
];

var Scene = /* module */[
  /* Ambient */Ambient,
  /* Skybox */Skybox
];

function buildSetting($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var isSettingNav = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
  var isShowSceneModal = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  var toggleShowNavFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (param) {
        return /* () */0;
      });
  var hoverNavFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (param) {
        return /* () */0;
      });
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, HeaderSetting$WonderEditor.make(uiState, dispatchFunc, isSettingNav, isShowSceneModal, toggleShowNavFunc, hoverNavFunc, /* array */[])));
}

function buildSettingSceneModal($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var title = $staropt$star !== undefined ? $staropt$star : "SettingSceneModal";
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  var isShowCubemapGroup = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  var closeFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (param) {
        return /* () */0;
      });
  return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, SettingSceneModal$WonderEditor.make(uiState, dispatchFunc, closeFunc, title, isShowCubemapGroup, /* array */[])));
}

var UI = /* module */[
  /* buildSetting */buildSetting,
  /* buildSettingSceneModal */buildSettingSceneModal
];

exports.Scene = Scene;
exports.UI = UI;
/* ReasonReact Not a pure module */
