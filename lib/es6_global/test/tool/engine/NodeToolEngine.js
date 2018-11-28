

import * as Fs from "fs";
import * as Path from "path";
import * as Process from "process";

function buildWDBPath(wdbName) {
  return Path.join(Process.cwd(), "./test/res/", "wdb/" + (String(wdbName) + ".wdb"));
}

function getWDBArrayBuffer(wdbName) {
  var uint8TypeArray = Fs.readFileSync(buildWDBPath(wdbName));
  return new Uint8Array(uint8TypeArray).buffer;
}

export {
  buildWDBPath ,
  getWDBArrayBuffer ,
  
}
/* fs Not a pure module */
