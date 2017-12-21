let importCss = (css) => {};

importCss("./css/floatInput.css");

type state = {
  inputField: ref(option(Dom.element)),
  inputValue: option(string)
};

type action =
  | Change(option(string));

let component = ReasonReact.reducerComponent("FloatInput");

let setInputFiledRef = (value, {ReasonReact.state}) => state.inputField := Js.Null.to_opt(value);

let make =
    (
      ~defaultValue: option(string)=?,
      ~label: option(string)=?,
      ~onChange: option((float => unit))=?,
      _children
    ) => {
  let _change = (event) => {
    let inputVal = ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;
    let matchNumber = (value: string) => {
      let regex = [%re {|/^-?(0|[1-9][0-9]*)(\.[0-9]{0,6})?$/|}];
      switch (regex |> Js.Re.test(value)) {
      | false => Change(None)
      | true => Change(Some(value))
      }
    };
    switch inputVal {
    | "" => Change(Some(""))
    | "-" => Change(Some("-"))
    | value => value |> matchNumber
    }
  };
  let _triggerOnChangeWithFloatValue = (value) =>
    switch onChange {
    | None => ()
    | Some(onChange) => onChange(float_of_string(value))
    };
  {
    ...component,
    initialState: () =>
      switch defaultValue {
      | None => {inputValue: Some("0"), inputField: ref(None)}
      | Some(value) => {inputValue: Some(value), inputField: ref(None)}
      },
    reducer: (action, state) =>
      switch action {
      | Change(value) =>
        switch value {
        | None => ReasonReact.NoUpdate
        | Some("-") => ReasonReact.Update({...state, inputValue: Some("-")})
        | Some("") =>
          ReasonReact.UpdateWithSideEffects(
            {...state, inputValue: None},
            ((_self) => _triggerOnChangeWithFloatValue("0"))
          )
        | Some(value) =>
          ReasonReact.UpdateWithSideEffects(
            {...state, inputValue: Some(value)},
            ((_self) => _triggerOnChangeWithFloatValue(value))
          )
        }
      },
    render: ({state, handle, reduce}) =>
      /* Most.(
           fromList([0,1,2,3,4])
           |> map((value) => {
             value + 1;
           })
           |> observe((x) => Js.log(x));
         ); */
      <div className="wonder-float-input">
        (
          switch label {
          | None => ReasonReact.nullElement
          | Some(value) =>
            <span className="component-label"> (DomHelper.textEl(value ++ " : ")) </span>
          }
        )
        <input
          ref=(handle(setInputFiledRef))
          className="input-component float-input"
          _type="text"
          value=(
            switch state.inputValue {
            | None => ""
            | Some(value) => value
            }
          )
          onChange=(reduce(_change))
        />
      </div>
  }
};