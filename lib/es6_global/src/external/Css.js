'use strict';

import * as Curry          from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as CamlinternalOO from "../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";

var class_tables = [
  0,
  0,
  0
];

function importCss() {
  if (!class_tables[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env_init = function () {
      return CamlinternalOO.create_object_opt(0, $$class);
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  return Curry._1(class_tables[0], 0);
}

export {
  importCss ,
  
}
/* No side effect */
