open Sinon;

let buildFakeFetchTextResponse = (sandbox, text) =>
  {
    /* "arrayBuffer": () => arrayBuffer |> Js.Promise.resolve, */
    "text": () => text |> Js.Promise.resolve,
  }
  |> Js.Promise.resolve;

let buildFakeFetchArrayBufferResponse = (sandbox, arrayBuffer) =>
  {"arrayBuffer": () => arrayBuffer |> Js.Promise.resolve}
  |> Js.Promise.resolve;
