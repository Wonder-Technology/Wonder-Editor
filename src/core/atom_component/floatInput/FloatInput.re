type state = {
  inputValue: option(string),
  originValue: string,
};

type action =
  | Change(option(string))
  | Blur;

module Method = {
  let change = event => {
    let inputVal = ReactDOMRe.domElementToObj(
                     ReactEventRe.Form.target(event),
                   )##value;

    switch (inputVal) {
    | "" => Change(Some(""))
    | "-" => Change(Some("-"))
    | value =>
      switch (
        [%re {|/^-?(0|[1-9][0-9]*)(\.[0-9]{0,6})?$/|}] |> Js.Re.test(value)
      ) {
      | false => Change(None)
      | true => Change(Some(value))
      }
    };
  };

  let triggerOnChange = (value, onChangeFunc) =>
    switch (onChangeFunc) {
    | None => ()
    | Some(onChange) => onChange(float_of_string(value))
    };

  let triggerOnBlur = (value, onBlurFunc) =>
    switch (onBlurFunc) {
    | None => ()
    | Some(onBlur) => onBlur(float_of_string(value))
    };

  let handleSpecificFuncByCanBeZero =
      (state, value, canBeZero, (canBeZeroFunc, canNotBeZeroFunc)) =>
    switch (canBeZero) {
    | None => canBeZeroFunc(value)
    | Some(canBeZero) =>
      canBeZero ? canBeZeroFunc(value) : canNotBeZeroFunc(value)
    };

  let handleChangeAction = (state, onChangeFunc, canBeZero, value) =>
    switch (value) {
    | None => ReasonReact.NoUpdate
    | Some("-") => ReasonReact.Update({...state, inputValue: Some("-")})
    | Some("") => ReasonReact.Update({...state, inputValue: None})
    | Some("0") =>
      handleSpecificFuncByCanBeZero(
        state,
        "0",
        canBeZero,
        (
          value =>
            ReasonReactUtils.updateWithSideEffects(
              {...state, inputValue: Some(value)}, _state =>
              triggerOnChange(value, onChangeFunc)
            ),
          value => ReasonReact.Update({...state, inputValue: Some(value)}),
        ),
      )
    | Some("0.") =>
      handleSpecificFuncByCanBeZero(
        state,
        "0.",
        canBeZero,
        (
          value =>
            ReasonReactUtils.updateWithSideEffects(
              {...state, inputValue: Some(value)}, _state =>
              triggerOnChange(value, onChangeFunc)
            ),
          value => ReasonReact.Update({...state, inputValue: Some(value)}),
        ),
      )
    | Some(value) =>
      WonderLog.Log.print(value) |> ignore;
      ReasonReactUtils.updateWithSideEffects(
        {...state, inputValue: Some(value)}, _state =>
        triggerOnChange(value, onChangeFunc)
      );
    };

  let handleBlurAction = (state, (onChangeFunc, onBlurFunc), canBeZero) =>
    switch (state.inputValue) {
    | None
    | Some("-")
    | Some("") =>
      handleSpecificFuncByCanBeZero(
        state,
        "0",
        canBeZero,
        (
          value =>
            ReasonReactUtils.updateWithSideEffects(
              {...state, inputValue: Some(value)},
              _state => {
                triggerOnChange(value, onChangeFunc);
                triggerOnBlur(value, onBlurFunc);
              },
            ),
          value =>
            ReasonReact.Update({
              ...state,
              inputValue: Some(state.originValue),
            }),
        ),
      )
    | Some("0")
    | Some("0.") =>
      handleSpecificFuncByCanBeZero(
        state,
        "0",
        canBeZero,
        (
          value =>
            ReasonReactUtils.updateWithSideEffects(
              {...state, inputValue: Some(value)}, _state =>
              triggerOnBlur(value, onBlurFunc)
            ),
          _value => {
            ConsoleUtils.warn("the value can't be 0 !");

            ReasonReact.Update({
              ...state,
              inputValue: Some(state.originValue),
            });
          },
        ),
      )
    | Some(value) =>
      ReasonReactUtils.updateWithSideEffects(
        {...state, originValue: value}, _state =>
        triggerOnBlur(value, onBlurFunc)
      )
    };
};

let component = ReasonReact.reducerComponent("FloatInput");

let reducer = ((onChangeFunc, onBlurFunc), canBeZero, action, state) =>
  switch (action) {
  | Change(value) =>
    Method.handleChangeAction(state, onChangeFunc, canBeZero, value)
  | Blur =>
    Method.handleBlurAction(state, (onChangeFunc, onBlurFunc), canBeZero)
  };

let render =
    (label, onBlurFunc, {state, handle, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="inspector-item">
    (
      switch (label) {
      | None => ReasonReact.null
      | Some(value) =>
        <div className="item-header">
          <span className="component-label"> (DomHelper.textEl(value)) </span>
        </div>
      }
    )
    <div className="item-content">
      <input
        className="input-component float-input"
        _type="text"
        value=(
          switch (state.inputValue) {
          | None => ""
          | Some(value) => value
          }
        )
        onChange=(_e => send(Method.change(_e)))
        onBlur=(_e => send(Blur))
      />
    </div>
  </article>;

let make =
    (
      ~defaultValue: option(string)=?,
      ~label: option(string)=?,
      ~onChange: option(float => unit)=?,
      ~onBlur: option(float => unit)=?,
      ~canBeZero: option(bool)=?,
      _children,
    ) => {
  ...component,
  initialState: () =>
    switch (defaultValue) {
    | None => {inputValue: Some("0"), originValue: "0"}
    | Some(value) => {inputValue: Some(value), originValue: value}
    },
  reducer: reducer((onChange, onBlur), canBeZero),
  render: self => render(label, onBlur, self),
};