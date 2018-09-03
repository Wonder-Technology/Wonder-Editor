open MainEditorConsoleType;

type state = {consoleMessageArr: array(consoleMessageType)};

type action =
  | ClearAllMessage
  | ThrowError(string)
  | ThrowInfo(string)
  | ThrowWarn(string)
  | ThrowTrace(string)
  | ThrowLog(string);

module Method = {
  let trigerErrorAction = (send, message) => send(ThrowError(message));

  let trigerInfoAction = (send, message) => send(ThrowInfo(message));

  let trigerWarnAction = (send, message) => send(ThrowWarn(message));

  let trigerTraceAction = (send, message) => send(ThrowTrace(message));

  let trigerLogAction = (send, message) => send(ThrowLog(message));

  let showConsoleMsgComponent = consoleMessageArr =>
    consoleMessageArr
    |> Js.Array.map(({message, consoleType, traceInfo}) =>
         switch (consoleType) {
         | Error =>
           <ConsoleBaseComponent
             key=(DomHelper.getRandomKey())
             type_="error"
             message
             traceInfo
           />
         | Info =>
           <ConsoleBaseComponent
             key=(DomHelper.getRandomKey())
             type_="info"
             message
             traceInfo
           />
         | Warn =>
           <ConsoleBaseComponent
             key=(DomHelper.getRandomKey())
             type_="warn"
             message
             traceInfo
           />
         | Log =>
           <ConsoleBaseComponent
             key=(DomHelper.getRandomKey())
             type_="log"
             message
             traceInfo
           />
         | _ => ReasonReact.null
         }
       );
};

let component = ReasonReact.reducerComponent("MainEditorConsole");

let reducer = (action, state) =>
  switch (action) {
  | ClearAllMessage =>
    ReasonReact.Update({...state, consoleMessageArr: ArrayService.create()})

  | ThrowError(message) =>
    ReasonReact.Update({
      ...state,
      consoleMessageArr:
        state.consoleMessageArr
        |> ArrayService.push({message, consoleType: Error, traceInfo: None}),
    })
  | ThrowInfo(message) =>
    ReasonReact.Update({
      ...state,
      consoleMessageArr:
        state.consoleMessageArr
        |> ArrayService.push({message, consoleType: Info, traceInfo: None}),
    })
  | ThrowWarn(message) =>
    ReasonReact.Update({
      ...state,
      consoleMessageArr:
        state.consoleMessageArr
        |> ArrayService.push({message, consoleType: Warn, traceInfo: None}),
    })
  | ThrowTrace(message) =>
    let copiedMessageArr = state.consoleMessageArr |> Js.Array.copy;
    switch (copiedMessageArr |> Js.Array.pop) {
    | None => ReasonReact.NoUpdate
    | Some({traceInfo} as messageRecord) =>
      switch (traceInfo) {
      | None =>
        ReasonReact.Update({
          ...state,
          consoleMessageArr:
            copiedMessageArr
            |> ArrayService.push({
                 ...messageRecord,
                 traceInfo: Some(message),
               }),
        })

      | Some(_) => ReasonReact.NoUpdate
      }
    };

  | ThrowLog(message) =>
    ReasonReact.Update({
      ...state,
      consoleMessageArr:
        state.consoleMessageArr
        |> ArrayService.push({message, consoleType: Log, traceInfo: None}),
    })
  };

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
    e => Console.throwFatal(e##message),
  );

let render = (isShowComponent, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  isShowComponent ?
    <article key="console" className="wonder-console-component">
      <div className="">
        <button className="" onClick=(_e => send(ClearAllMessage))>
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
      (
        state.consoleMessageArr |> ArrayService.hasItem ?
          ReasonReact.array(
            Method.showConsoleMsgComponent(state.consoleMessageArr),
          ) :
          ReasonReact.null
      )
    </article> :
    ReasonReact.null;

let make = (~isShowComponent, _children) => {
  ...component,
  initialState: () => {consoleMessageArr: [||]},
  reducer,
  render: render(isShowComponent),
  didMount: ({send}: ReasonReact.self('a, 'b, 'c)) =>
    Console.stubConsole(
      Method.trigerErrorAction(send),
      Method.trigerInfoAction(send),
      Method.trigerWarnAction(send),
      Method.trigerTraceAction(send),
      Method.trigerLogAction(send),
    ),
};