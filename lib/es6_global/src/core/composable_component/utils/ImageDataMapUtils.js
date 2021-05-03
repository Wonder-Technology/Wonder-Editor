

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ImageUtils$WonderEditor from "../header/utils/ImageUtils.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";

function getImgSrc(imageDataIndex, editorState) {
  var param = ImageDataMapAssetEditorService$WonderEditor.unsafeGetData(imageDataIndex, editorState);
  var blobObjectURL = param[/* blobObjectURL */2];
  var base64 = param[/* base64 */0];
  if (blobObjectURL !== undefined) {
    return blobObjectURL;
  } else if (base64 !== undefined) {
    return base64;
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("getImgSrc", "blobObjectURL or base64 should exist", "", "", ""));
    return ImageUtils$WonderEditor.getNullImageSrc(/* () */0);
  }
}

export {
  getImgSrc ,
  
}
/* Log-WonderLog Not a pure module */
