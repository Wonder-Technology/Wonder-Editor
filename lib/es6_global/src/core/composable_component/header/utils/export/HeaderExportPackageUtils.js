

import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as WPKService$WonderEditor from "../../../../../service/primitive/WPKService.js";
import * as BufferUtils$WonderEditor from "../BufferUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../utils/ui/ConsoleUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as HeaderExportUtils$WonderEditor from "./HeaderExportUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../service/state/engine/state/StateEngineService.js";
import * as HeaderExportASBUtils$WonderEditor from "./HeaderExportASBUtils.js";
import * as HeaderExportWPKUtils$WonderEditor from "./HeaderExportWPKUtils.js";
import * as ImageDataAssetService$WonderEditor from "../../../../../service/record/editor/asset/ImageDataAssetService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";
import * as HeaderExportSceneWDBUtils$WonderEditor from "./HeaderExportSceneWDBUtils.js";
import * as OperateMaterialLogicService$WonderEditor from "../../../../../service/stateTuple/logic/material/OperateMaterialLogicService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as Uint8ArrayAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/Uint8ArrayAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../../service/state/engine/GenerateSceneGraphEngineService.js";

function _buildDefaultMaterialSnapshotUint8Array(param) {
  return BufferUtils$WonderEditor.convertBase64ToUint8Array(OperateMaterialLogicService$WonderEditor.getDefaultSnapshotBase64(/* () */0));
}

function _buildImageDataUint8Array(editorState) {
  var __x = ImmutableSparseMapService$WonderCommonlib.mapValid((function (data) {
          return /* record */[
                  /* base64 */data[/* base64 */0],
                  /* uint8Array */Caml_option.some(ImageDataAssetService$WonderEditor.getUint8Array(data, _buildDefaultMaterialSnapshotUint8Array)),
                  /* blobObjectURL */data[/* blobObjectURL */2],
                  /* name */data[/* name */3],
                  /* mimeType */data[/* mimeType */4]
                ];
        }), ImageDataMapAssetEditorService$WonderEditor.getMap(editorState));
  return ImageDataMapAssetEditorService$WonderEditor.setMap(__x, editorState);
}

function _export(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var editorState$1 = _buildImageDataUint8Array(editorState);
  var imageUint8ArrayMap = Uint8ArrayAssetEditorService$WonderEditor.buildImageUint8ArrayMap(editorState$1);
  var match = HeaderExportSceneWDBUtils$WonderEditor.generateSceneWDB(false, GenerateSceneGraphEngineService$WonderEditor.generateWDBForWPK, imageUint8ArrayMap, engineState);
  var match$1 = HeaderExportASBUtils$WonderEditor.generateASB(imageUint8ArrayMap, /* tuple */[
        editorState$1,
        match[0]
      ]);
  var wpkArrayBuffer = HeaderExportWPKUtils$WonderEditor.generateWPK(match[1], match$1[1]);
  StateEditorService$WonderEditor.setState(editorState$1);
  StateEngineService$WonderEditor.setState(match$1[0]);
  return wpkArrayBuffer;
}

function exportPackage(packageName) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    ConsoleUtils$WonderEditor.warn(LanguageUtils$WonderEditor.getMessageLanguageDataByType("should-in-stop", languageType), editorState);
    return /* () */0;
  } else {
    var wpkArrayBuffer = _export(/* () */0);
    return HeaderExportUtils$WonderEditor.download(wpkArrayBuffer, packageName + WPKService$WonderEditor.getExtName(/* () */0), "");
  }
}

export {
  _buildDefaultMaterialSnapshotUint8Array ,
  _buildImageDataUint8Array ,
  _export ,
  exportPackage ,
  
}
/* BufferUtils-WonderEditor Not a pure module */
