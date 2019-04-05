type state = {
  inputValue: string,
  isShowInput: bool,
};

type action =
  | ShowInput
  | Change(string)
  | Submit;

module Method = {
  let change = event =>
    Change(
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value,
    );

  let triggerOnSubmitWithValue = (value, onSubmitFunc) =>
    switch (onSubmitFunc) {
    | None => ()
    | Some(onSubmit) => onSubmit(value)
    };

  let submit = _event => Submit;

  let showInput = _event => ShowInput;
};

let component = ReasonReact.reducerComponent("FileInput");

/* todo should check user key in text to be invalid */

let reducer = (onSubmitFunc, action) =>
  switch (action) {
  | ShowInput => (
      state =>
        ReasonReact.Update({...state, isShowInput: ! state.isShowInput})
    )

  | Change(text) => (
      state => ReasonReact.Update({...state, inputValue: text})
    )

  | Submit => (
      state =>
        switch (Js.String.trim(state.inputValue)) {
        | "" => ReasonReact.NoUpdate
        | inputValue =>
          ReasonReactUtils.updateWithSideEffects(
            {...state, inputValue}, _state =>
            Method.triggerOnSubmitWithValue(inputValue, onSubmitFunc)
          )
        }
    )
  };
let render =
    (buttonText, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-file-input">
    (
      switch (buttonText) {
      | None => ReasonReact.null
      | Some(value) =>
        <button onClick=(_e => send(Method.showInput(_e)))>
          (DomHelper.textEl(value))
        </button>
      }
    )
    (
      state.isShowInput ?
        <div>
          <textarea
            className="input-component file-input"
            type_="text"
            value=state.inputValue
            onChange=(_e => send(Method.change(_e)))
          />
          <button onClick=(_e => send(Method.submit(_e)))>
            (DomHelper.textEl("submit"))
          </button>
        </div> :
        ReasonReact.null
    )
  </article>;

let make =
    (
      ~buttonText: option(string)=?,
      ~onSubmit: option(string => unit)=?,
      ~isShowInput=false,
      ~inputValue="",
      _children,
    ) => {
  ...component,
  initialState: () => {inputValue, isShowInput},
  reducer: reducer(onSubmit),
  render: self => render(buttonText, self),
};