let buildGLBPath = glbName =>
  Node.Path.join([|
    Node.Process.cwd(),
    "./test/res/glb/",
    {j|$glbName.glb|j},
  |]);

let getGLBArrayBuffer = glbName => {
  /*! fix fs.readFileSync returns corrupt ArrayBuffer (fs.readFile works as expected):
    https://github.com/nodejs/node/issues/11132 */
  let buffer = NodeExtendTool.readFileBufferSync(buildGLBPath(glbName));

  buffer##buffer;
};