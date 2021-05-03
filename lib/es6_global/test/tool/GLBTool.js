

import * as Fs from "fs";
import * as Path from "path";
import * as Process from "process";

function buildGLBPath(glbName) {
  return Path.join(Process.cwd(), "./test/res/glb/", "" + (String(glbName) + ".glb"));
}

function getGLBArrayBuffer(glbName) {
  return Fs.readFileSync(buildGLBPath(glbName)).buffer;
}

export {
  buildGLBPath ,
  getGLBArrayBuffer ,
  
}
/* fs Not a pure module */
