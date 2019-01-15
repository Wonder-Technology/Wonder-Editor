

import * as WDBService$WonderEditor from "../../../../../service/primitive/WDBService.js";
import * as ConsoleUtils$WonderEditor from "../../../../utils/ui/ConsoleUtils.js";
import * as HeaderExportUtils$WonderEditor from "./HeaderExportUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/StateEngineService.js";
import * as HeaderExportSceneWDBUtils$WonderEditor from "./HeaderExportSceneWDBUtils.js";
import * as Uint8ArrayAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/Uint8ArrayAssetEditorService.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../../service/state/engine/GenerateSceneGraphEngineService.js";

function exportScene(sceneName) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    ConsoleUtils$WonderEditor.warn("should export scene when stop, but now is run!", editorState);
    return /* () */0;
  } else {
    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    var match$1 = HeaderExportSceneWDBUtils$WonderEditor.generateSceneWDB(GenerateSceneGraphEngineService$WonderEditor.generateWDB, Uint8ArrayAssetEditorService$WonderEditor.buildImageUint8ArrayMap(editorState), engineState);
    StateEngineService$WonderEditor.setState(match$1[0]);
    return HeaderExportUtils$WonderEditor.download(match$1[1], sceneName + WDBService$WonderEditor.getExtName(/* () */0), "");
  }
}

export {
  exportScene ,
  
}
/* ConsoleUtils-WonderEditor Not a pure module */
