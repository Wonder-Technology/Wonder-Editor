

import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as LogUtils$WonderEditor from "../../../../utils/console/LogUtils.js";
import * as WPKService$WonderEditor from "../../../../../service/primitive/WPKService.js";
import * as BufferUtils$WonderEditor from "../BufferUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../utils/ui/ConsoleUtils.js";
import * as HeaderExportUtils$WonderEditor from "./HeaderExportUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/StateEngineService.js";
import * as HeaderExportASBUtils$WonderEditor from "./HeaderExportASBUtils.js";
import * as HeaderExportWPKUtils$WonderEditor from "./HeaderExportWPKUtils.js";
import * as HeaderExportSceneWDBUtils$WonderEditor from "./HeaderExportSceneWDBUtils.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../../service/state/engine/GenerateSceneGraphEngineService.js";

function _buildEmptyUint8Array() {
  return new Uint8Array(/* array */[]);
}

function _buildImageNodeUint8Array(editorState) {
  var __x = ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState).map((function (imageNode) {
          var uint8Array = imageNode[/* uint8Array */1];
          var base64 = imageNode[/* base64 */0];
          return /* record */[
                  /* base64 */imageNode[/* base64 */0],
                  /* uint8Array */Js_primitive.some(uint8Array !== undefined ? Js_primitive.valFromOption(uint8Array) : (
                          base64 !== undefined ? BufferUtils$WonderEditor.convertBase64ToUint8Array(base64) : (ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("image->base64 should exist", "", "", ""), editorState), new Uint8Array(/* array */[]))
                        )),
                  /* blobObjectURL */imageNode[/* blobObjectURL */2],
                  /* name */imageNode[/* name */3],
                  /* mimeType */imageNode[/* mimeType */4]
                ];
        }));
  return ImageNodeMapAssetEditorService$WonderEditor.setImageNodeMap(__x, editorState);
}

function _export() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var editorState$1 = _buildImageNodeUint8Array(editorState);
  var match = HeaderExportSceneWDBUtils$WonderEditor.generateSceneWDB(GenerateSceneGraphEngineService$WonderEditor.generateWDBForWPK, /* tuple */[
        editorState$1,
        engineState
      ]);
  var engineState$1 = match[0];
  var asbArrayBuffer = HeaderExportASBUtils$WonderEditor.generateASB(editorState$1, engineState$1);
  var wpkArrayBuffer = HeaderExportWPKUtils$WonderEditor.generateWPK(match[1], asbArrayBuffer);
  StateEditorService$WonderEditor.setState(editorState$1);
  StateEngineService$WonderEditor.setState(engineState$1);
  return wpkArrayBuffer;
}

function exportPackage(packageName) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    ConsoleUtils$WonderEditor.warn("should export package when stop, but now is run!", editorState);
    return /* () */0;
  } else {
    var wpkArrayBuffer = _export(/* () */0);
    return HeaderExportUtils$WonderEditor.download(wpkArrayBuffer, packageName + WPKService$WonderEditor.getExtName(/* () */0), "");
  }
}

export {
  _buildEmptyUint8Array ,
  _buildImageNodeUint8Array ,
  _export ,
  exportPackage ,
  
}
/* BufferUtils-WonderEditor Not a pure module */
