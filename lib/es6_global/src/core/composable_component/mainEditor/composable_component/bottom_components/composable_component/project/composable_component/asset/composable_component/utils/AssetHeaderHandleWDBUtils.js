

import * as ProgressUtils$WonderEditor from "../../../../../../../../../../atom_component/progress/utils/ProgressUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FileNameService$WonderEditor from "../../../../../../../../../../../service/atom/FileNameService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as WDBAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/WDBAssetLogicService.js";
import * as DirectorEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as ExtractAndRelateAssetsUtils$WonderEditor from "../header/utils/ExtractAndRelateAssetsUtils.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as RelateGameObjectAndGeometryAssetUtils$WonderEditor from "../../../../../../../../../utils/RelateGameObjectAndGeometryAssetUtils.js";

function handleAssetWDBType(param, param$1, param$2) {
  var engineState = param$2[1];
  var selectedFolderNodeInAssetTree = param$1[1];
  StateEngineService$WonderEditor.setState(ProgressUtils$WonderEditor.changePercent(0, ProgressUtils$WonderEditor.show(StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
  var __x = FileNameService$WonderEditor.getBaseName(param[0]);
  return WDBAssetLogicService$WonderEditor.importAssetWDB(/* tuple */[
                OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(__x, selectedFolderNodeInAssetTree, engineState),
                param[1]
              ], /* tuple */[
                param$1[0],
                selectedFolderNodeInAssetTree,
                true
              ], WDBAssetLogicService$WonderEditor.createWDBNodeUseCreatedSnapshot, /* tuple */[
                param$2[0],
                engineState
              ]).then((function (param) {
                var match = param[1];
                var match$1 = param[0];
                var allGameObjects = match$1[0];
                var match$2 = ExtractAndRelateAssetsUtils$WonderEditor.Extract[/* extractAndRelateAssets */13](allGameObjects, match$1[1], /* tuple */[
                      match[0],
                      match[1]
                    ]);
                var match$3 = match$2[1];
                var engineState = match$3[1];
                var editorState = match$3[0];
                var match$4 = match$2[0];
                var defaultGeometryData = RelateGameObjectAndGeometryAssetUtils$WonderEditor.getDefaultGeometryData(editorState, engineState);
                var engineState$1 = DirectorEngineService$WonderEditor.loopBody(0, ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                            return GameObjectEngineService$WonderEditor.initGameObject(gameObject, RelateGameObjectAndGeometryAssetUtils$WonderEditor.replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(gameObject, defaultGeometryData, engineState));
                          }), engineState, allGameObjects));
                var match$5 = ExtractAndRelateAssetsUtils$WonderEditor.AssetTree[/* addNodeToAssetTree */8](match$4[0], match$4[1], match$4[2], match$4[3], /* tuple */[
                      editorState,
                      engineState$1
                    ]);
                StateLogicService$WonderEditor.getAndSetEngineState(ProgressUtils$WonderEditor.finish);
                return Promise.resolve(/* tuple */[
                            match$5[0],
                            match$5[1]
                          ]);
              }));
}

export {
  handleAssetWDBType ,
  
}
/* ProgressUtils-WonderEditor Not a pure module */
