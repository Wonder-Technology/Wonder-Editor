let stubFakeDomForQuerySelector = (sandbox, fakeDomId, fakeDom) => {
  open Sinon;

  let querySelector =
    createMethodStub(
      refJsObjToSandbox(sandbox^),
      DomHelper.document |> Obj.magic,
      "querySelector",
    );

  querySelector |> withOneArg({j|#$fakeDomId|j}) |> returns(fakeDom) |> ignore;
};