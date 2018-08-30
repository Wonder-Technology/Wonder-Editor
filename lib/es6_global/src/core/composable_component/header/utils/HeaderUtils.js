

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_dict from "../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as FileReader$WonderEditor from "../../../external/FileReader.js";
import * as ArrayService$WonderEditor from "../../../../service/atom/ArrayService.js";
import * as SceneTreeUtils$WonderEditor from "../../mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as GameObjectUtils$WonderEditor from "../../../utils/engine/GameObjectUtils.js";
import * as DefaultSceneUtils$WonderEditor from "../../../utils/engine/DefaultSceneUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../mainEditor/composable_component/bottom_components/asset/utils/AssetTreeNodeUtils.js";
import * as SceneEditorService$WonderEditor from "../../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as DirectorEngineService$WonderEditor from "../../../../service/state/engine/DirectorEngineService.js";
import * as InspectorEditorService$WonderEditor from "../../../../service/state/editor/inspector/InspectorEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../service/state/engine/GameObjectEngineService.js";
import * as AssembleWDBEngineService$WonderEditor from "../../../../service/state/engine/AssembleWDBEngineService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../service/state/engine/BasicCameraViewEngineService.js";
import * as GameObjectComponentLogicService$WonderEditor from "../../../../service/stateTuple/logic/GameObjectComponentLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../service/state/engine/GameObjectComponentEngineService.js";

function handleSceneWdb(wdbResult) {
  return Most.flatMap((function () {
                return Most.map((function (param) {
                              var gameObject = param[2];
                              var runEngineState = param[0];
                              var match = AssetTreeNodeUtils$WonderEditor.initRootAssetTree(SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(InspectorEditorService$WonderEditor.clearComponentTypeMap(StateEditorService$WonderEditor.getState(/* () */0))));
                              StateEditorService$WonderEditor.setState(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(match[0], GameObjectComponentLogicService$WonderEditor.getGameObjectComponentStoreInComponentTypeMap(GameObjectUtils$WonderEditor.getChildren(gameObject, runEngineState), runEngineState, match[1])));
                              Log$WonderLog.print("run enginestate component map");
                              Log$WonderLog.print(InspectorEditorService$WonderEditor.getComponentTypeMap(StateEditorService$WonderEditor.getState(/* () */0)));
                              return StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(SceneEngineService$WonderEditor.setSceneGameObject(gameObject, SceneEngineService$WonderEditor.disposeSceneAndChildren(runEngineState)))));
                            }), AssembleWDBEngineService$WonderEditor.assembleWDB(wdbResult[/* result */2], StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
              }), Most.map((function (param) {
                    var editEngineState = SceneEngineService$WonderEditor.setSceneGameObject(param[2], SceneEngineService$WonderEditor.disposeSceneAndChildren(param[0]));
                    var scene = SceneEngineService$WonderEditor.getSceneGameObject(editEngineState);
                    var match = DefaultSceneUtils$WonderEditor.prepareSpecificGameObjectsForEditEngineState(editEngineState);
                    var editEngineState$1 = match[0];
                    return StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, DirectorEngineService$WonderEditor.init(GameObjectEngineService$WonderEditor.setGameObjectName("scene", scene, BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(match[1], editEngineState$1), editEngineState$1)))));
                  }), AssembleWDBEngineService$WonderEditor.assembleWDB(wdbResult[/* result */2], StateLogicService$WonderEditor.getEditEngineState(/* () */0))));
}

function loadSceneWDB(dispatchFunc, $$event) {
  DomHelper$WonderEditor.preventDefault($$event);
  var wdbInfo = ArrayService$WonderEditor.getFirst(Js_dict.values($$event.target.files).map(AssetTreeNodeUtils$WonderEditor.convertFileJsObjectToFileInfoRecord));
  Most.drain(Most.flatMap(handleSceneWdb, Most.flatMap((function (wdbInfo) {
                    return Most.fromPromise(new Promise((function (resolve, _) {
                                      var reader = new FileReader();
                                      Curry._2(FileReader$WonderEditor.onload, reader, (function (result) {
                                              return resolve(/* record */[
                                                          /* name */wdbInfo[/* name */0],
                                                          /* type_ */AssetTreeNodeUtils$WonderEditor.getUploadFileType(wdbInfo[/* name */0]),
                                                          /* result */result
                                                        ]);
                                            }));
                                      return AssetTreeNodeUtils$WonderEditor.readFileByType(reader, wdbInfo);
                                    })));
                  }), Most.just(wdbInfo)))).then((function () {
          Curry._1(dispatchFunc, [
                AppStore$WonderEditor.SceneTreeAction,
                /* SetSceneGraph */[StateLogicService$WonderEditor.getStateToGetData(SceneTreeUtils$WonderEditor.getSceneGraphDataFromEngine)]
              ]);
          return Promise.resolve(Curry._1(dispatchFunc, [
                          AppStore$WonderEditor.UpdateAction,
                          /* Update */[/* array */[/* All */0]]
                        ]));
        }));
  return /* () */0;
}

export {
  handleSceneWdb ,
  loadSceneWDB ,
  
}
/* most Not a pure module */
