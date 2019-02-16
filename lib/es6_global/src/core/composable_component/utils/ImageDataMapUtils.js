

import * as Result$WonderEditor from "../../../module/Result.js";
import * as ImageUtils$WonderEditor from "../header/utils/ImageUtils.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";

function getImgSrc(imageDataIndex, editorState) {
  var param = ImageDataMapAssetEditorService$WonderEditor.unsafeGetData(imageDataIndex, editorState);
  var blobObjectURL = param[/* blobObjectURL */2];
  var base64 = param[/* base64 */0];
  if (blobObjectURL !== undefined) {
    return Result$WonderEditor.SameDataResult[/* success */0](blobObjectURL);
  } else if (base64 !== undefined) {
    return Result$WonderEditor.SameDataResult[/* success */0](base64);
  } else {
    return Result$WonderEditor.SameDataResult[/* fail */1](/* tuple */[
                "texture->source should has base64 or blobObjectURL data, but acutally not has",
                ImageUtils$WonderEditor.getNullImageSrc(/* () */0)
              ]);
  }
}

export {
  getImgSrc ,
  
}
/* ImageUtils-WonderEditor Not a pure module */
