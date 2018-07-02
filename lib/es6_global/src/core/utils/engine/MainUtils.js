

import * as Most from "most";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as GameObjectUtils$WonderEditor from "./GameObjectUtils.js";
import * as DefaultSceneUtils$WonderEditor from "./DefaultSceneUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEngineService$WonderEditor from "../../../service/state/engine/AssetEngineService.js";
import * as SceneEditorService$WonderEditor from "../../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/GameObjectEngineService.js";
import * as EngineStateDataEditorService$WonderEditor from "../../../service/state/editor/EngineStateDataEditorService.js";

function _getLoadData(type_) {
  var engineDataDir = "./node_modules/wonder.js/data/";
  switch (type_) {
    case "edit" : 
        return AssetEngineService$WonderEditor.loadToData(/* array */[
                    "./src/engine/setting/editSetting.json",
                    engineDataDir
                  ], EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0));
    case "run" : 
        return AssetEngineService$WonderEditor.loadToData(/* array */[
                    "./src/engine/setting/runSetting.json",
                    engineDataDir
                  ], EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0));
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getLoadData", "the type_ is not find", "", "check the param", "type:" + (String(type_) + "")));
  }
}

function init(editorState) {
  return Most.drain(Most.map((function (editEngineState) {
                        StateEngineService$WonderEditor.setIsDebug(true);
                        var match = GameObjectEngineService$WonderEditor.create(editEngineState);
                        var scene = match[1];
                        var match$1 = DefaultSceneUtils$WonderEditor.prepareSpecificGameObjectsForEditEngineState(scene, match[0]);
                        var match$2 = DefaultSceneUtils$WonderEditor.computeDiffValue(editorState, match$1[0]);
                        var match$3 = DefaultSceneUtils$WonderEditor.createDefaultScene(scene, match$2[1]);
                        StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(GameObjectUtils$WonderEditor.setParentKeepOrder(match$3[1], match$1[1], GameObjectEngineService$WonderEditor.setGameObjectName("scene", scene, match$3[0])))));
                        StateEditorService$WonderEditor.setState(match$2[0]);
                        return /* () */0;
                      }), _getLoadData("edit")).concat(Most.map((function (runEngineState) {
                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                          var match = GameObjectEngineService$WonderEditor.create(runEngineState);
                          var scene = match[1];
                          var match$1 = DefaultSceneUtils$WonderEditor.createDefaultScene(scene, match[0]);
                          StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(GameObjectEngineService$WonderEditor.setGameObjectName("scene", scene, match$1[0]))));
                          StateEditorService$WonderEditor.setState(SceneEditorService$WonderEditor.setScene(scene, editorState));
                          return /* () */0;
                        }), _getLoadData("run")))).then((function () {
                return Promise.resolve(StateEditorService$WonderEditor.getState(/* () */0));
              }));
}

function start() {
  return init(StateEditorService$WonderEditor.getState(/* () */0)).then((function (editorState) {
                return Promise.resolve(StateEditorService$WonderEditor.setState(editorState));
              }));
}

export {
  _getLoadData ,
  init ,
  start ,
  
}
/* most Not a pure module */
