

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";

function getImgContext(imgCanvasRecord) {
  return imgCanvasRecord[/* imgContext */0];
}

function setImgContext(imgContext, imgCanvasRecord) {
  return /* record */[/* imgContext */Caml_option.some(imgContext)];
}

export {
  getImgContext ,
  setImgContext ,
  
}
/* No side effect */
