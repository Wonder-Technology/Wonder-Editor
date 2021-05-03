

import * as FileNameService$WonderEditor from "../../../../../../../../../../../service/atom/FileNameService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/AssetBundleNodeAssetService.js";
import * as AssetHeaderAssetBundleUtils$WonderEditor from "./AssetHeaderAssetBundleUtils.js";
import * as OperateTreeAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/OperateTreeAssetLogicService.js";
import * as AssetBundleNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/AssetBundleNodeAssetEditorService.js";

function handleAssetBundleType(param, param$1, param$2) {
  var engineState = param$2[1];
  var editorState = param$2[0];
  var selectedFolderNodeInAssetTree = param$1[1];
  var assetBundleNodeId = param$1[0];
  var assetBundleArrayBuffer = param[1];
  var fileName = param[0];
  return new Promise((function (resolve, reject) {
                var editorState$1 = AssetBundleNodeAssetEditorService$WonderEditor.addAssetBundleNodeToAssetTree(selectedFolderNodeInAssetTree, AssetBundleNodeAssetService$WonderEditor.buildNode(assetBundleNodeId, OperateTreeAssetLogicService$WonderEditor.getUniqueNodeName(FileNameService$WonderEditor.getBaseName(fileName), selectedFolderNodeInAssetTree, engineState), assetBundleArrayBuffer, AssetHeaderAssetBundleUtils$WonderEditor.getAssetBundleTypeByExtname(FileNameService$WonderEditor.getExtName(fileName))), editorState);
                return resolve(/* tuple */[
                            editorState$1,
                            engineState
                          ]);
              }));
}

export {
  handleAssetBundleType ,
  
}
/* AssetBundleNodeAssetService-WonderEditor Not a pure module */
