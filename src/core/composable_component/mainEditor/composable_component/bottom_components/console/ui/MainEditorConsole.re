open ConsoleMessageType;

module Method = {
  let triggerConsoleByType = (dispatchFunc, type_, message) => {
    ConsoleMessageArrayEditorService.addConsoleMessage({
      message,
      consoleType: type_,
      traceInfo: None,
    })
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };

  let triggerTrace = (dispatchFunc, message) => {
    let editorState = StateEditorService.getState();
    let copiedMessageArr =
      editorState
      |> ConsoleMessageArrayEditorService.getConsoleMessageArray
      |> Js.Array.copy;

    switch (copiedMessageArr |> Js.Array.pop) {
    | None => ()
    | Some({traceInfo} as messageRecord) =>
      switch (traceInfo) {
      | None =>
        editorState
        |> ConsoleMessageArrayEditorService.setConsoleMessageArray(
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
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };

  let clearAllConsoleMessage = dispatchFunc => {
    ConsoleMessageArrayEditorService.clearConsoleMessageArray
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };

  let showConsoleMsgComponent = consoleMessageArr =>
    consoleMessageArr
    |> Js.Array.map(({message, consoleType, traceInfo}) =>
         switch (consoleType) {
         | Error =>
           <ConsoleBaseComponent
             key=(DomHelper.getRandomKey())
             type_="error"
             imageSrc="./public/img/error.png"
             message
             traceInfo
           />
         | Info =>
           <ConsoleBaseComponent
             key=(DomHelper.getRandomKey())
             type_="info"
             imageSrc="./public/img/log.png"
             message
             traceInfo
           />
         | Warn =>
           <ConsoleBaseComponent
             key=(DomHelper.getRandomKey())
             type_="warn"
             imageSrc="./public/img/warn.png"
             message
             traceInfo
           />
         | Log =>
           <ConsoleBaseComponent
             key=(DomHelper.getRandomKey())
             type_="log"
             imageSrc="./public/img/log.png"
             message
             traceInfo
           />
         | _ => ReasonReact.null
         }
       );
};

let component = ReasonReact.statelessComponent("MainEditorConsole");

let log11 = () => WonderLog.Log.print("log message") |> ignore;

let info = () => WonderLog.Log.info({j|info message|j});

let warn11 = () => WonderLog.Log.warn({j|warn message|j});

let debug = () =>
  WonderLog.Log.debug(
    WonderLog.Log.buildDebugMessage(
      ~description={j|create test debug|j},
      ~params={j||j},
    ),
    StateEditorService.getStateIsDebug(),
  );

let fatal = () =>
  Console.tryCatch(
    () =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="test add fatal",
          ~description={j|sss|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      ),
    e => Console.throwFatal(e),
  );

let render = (store, dispatchFunc, _self) => {
  let consoleMessageArray =
    StateEditorService.getState()
    |> ConsoleMessageArrayEditorService.getConsoleMessageArray;
  let style =
    store
    |> StoreUtils.getBottomCurrentComponentType
    |> MainEditorBottomComponentUtils.isTypeEqualConsole ?
      ReactDOMRe.Style.make(~opacity="1", ()) :
      ReactDOMRe.Style.make(~display="none", ());

  <article key="console" className="wonder-console-component" style>
    <div className="console-header">
      <button
        className=""
        onClick=(_e => Method.clearAllConsoleMessage(dispatchFunc))>
        (DomHelper.textEl("clear"))
      </button>
      <button className="" onClick=(_e => log11())>
        (DomHelper.textEl("add log"))
      </button>
      <button className="" onClick=(_e => info())>
        (DomHelper.textEl("add info"))
      </button>
      <button className="" onClick=(_e => warn11())>
        (DomHelper.textEl("add warn"))
      </button>
      <button className="" onClick=(_e => debug())>
        (DomHelper.textEl("add debug"))
      </button>
      <button className="" onClick=(_e => fatal())>
        (DomHelper.textEl("add fatal"))
      </button>
    </div>
    <div className="console-content">
      (
        consoleMessageArray |> ArrayService.hasItem ?
          ReasonReact.array(
            Method.showConsoleMsgComponent(consoleMessageArray),
          ) :
          ReasonReact.null
      )
    </div>
  </article>;
};

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: render(store, dispatchFunc),
  didMount: _self =>
    Console.stubConsole(
      Method.triggerConsoleByType(dispatchFunc, Error),
      Method.triggerConsoleByType(dispatchFunc, Info),
      Method.triggerConsoleByType(dispatchFunc, Warn),
      Method.triggerTrace(dispatchFunc),
      Method.triggerConsoleByType(dispatchFunc, Log),
    ),
};