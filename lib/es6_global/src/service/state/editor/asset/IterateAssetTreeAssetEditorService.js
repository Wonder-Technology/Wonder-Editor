

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as AssetNodeUtils$WonderEditor from "../../../../core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/AssetNodeUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FileNameService$WonderEditor from "../../../atom/FileNameService.js";
import * as StateEditorService$WonderEditor from "../StateEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "./TreeAssetEditorService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../stateTuple/logic/OperateTextureLogicService.js";
import * as TreeRootAssetEditorService$WonderEditor from "./TreeRootAssetEditorService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "./WDBNodeMapAssetEditorService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "./FolderNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetLogicService$WonderEditor from "../../../stateTuple/logic/asset/MaterialNodeMapAssetLogicService.js";

function getAllChildrennNodeIds(node) {
  var _iterate = function (nodeArr, removedAssetIdArr) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (removedAssetIdArr, param) {
                  return _iterate(param[/* children */1], ArrayService$WonderEditor.push(param[/* nodeId */0], removedAssetIdArr));
                }), removedAssetIdArr, nodeArr);
  };
  return _iterate(/* array */[node], /* array */[]);
}

function getChildrenNameAndIdArr(nodeId, nodeType, param) {
  var engineState = param[1];
  var editorState = param[0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the parent asset node type should be Folder", "not"), (function () {
                        var param = OptionService$WonderEditor.unsafeGet(TreeAssetEditorService$WonderEditor.getSpecificTreeNodeById(nodeId, OptionService$WonderEditor.unsafeGet(TreeRootAssetEditorService$WonderEditor.getAssetTreeRoot(editorState))));
                        return Contract$WonderLog.assertTrue(param[/* type_ */2] === /* Folder */0);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var param$1 = OptionService$WonderEditor.unsafeGet(TreeAssetEditorService$WonderEditor.getSpecificTreeNodeById(nodeId, OptionService$WonderEditor.unsafeGet(TreeRootAssetEditorService$WonderEditor.getAssetTreeRoot(editorState))));
  return param$1[/* children */1].filter((function (param) {
                  return param[/* type_ */2] === nodeType;
                })).map((function (param) {
                var currentNodeId = param[/* nodeId */0];
                var name = AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(param[/* type_ */2], /* tuple */[
                      (function (param) {
                          return FolderNodeMapAssetEditorService$WonderEditor.getFolderName(currentNodeId, param);
                        }),
                      (function (param) {
                          return OperateTextureLogicService$WonderEditor.getTextureBaseName(currentNodeId, param);
                        }),
                      (function (param) {
                          return MaterialNodeMapAssetLogicService$WonderEditor.getMaterialBaseName(currentNodeId, engineState, param);
                        }),
                      (function (param) {
                          return WDBNodeMapAssetEditorService$WonderEditor.getWDBBaseName(currentNodeId, param);
                        })
                    ], editorState);
                return /* tuple */[
                        name,
                        currentNodeId
                      ];
              }));
}

function iterateNameArrBuildNewName(_name, childrenNameArr) {
  while(true) {
    var name = _name;
    var match = childrenNameArr.includes(name);
    if (match) {
      _name = FileNameService$WonderEditor.buildNameSucc(name);
      continue ;
    } else {
      return name;
    }
  };
}

function getUniqueTreeNodeName(name, nodeType, nodeId, param) {
  if (nodeId !== undefined) {
    return iterateNameArrBuildNewName(name, getChildrenNameAndIdArr(nodeId, nodeType, /* tuple */[
                      param[0],
                      param[1]
                    ]).map((function (param) {
                      return param[0];
                    })));
  } else {
    return name;
  }
}

export {
  getAllChildrennNodeIds ,
  getChildrenNameAndIdArr ,
  iterateNameArrBuildNewName ,
  getUniqueTreeNodeName ,
  
}
/* Log-WonderLog Not a pure module */
