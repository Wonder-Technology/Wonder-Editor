type state = {
  isShowTrace: bool,
  hasTrace: bool,
  traceString: string,
};

type action =
  | ToggleShowTrace;

let component = ReasonReact.reducerComponent("ConsoleBaseComponent");

let reducer = (action, state) =>
  switch (action) {
  | ToggleShowTrace =>
    ReasonReact.Update({...state, isShowTrace: ! state.isShowTrace})
  };

let render = (type_, message, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className=("console-" ++ type_)>
    <div className="console-header" onClick=(_e => send(ToggleShowTrace))>
      (
        state.hasTrace ?
          <span className=""> (DomHelper.textEl(">> ")) </span> :
          ReasonReact.nullElement
      )
      (DomHelper.textEl(message))
    </div>
    (
      state.isShowTrace ?
        <div className=""> (DomHelper.textEl(state.traceString)) </div> :
        ReasonReact.nullElement
    )
  </article>;

let make = (~message, ~traceInfo, ~type_, _children) => {
  ...component,
  initialState: () => {
    isShowTrace: false,
    hasTrace: traceInfo |> Js.Option.isSome,
    traceString:
      traceInfo |> Js.Option.isSome ? traceInfo |> Js.Option.getExn : "",
  },
  reducer,
  render: self => render(type_, message, self),
};