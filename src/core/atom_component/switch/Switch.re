type state = {isOpen: bool};

type action =
  | ChangeState;

module Method = {
  let changeState = _event => ChangeState;
};

let component = ReasonReact.reducerComponent("Switch");

let reducer = (openFunc, closeFunc, action) =>
  switch (action) {
  | ChangeState => (
      state =>
        state.isOpen ?
          ReasonReactUtils.updateWithSideEffects(
            {...state, isOpen: ! state.isOpen}, _state =>
            closeFunc()
          ) :
          ReasonReactUtils.updateWithSideEffects(
            {...state, isOpen: ! state.isOpen}, _state =>
            openFunc()
          )
    )
  };

let render =
    (
      openText,
      closeText,
      {state, handle, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-switch">
    (
      state.isOpen ?
        <button onClick=(_e => send(Method.changeState(_e)))>
          (DomHelper.textEl(closeText))
        </button> :
        <button onClick=(_e => send(Method.changeState(_e)))>
          (DomHelper.textEl(openText))
        </button>
    )
  </article>;

let make =
    (
      ~openText: string,
      ~openFunc: unit => unit,
      ~closeText: string,
      ~closeFunc: unit => unit,
      ~isOpen: bool,
      _children,
    ) => {
  ...component,
  initialState: () => {isOpen: isOpen},
  reducer: reducer(openFunc, closeFunc),
  render: self => render(openText, closeText, self),
};