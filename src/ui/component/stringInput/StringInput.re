Css.importCss("./css/floatInput.css");

type state = {
  inputField: ref(option(Dom.element)),
  inputValue: string
};

type action =
  | Blur
  | Change(string);

module Method = {
  let change = (event) => {
    let inputVal = ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;
    Change(inputVal)
  };
  let blur = (_event) => Blur;
  let triggerOnChange = (value, onChange) =>
    switch onChange {
    | None => ()
    | Some(onChange) => onChange(value)
    };
  let triggerOnBlur = (value, onBlur) =>
    switch onBlur {
    | None => ()
    | Some(onBlur) => onBlur(value)
    };
};

let component = ReasonReact.reducerComponent("FloatInput");

let setInputFiledRef = (value, {ReasonReact.state}) => state.inputField := Js.Null.to_opt(value);

let reducer = (onChange, onBlur, action, state) =>
  switch action {
  | Change(value) =>
    ReasonReact.UpdateWithSideEffects(
      {...state, inputValue: value},
      ((_self) => Method.triggerOnChange(value, onChange))
    )
  | Blur =>
    Method.triggerOnBlur(state.inputValue, onBlur);
    ReasonReact.NoUpdate
  };

let render = (label, onBlur, {state, handle, reduce}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-float-input">
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
      value=state.inputValue
      onChange=(reduce(Method.change))
      onBlur=(reduce(Method.blur))
    />
  </article>;

let make =
    (
      ~defaultValue: option(string)=?,
      ~label: option(string)=?,
      ~onChange: option((string => unit))=?,
      ~onBlur: option((string => unit))=?,
      _children
    ) => {
  ...component,
  initialState: () =>
    switch defaultValue {
    | None => {inputValue: "", inputField: ref(None)}
    | Some(value) => {inputValue: value, inputField: ref(None)}
    },
  reducer: reducer(onChange, onBlur),
  render: (self) => render(label, onBlur, self)
};