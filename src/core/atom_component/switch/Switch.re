/* Css.importCss("./css/floatInput.css"); */
type state = {switchState: bool};

type action =
  | ChangeState;

module Method = {
  let changeState = (_event) => ChangeState;
};

let component = ReasonReact.reducerComponent("Switch");

let reducer = (openFunc, closeFunc, action, state) =>
  switch action {
  | ChangeState =>
    state.switchState ?
      ReasonReact.UpdateWithSideEffects(
        {...state, switchState: ! state.switchState},
        ((_self) => closeFunc())
      ) :
      ReasonReact.UpdateWithSideEffects(
        {...state, switchState: ! state.switchState},
        ((_self) => openFunc())
      )
  };

let render = (openText, closeText, {state, handle, reduce}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-switch">
    (
      state.switchState ?
        <button onClick=(reduce(Method.changeState))> (DomHelper.textEl(closeText)) </button> :
        <button onClick=(reduce(Method.changeState))> (DomHelper.textEl(openText)) </button>
    )
  </article>;

  /* TODO rename switchState to isOpen */
let make =
    (
      ~openText: string,
      ~openFunc: unit => unit,
      ~closeText: string,
      ~closeFunc: unit => unit,
      ~initState: bool,
      _children
    ) => {
  ...component,
  initialState: () => {switchState: initState},
  reducer: reducer(openFunc, closeFunc),
  render: (self) => render(openText, closeText, self)
};