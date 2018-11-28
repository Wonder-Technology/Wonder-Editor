

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Console$WonderEditor from "../../../core/external/Console.js";
import * as DirectorAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/DirectorAPI.js";

function loopBody(time, state) {
  return Curry._2(Console$WonderEditor.tryCatch, (function () {
                return DirectorAPI$Wonderjs.loopBody(time, state);
              }), (function (e) {
                Console$WonderEditor.throwFatal(e);
                return state;
              }));
}

var init = DirectorAPI$Wonderjs.initDirector;

export {
  init ,
  loopBody ,
  
}
/* Console-WonderEditor Not a pure module */
