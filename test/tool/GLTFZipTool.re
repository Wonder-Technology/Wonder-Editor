let buildPath = name =>
  Node.Path.join([|Node.Process.cwd(), "./test/res/gltf/", {j|$name|j}|]);

let getArrayBuffer = name => {
  /*! fix fs.readFileSync returns corrupt ArrayBuffer (fs.readFile works as expected):
    https://github.com/nodejs/node/issues/11132 */

  let buffer = NodeExtendTool.readFileBufferSync(buildPath(name));

  buffer##buffer;
};