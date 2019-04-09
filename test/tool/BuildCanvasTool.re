open Sinon;

type document;

[@bs.val] external document: document = "";

external documentToJsObj: document => Js.t({..}) = "%identity";

let getInspectorCanvasFakeBase64Str = () => "data:image/png;base64 for inspector-canvas";
let getImgCanvasFakeBase64Str = () => "data:image/png;base64 for img-canvas";

let _buildFakeContext = sandbox => {
  "drawImage": createEmptyStubWithJsObjSandbox(sandbox),
  "fillStyle": 0,
  "fillRect": createEmptyStubWithJsObjSandbox(sandbox),
  "translate": createEmptyStubWithJsObjSandbox(sandbox),
};

let getFakeCanvasDom = (id, (canvasWidth, canvasHeight), sandbox) => {
  "id": id,
  "nodeType": 1,
  "style": {
    "left": "",
    "top": "",
    "width": "",
    "height": "",
    "position": "static",
  },
  "width": canvasWidth,
  "height": canvasHeight,
  "getContext": () => _buildFakeContext(sandbox),
  "toDataURL": createEmptyStubWithJsObjSandbox(sandbox),
};

let buildFakeCanvas = sandbox => {
  let canvasDom = getFakeCanvasDom("a", (0, 0), sandbox);

  let createElementStub = documentToJsObj(document)##createElement;

  createElementStub |> withOneArg("canvas") |> returns(canvasDom) |> ignore;

  canvasDom;
};