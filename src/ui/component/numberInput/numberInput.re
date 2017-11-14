let importCss = (css: string) => {};

importCss("./numberInput.scss");

type state = {
  inputField: ref(option(Dom.element)),
  inputValue: option(string)
};

type action =
  | Change(option(string));

let component = ReasonReact.reducerComponent("NumberInput");

let setInputFiledRef = (value, {ReasonReact.state}) => state.inputField := Js.Null.to_opt(value);

let make =
    (
      ~defaultValue: option(string)=?,
      ~label: option(string)=?,
      ~onChange: option((float => unit))=?,
      _children
    ) => {
  let change = (event) => {
    let inputVal = ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;
    let matchNumber = (value: string) => {
      let regex = [%re {|/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/|}];
      switch (regex |> Js.Re.exec(value)) {
      | None => Change(None)
      | Some(result) => Change(Some(value))
      }
    };
    switch inputVal {
    | "" => Change(Some(""))
    | value => value |> matchNumber
    }
  };
  let onChangeUtil = (value) =>
    switch onChange {
    | None => ()
    | Some(onChange) => onChange(float_of_string(value))
    };
  {
    ...component,
    initialState: () => {inputValue: Some("0"), inputField: ref(None)},
    reducer: (action, state) =>
      switch action {
      | Change(value) =>
        switch value {
        | None => ReasonReact.NoUpdate
        | Some("") =>
          ReasonReact.UpdateWithSideEffects(
            {...state, inputValue: None},
            ((_self) => onChangeUtil("0"))
          )
        | Some(value_) =>
          ReasonReact.UpdateWithSideEffects(
            {...state, inputValue: Some(value_)},
            ((_self) => onChangeUtil(value_))
          )
        }
      },
    didMount: ({state}) =>
      switch defaultValue {
      | None => ReasonReact.NoUpdate
      | Some(value) => ReasonReact.Update({...state, inputValue: Some(value)})
      },
    render: ({state, handle, reduce}) => {
      /* Most.(
           fromList([0,1,2,3,4])
           |> map((value) => {
             value + 1;
           })
           |> observe((x) => Js.log(x));
         ); */
      let labelText =
        switch label {
        | None => ReasonReact.nullElement
        | Some(value) => <span className="number-label"> (DomHelper.textEl(value ++ " : ")) </span>
        };
      <div className="number-input">
        labelText
        <input
          ref=(handle(setInputFiledRef))
          className="ant-input number-input-input"
          _type="text"
          value=(
            switch state.inputValue {
            | None => ""
            | Some(value) => value
            }
          )
          onChange=(reduce(change))
        />
      </div>
    }
  }
};