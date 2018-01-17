Css.importCss("./css/fileInput.css");

type state = {
  inputField: ref(option(Dom.element)),
  inputValue: string,
  isShowInput: bool
};

type action =
  | ShowInput
  | Change(string)
  | Submit;

module Method = {
  let change = (event) =>
    Change(ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value);
  let triggerOnSubmitWithValue = (value, onSubmit) =>
    switch onSubmit {
    | None => ()
    | Some(onSubmit) => onSubmit(value)
    };
  let submit = (_event) => Submit;
  let showInput = (_event) => ShowInput;
};

let component = ReasonReact.reducerComponent("FileInput");

/* todo should check user key in text to be invalid */
let setInputFiledRef = (value, {ReasonReact.state}) => state.inputField := Js.Null.to_opt(value);

let reducer = (onSubmit, action, state) =>
  switch action {
  | ShowInput => ReasonReact.Update({...state, isShowInput: ! state.isShowInput})
  | Change(text) => ReasonReact.Update({...state, inputValue: text})
  | Submit =>
    switch (Js.String.trim(state.inputValue)) {
    | "" => ReasonReact.NoUpdate
    | inputValue =>
      ReasonReact.UpdateWithSideEffects(
        {...state, inputValue},
        ((_self) => Method.triggerOnSubmitWithValue(inputValue, onSubmit))
      )
    }
  };

let render = (buttonText, {state, handle, reduce}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-file-input">
    (
      switch buttonText {
      | None => ReasonReact.nullElement
      | Some(value) =>
        <button onClick=(reduce(Method.showInput))> (DomHelper.textEl(value)) </button>
      }
    )
    (
      state.isShowInput ?
        <div>
          <textarea
            ref=(handle(setInputFiledRef))
            className="input-component file-input"
            _type="text"
            value=state.inputValue
            onChange=(reduce(Method.change))
          />
          <button onClick=(reduce(Method.submit))> (DomHelper.textEl("submit")) </button>
        </div> :
        ReasonReact.nullElement
    )
  </article>;

let make = (~buttonText: option(string)=?, ~onSubmit: option((string => unit))=?, _children) => {
  ...component,
  initialState: () => {inputValue: "", inputField: ref(None), isShowInput: false},
  reducer: reducer(onSubmit),
  render: (self) => render(buttonText, self)
};