let buildFakeDiv = firstChild => {
  "offsetWidth": 100,
  "offsetHeight": 100,
  "setAttribute": (dom, src) => (),
  "appendChild": (parent, child) => (),
  "innerHTML": "",
  "firstChild": firstChild,
};

let stubFakeDomForQuerySelector = (sandbox, fakeDomId, fakeDom) => {
  open Sinon;

  let querySelector =
    createMethodStub(
      refJsObjToSandbox(sandbox^),
      DomHelper.document |> Obj.magic,
      "querySelector",
    );

  querySelector
  |> withOneArg({j|#$fakeDomId|j})
  |> returns(fakeDom)
  |> ignore;
};

let stubFakeDomForGetElementById = (sandbox, fakeDomId, fakeDom) => {
  open Sinon;

  let getElementById =
    createMethodStub(
      refJsObjToSandbox(sandbox^),
      DomHelper.document |> Obj.magic,
      "getElementById",
    );

  getElementById
  |> withOneArg({j|$fakeDomId|j})
  |> returns(fakeDom)
  |> ignore;
};