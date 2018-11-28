

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$WonderEditor from "../../../../src/service/primitive/OptionService.js";
import * as SparseMapService$WonderEditor from "../../../../src/service/atom/SparseMapService.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as MainEditorAssetIdTool$WonderEditor from "./MainEditorAssetIdTool.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/WDBNodeMapAssetEditorService.js";

function getWDBGameObject(nodeId, editorState) {
  return SparseMapService$WonderCommonlib.unsafeGet(nodeId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(editorState))[/* wdbGameObject */3];
}

var getAllWDBGameObjects = GeometryAssetLogicService$WonderEditor.getAllWDBGameObjects;

function addWDBNode(gameObject, $staropt$star, $staropt$star$1, _) {
  var name = $staropt$star !== undefined ? $staropt$star : "";
  if ($staropt$star$1 !== undefined) {
    Js_primitive.valFromOption($staropt$star$1);
  } else {
    new ArrayBuffer(0);
  }
  var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  var __x = WDBNodeMapAssetEditorService$WonderEditor.buildWDBNodeResult(name, undefined, gameObject, new ArrayBuffer(0));
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return WDBNodeMapAssetEditorService$WonderEditor.setResult(addedNodeId, __x, param);
        }));
  return addedNodeId;
}

function getWDBNodeIdByName(wdbGameObjectName, editorState) {
  return OptionService$WonderEditor.unsafeGet(SparseMapService$WonderEditor.reduceiValid((function (resultNodeId, param, nodeId) {
                    if (resultNodeId !== undefined) {
                      return resultNodeId;
                    } else {
                      var match = param[/* name */0] === wdbGameObjectName;
                      if (match) {
                        return nodeId;
                      } else {
                        return resultNodeId;
                      }
                    }
                  }), undefined, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(editorState)));
}

export {
  getWDBGameObject ,
  getAllWDBGameObjects ,
  addWDBNode ,
  getWDBNodeIdByName ,
  
}
/* OptionService-WonderEditor Not a pure module */
