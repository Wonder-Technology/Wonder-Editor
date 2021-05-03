

import * as WDBService$WonderEditor from "../../../../../service/primitive/WDBService.js";
import * as ConsoleUtils$WonderEditor from "../../../../utils/ui/ConsoleUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as HeaderExportUtils$WonderEditor from "./HeaderExportUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/state/StateEngineService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";
import * as HeaderExportSceneWDBUtils$WonderEditor from "./HeaderExportSceneWDBUtils.js";
import * as Uint8ArrayAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/Uint8ArrayAssetEditorService.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../../service/state/engine/GenerateSceneGraphEngineService.js";

function _generateSceneWDB(editorState, engineState) {
  return HeaderExportSceneWDBUtils$WonderEditor.generateSceneWDB(true, GenerateSceneGraphEngineService$WonderEditor.generateWDB, Uint8ArrayAssetEditorService$WonderEditor.buildImageUint8ArrayMap(editorState), engineState);
}

function exportScene(sceneName) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    ConsoleUtils$WonderEditor.warn(LanguageUtils$WonderEditor.getMessageLanguageDataByType("should-in-stop", languageType), editorState);
    return /* () */0;
  } else {
    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    var match$1 = _generateSceneWDB(editorState, engineState);
    StateEngineService$WonderEditor.setState(match$1[0]);
    return HeaderExportUtils$WonderEditor.download(match$1[1], sceneName + WDBService$WonderEditor.getExtName(/* () */0), "");
  }
}

export {
  _generateSceneWDB ,
  exportScene ,
  
}
/* ConsoleUtils-WonderEditor Not a pure module */
