/* Css.importCss("./css/floatInput.css"); */
type state = {isOpen: bool};

type action =
  | ChangeState;

module Method = {
  let changeState = (_event) => ChangeState;
};

let component = ReasonReact.reducerComponent("Switch");

let reducer = (openFunc, closeFunc, action, state) =>
  switch action {
  | ChangeState =>
    state.isOpen ?
      ReasonReact.UpdateWithSideEffects(
        {...state, isOpen: ! state.isOpen},
        ((_self) => closeFunc())
      ) :
      ReasonReact.UpdateWithSideEffects(
        {...state, isOpen: ! state.isOpen},
        ((_self) => openFunc())
      )
  };

let render = (openText, closeText, {state, handle, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-switch">
    (
      state.isOpen ?
        <button onClick=(_e =>send(Method.changeState(_e)))> (DomHelper.textEl(closeText)) </button> :
        <button onClick=(_e =>send(Method.changeState(_e)))> (DomHelper.textEl(openText)) </button>
    )
  </article>;

let make =
    (
      ~openText: string,
      ~openFunc: unit => unit,
      ~closeText: string,
      ~closeFunc: unit => unit,
      ~isOpen: bool,
      _children
    ) => {
  ...component,
  initialState: () => {isOpen: isOpen},
  reducer: reducer(openFunc, closeFunc),
  render: (self) => render(openText, closeText, self)
};