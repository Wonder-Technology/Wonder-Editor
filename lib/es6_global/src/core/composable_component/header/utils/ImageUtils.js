

import * as LogUtils$WonderEditor from "../../../utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../utils/ui/ConsoleUtils.js";

function getImageName(image) {
  return image.name;
}

function setImageName(image, name) {
  image.name = name;
  return /* () */0;
}

function getImageWidth(image) {
  return image.width;
}

function getImageHeight(image) {
  return image.height;
}

function getImageMimeType(extName, editorState) {
  switch (extName) {
    case ".jpeg" : 
    case ".jpg" : 
        return "image/jpeg";
    case ".png" : 
        return "image/png";
    default:
      ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("unknown image mimeType: " + (String(extName) + ""), "", "", ""), editorState);
      return extName;
  }
}

function getNullImageSrc(param) {
  return "./public/null.png";
}

export {
  getImageName ,
  setImageName ,
  getImageWidth ,
  getImageHeight ,
  getImageMimeType ,
  getNullImageSrc ,
  
}
/* LogUtils-WonderEditor Not a pure module */
