open Sinon;

type document;

[@bs.val] external document : document = "";

external documentToJsObj : document => Js.t({..}) = "%identity";

let _buildFakeContext = sandbox => {
  "drawImage": createEmptyStubWithJsObjSandbox(sandbox),
  "fillStyle": 0,
  "fillRect": createEmptyStubWithJsObjSandbox(sandbox),
  "translate": createEmptyStubWithJsObjSandbox(sandbox),
};

let buildFakeCanvas = (id, sandbox) => {
  "id": id,
  "nodeType": 1,
  "style": {
    "left": "",
    "top": "",
    "width": "",
    "height": "",
    "position": "static",
  },
  "width": 0.,
  "height": 0.,
  "getContext": () => _buildFakeContext(sandbox),
  "toDataURL": createEmptyStubWithJsObjSandbox(sandbox),
};