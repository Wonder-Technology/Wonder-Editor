open Sinon;

external convertToResponse: Js.t({..}) => Fetch.response = "%identity";

let buildFakeFetchTextResponse = (sandbox, text) =>
  {"text": () => text |> Js.Promise.resolve} |> Js.Promise.resolve;

let buildFakeFetchArrayBufferResponse = (sandbox, arrayBuffer) =>
  {"arrayBuffer": () => arrayBuffer |> Js.Promise.resolve}
  |> Js.Promise.resolve;

let buildFakeFetchSucessResponse = () =>
  {"json": () => Js.Promise.resolve("success fetch reponse")}
  |> convertToResponse;

let buildFakeFetchResponse = (arrayBuffer, ()) =>
  {"arrayBuffer": () => arrayBuffer |> Js.Promise.resolve}
  |> convertToResponse;

let buildFakeFetch = buildFakeFetchResponseFunc => {
  let fetch = _url => buildFakeFetchResponseFunc() |> Js.Promise.resolve;

  fetch;
};

let buildFakeFetchWithInit = buildFakeFetchResponseFunc => {
  let fetch = (_url, _data) =>
    buildFakeFetchResponseFunc() |> Js.Promise.resolve;
  fetch;
};