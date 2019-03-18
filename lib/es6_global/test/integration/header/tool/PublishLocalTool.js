

import * as HeaderPublishLocalUtils$WonderEditor from "../../../../src/core/composable_component/header/utils/publish/local/HeaderPublishLocalUtils.js";

function getFetchPackageContentWithoutAssetCountWithDefault(param) {
  return 12;
}

function exportScene(editorState, engineState) {
  return HeaderPublishLocalUtils$WonderEditor.Publish[/* _generateSceneWDB */1](editorState, engineState);
}

export {
  getFetchPackageContentWithoutAssetCountWithDefault ,
  exportScene ,
  
}
/* HeaderPublishLocalUtils-WonderEditor Not a pure module */
