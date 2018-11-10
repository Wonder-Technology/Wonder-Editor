type state = {
  isShowTrace: bool,
  hasTrace: bool,
  traceString: string,
};

type action =
  | ToggleShowTrace;

module Method = {
  let buildTraceComponent = traceString =>
    traceString
    |> Js.String.split(" at ")
    |> Js.Array.mapi((info, i) =>
         <p key=("info" ++ (i |> string_of_int)) className="trace-info">
           (DomHelper.textEl(info))
         </p>
       );
};

let component = ReasonReact.reducerComponent("ConsoleBaseComponent");

let reducer = (action, state) =>
  switch (action) {
  | ToggleShowTrace =>
    ReasonReact.Update({...state, isShowTrace: ! state.isShowTrace})
  };

let render =
    (
      type_,
      (message, imageSrc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className=("console-" ++ type_)>
    <div className="console-header" onClick=(_e => send(ToggleShowTrace))>
      <img src=imageSrc />
      (state.hasTrace ? <img src="./public/img/more.png" /> : ReasonReact.null)
      <div className="header-message">
        (
          DomHelper.textEl(
            message |> Js.Json.stringifyAny |> OptionService.unsafeGet,
          )
        )
      </div>
    </div>
    (
      state.hasTrace && state.isShowTrace ?
        <div className="console-trace">
          (
            ReasonReact.arrayToElement(
              Method.buildTraceComponent(state.traceString),
            )
          )
        </div> :
        ReasonReact.null
    )
  </article>;

let make = (~message, ~traceInfo, ~type_, ~imageSrc, _children) => {
  ...component,
  initialState: () => {
    isShowTrace: false,
    hasTrace: traceInfo |> Js.Option.isSome,
    traceString:
      traceInfo |> Js.Option.isSome ? traceInfo |> Js.Option.getExn : "",
  },
  reducer,
  render: self => render(type_, (message, imageSrc), self),
};