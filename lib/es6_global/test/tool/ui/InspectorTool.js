

import * as InspectorGameObjectUtils$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorGameObjectUtils.js";
import * as GameObjectAllComponentParseUtils$WonderEditor from "../../../src/core/config/utils/GameObjectAllComponentParseUtils.js";

function buildFakeAllShowComponentConfig(param) {
  return GameObjectAllComponentParseUtils$WonderEditor.getGameObjectAllComponentConfig(/* () */0);
}

var buildComponentUIComponent = InspectorGameObjectUtils$WonderEditor.buildComponentUIComponent;

export {
  buildComponentUIComponent ,
  buildFakeAllShowComponentConfig ,
  
}
/* InspectorGameObjectUtils-WonderEditor Not a pure module */
