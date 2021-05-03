module Method = {
  let triggerConsoleByType = (dispatchFunc, type_, message) => {
    MessageArrayConsoleEditorService.addConsoleMessage({
      message,
      consoleType: type_,
      traceInfo: None,
    })
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(
      AppStore.UpdateAction(
        Update([|UpdateStore.Console, UpdateStore.BottomHeader|]),
      ),
    )
    |> ignore;
  };

  let triggerTrace = (dispatchFunc, message) => {
    let editorState = StateEditorService.getState();
    let copiedMessageArr =
      editorState
      |> MessageArrayConsoleEditorService.getConsoleMessageArray
      |> Js.Array.copy;

    switch (copiedMessageArr |> Js.Array.pop) {
    | None => ()
    | Some({traceInfo} as messageRecord) =>
      switch (traceInfo) {
      | None =>
        editorState
        |> MessageArrayConsoleEditorService.setConsoleMessageArray(
             copiedMessageArr
             |> ArrayService.push({
                  ...messageRecord,
                  traceInfo: Some(message),
                }),
           )
        |> StateEditorService.setState
        |> ignore

      | Some(_) => ()
      }
    };

    dispatchFunc(
      AppStore.UpdateAction(
        Update([|UpdateStore.Console, UpdateStore.BottomHeader|]),
      ),
    )
    |> ignore;
  };
};

let component = ReasonReact.statelessComponent("MainEditorBottomComponents");

let render = ((uiState, dispatchFunc), _self) => {
  let currentComponentType = uiState |> StoreUtils.getBottomCurrentComponentType;

  <article
    key="MainEditorBottomComponents" className="wonder-bottom-component">
    <MainEditorBottomHeader uiState dispatchFunc />
    (
      MainEditorBottomComponentUtils.isTypeEqualProject(currentComponentType) ?
        <MainEditorProject uiState dispatchFunc /> : ReasonReact.null
    )
    (
      MainEditorBottomComponentUtils.isTypeEqualConsole(currentComponentType) ?
        <MainEditorConsole uiState dispatchFunc /> : ReasonReact.null
    )
  </article>;
};

let make = (~uiState, ~dispatchFunc, _children) => {
  Console.stubConsole(
    Method.triggerConsoleByType(dispatchFunc, Error),
    Method.triggerConsoleByType(dispatchFunc, Info),
    Method.triggerConsoleByType(dispatchFunc, Warn),
    Method.triggerConsoleByType(dispatchFunc, Debug),
    Method.triggerTrace(dispatchFunc),
    Method.triggerConsoleByType(dispatchFunc, Log),
  );

  {...component, render: self => render((uiState, dispatchFunc), self)};
};