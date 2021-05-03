

import * as Fs from "fs";
import * as Path from "path";
import * as Process from "process";

function buildPath(name) {
  return Path.join(Process.cwd(), "./test/res/gltf/", "" + (String(name) + ""));
}

function getArrayBuffer(name) {
  return Fs.readFileSync(buildPath(name)).buffer;
}

export {
  buildPath ,
  getArrayBuffer ,
  
}
/* fs Not a pure module */
