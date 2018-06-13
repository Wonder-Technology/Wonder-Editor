Css.importCss("./css/floatInput.css");

type state = {inputValue: option(string)};

type action =
  | Change(option(string));

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

  let triggerOnBlur = (onBlurFunc, _event) =>
    switch (onBlurFunc) {
    | None => ()
    | Some(onBlur) => onBlur()
    };
};

let component = ReasonReact.reducerComponent("FloatInput");

let reducer = (onChangeFunc, action) =>
  switch (action) {
  | Change(value) =>
    switch (value) {
    | None => (_state => ReasonReact.NoUpdate)
    | Some("-") => (
        state => ReasonReact.Update({...state, inputValue: Some("-")})
      )
    | Some("") => (state => ReasonReact.Update({...state, inputValue: None}))
    | Some(value) => (
        state =>
          ReasonReactUtils.updateWithSideEffects(
            {...state, inputValue: Some(value)}, _state =>
            Method.triggerOnChange(value, onChangeFunc)
          )
      )
    }
  };

let render =
    (label, onBlurFunc, {state, handle, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-float-input">
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
      value=(
        switch (state.inputValue) {
        | None => ""
        | Some(value) => value
        }
      )
      onChange=(_e => send(Method.change(_e)))
      onBlur=(Method.triggerOnBlur(onBlurFunc))
    />
  </article>;

let make =
    (
      ~defaultValue: option(string)=?,
      ~label: option(string)=?,
      ~onChange: option(float => unit)=?,
      ~onBlur: option(unit => unit)=?,
      _children,
    ) => {
  ...component,
  initialState: () =>
    switch (defaultValue) {
    | None => {inputValue: Some("0")}
    | Some(value) => {inputValue: Some(value)}
    },
  /* didMount: ({state, send}) => {
       /* let inputDom = state.inputField^ |> OptionService.unsafeGet |> Obj.magic; */
       switch state.inputField^ {
       | Some(inputDom) =>
         Most.fromEvent("change", inputDom |> Obj.magic, true)
         |> Most.map((event) => unsafeEventToObj(event)##target##value)
         |> Most.observe(
              (value) => {
                switch value {
                | "" => ()
                | "-" => ()
                | _ => Method.triggerOnBlur(onBlur)
                }
              }
            )
         |> ignore
       | None => ()
       };
     }, */
  reducer: reducer(onChange),
  render: self => render(label, onBlur, self),
};