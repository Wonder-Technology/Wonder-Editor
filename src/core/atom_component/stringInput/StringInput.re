Css.importCss("./css/stringInput.css");

type state = {
  inputValue: string,
  originalName: string,
};

type action =
  | Blur
  | Change(string);

module Method = {
  let change = event => {
    let inputVal = ReactDOMRe.domElementToObj(
                     ReactEventRe.Form.target(event),
                   )##value;
    Change(inputVal);
  };
  let triggerOnChange = (value, onChangeFunc) =>
    switch (onChangeFunc) {
    | None => ()
    | Some(onChange) => onChange(value)
    };
  let triggerOnBlur = (value, onBlurFunc) =>
    switch (onBlurFunc) {
    | None => ()
    | Some(onBlur) => onBlur(value)
    };

  let handleBlurAction = (state, canBeNull, onBlurFunc) =>
    switch (canBeNull) {
    | None =>
      triggerOnBlur(state.inputValue, onBlurFunc);
      ReasonReact.NoUpdate;
    | Some(canBeNull) =>
      canBeNull ?
        {
          triggerOnBlur(state.inputValue, onBlurFunc);
          ReasonReact.NoUpdate;
        } :
        (
          switch (state.inputValue) {
          | "" =>
            ReasonReact.Update({...state, inputValue: state.originalName})
          | value =>
            ReasonReactUtils.updateWithSideEffects(
              {...state, originalName: value}, _state =>
              triggerOnBlur(state.inputValue, onBlurFunc)
            )
          }
        )
    };
};

let component = ReasonReact.reducerComponent("StringInput");

let reducer = ((onChangeFunc, onBlurFunc), canBeNull, action, state) =>
  switch (action) {
  | Change(value) =>
    ReasonReactUtils.updateWithSideEffects(
      {...state, inputValue: value}, _state =>
      Method.triggerOnChange(value, onChangeFunc)
    )

  | Blur => Method.handleBlurAction(state, canBeNull, onBlurFunc)
  };

let render = (label, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-string-input">
    (
      switch (label) {
      | None => ReasonReact.nullElement
      | Some(value) =>
        <span className="component-label">
          (DomHelper.textEl(value ++ " : "))
        </span>
      }
    )
    <input
      className="input-component float-input"
      _type="text"
      value=state.inputValue
      onChange=(_e => send(Method.change(_e)))
      onBlur=(_e => send(Blur))
    />
  </article>;

let make =
    (
      ~defaultValue: option(string)=?,
      ~label: option(string)=?,
      ~onChange: option(string => unit)=?,
      ~onBlur: option(string => unit)=?,
      ~canBeNull: option(bool)=?,
      _children,
    ) => {
  ...component,
  initialState: () =>
    switch (defaultValue) {
    | None => {inputValue: "", originalName: ""}
    | Some(value) => {inputValue: value, originalName: value}
    },
  reducer: reducer((onChange, onBlur), canBeNull),
  render: self => render(label, self),
};