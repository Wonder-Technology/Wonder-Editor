'use strict';

var InspectorGameObjectUtils$WonderEditor = require("../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorGameObjectUtils.js");
var GameObjectAllComponentParseUtils$WonderEditor = require("../../../src/core/config/utils/GameObjectAllComponentParseUtils.js");

function buildFakeAllShowComponentConfig(param) {
  return GameObjectAllComponentParseUtils$WonderEditor.getGameObjectAllComponentConfig(/* () */0);
}

var buildComponentUIComponent = InspectorGameObjectUtils$WonderEditor.buildComponentUIComponent;

exports.buildComponentUIComponent = buildComponentUIComponent;
exports.buildFakeAllShowComponentConfig = buildFakeAllShowComponentConfig;
/* InspectorGameObjectUtils-WonderEditor Not a pure module */
