type state = {
  inputValue: string,
  originValue: string,
};

type action =
  | Blur
  | Change(string);

module Method = {
  let change = event => {
    let inputVal =
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;
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

  let _isValueNotChange = ({originValue, inputValue}) =>
    inputValue |> ValueService.isValueEqual(ValueType.String, originValue);

  let handleBlurAction = (state, canBeNull, onBlurFunc) =>
    switch (canBeNull) {
    | None =>
      _isValueNotChange(state) ?
        ReasonReact.NoUpdate :
        ReasonReactUtils.updateWithSideEffects(
          {...state, originValue: state.inputValue}, _state =>
          triggerOnBlur(state.inputValue, onBlurFunc)
        )
    | Some(canBeNull) =>
      _isValueNotChange(state) ?
        ReasonReact.NoUpdate :
        canBeNull ?
          ReasonReactUtils.updateWithSideEffects(
            {...state, originValue: state.inputValue}, _state =>
            triggerOnBlur(state.inputValue, onBlurFunc)
          ) :
          (
            switch (state.inputValue) {
            | "" =>
              ReasonReact.Update({...state, inputValue: state.originValue})
            | value =>
              ReasonReactUtils.updateWithSideEffects(
                {...state, originValue: value}, _state =>
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

let render = (label, title, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="inspector-item">
    {
      switch (label) {
      | None => ReasonReact.null
      | Some(value) =>
        <div
          className="item-header"
          title={
            switch (title) {
            | None => ""
            | Some(title) => title
            }
          }>
          <span className="component-label"> {DomHelper.textEl(value)} </span>
        </div>
      }
    }
    <div className="item-content">
      <input
        className="input-component float-input"
        type_="text"
        value={state.inputValue}
        onChange={_e => send(Method.change(_e))}
        onBlur={_e => send(Blur)}
      />
    </div>
  </article>;

let make =
    (
      ~defaultValue: option(string)=?,
      ~label: option(string)=?,
      ~title: option(string)=?,
      ~onChange: option(string => unit)=?,
      ~onBlur: option(string => unit)=?,
      ~canBeNull: option(bool)=?,
      _children,
    ) => {
  ...component,
  initialState: () =>
    switch (defaultValue) {
    | None => {inputValue: "", originValue: ""}
    | Some(value) => {inputValue: value, originValue: value}
    },
  reducer: reducer((onChange, onBlur), canBeNull),
  render: self => render(label, title, self),
};