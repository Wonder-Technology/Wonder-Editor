/* let reducer =
     (
       ~uiState=TestTool.buildEmptyAppState(),
       ~dispatchFunc=TestTool.getDispatch(),
       ~action,
       ~reducerFunc,
       (),
     ) =>
   reducerFunc((uiState, dispatchFunc)); */

let getUpdateState = reducerResult =>
  switch (reducerResult) {
  | ReasonReact.Update(reasonStateUpdate) => reasonStateUpdate
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j||j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let isNoUpdate = reducerResult =>
  switch (reducerResult) {
  | ReasonReact.NoUpdate => true
  | _ => false
  };

let createDispatchFuncStub = sandbox => {
  let stub = SinonTool.createOneLengthStub(sandbox^);

  Wonderjs.Root.root##dispathFuncStub_wonder_editor #= stub;

  stub;
};

let buildFakeSelf = (state, send): ReasonReact.self('a, 'b, 'c) => {
  handle: Obj.magic(-1),
  state,
  retainedProps: Obj.magic(-1),
  send,
  onUnmount: Obj.magic(-1),
};