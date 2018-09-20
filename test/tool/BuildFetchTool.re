open Sinon;

let _buildFakeFetchTextResponse = (sandbox, text) =>
  {
    /* "arrayBuffer": () => arrayBuffer |> Js.Promise.resolve, */
    "text": () => text |> Js.Promise.resolve,
  }
  |> Js.Promise.resolve;

let buildFakeFetch = (sandbox, firstText, secondText) => {
  let fetch = createEmptyStubWithJsObjSandbox(sandbox);

  fetch
  |> onCall(0)
  |> returns(_buildFakeFetchTextResponse(sandbox, firstText |> Obj.magic))
  |> onCall(1)
  |> returns(_buildFakeFetchTextResponse(sandbox, secondText |> Obj.magic));

  fetch;
};