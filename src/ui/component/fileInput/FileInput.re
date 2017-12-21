let importCss = (css) => {};

importCss("./css/fileInput.css");

type state = {
  inputField: ref(option(Dom.element)),
  inputValue: string,
  isShowInput: bool
};

type action =
  | ShowInput
  | Change(string)
  | Submit;

/* todo should check user key in text to be invalid */
let component = ReasonReact.reducerComponent("FileInput");

let setInputFiledRef = (value, {ReasonReact.state}) => state.inputField := Js.Null.to_opt(value);

let make = (~buttonText: option(string)=?, ~onSubmit: option((string => unit))=?, _children) => {
  let _change = (event) =>
    Change(ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value);
  let _triggerOnSubmitWithValue = (value, onSubmit) =>
    switch onSubmit {
    | None => ()
    | Some(onSubmit) => onSubmit(value)
    };
  let _submit = (_event) => Submit;
  let _showInput = (_event) => ShowInput;
  {
    ...component,
    initialState: () => {inputValue: "", inputField: ref(None), isShowInput: false},
    reducer: (action, state) =>
      switch action {
      | ShowInput => ReasonReact.Update({...state, isShowInput: ! state.isShowInput})
      | Change(text) => ReasonReact.Update({...state, inputValue: text})
      | Submit =>
        switch (Js.String.trim(state.inputValue)) {
        | "" => ReasonReact.NoUpdate
        | inputValue =>
          ReasonReact.UpdateWithSideEffects(
            {...state, inputValue},
            ((_self) => _triggerOnSubmitWithValue(inputValue, onSubmit))
          )
        }
      },
    render: ({state, handle, reduce}) =>
      <div className="wonder-file-input">
        (
          switch buttonText {
          | None => ReasonReact.nullElement
          | Some(value) =>
            <button onClick=(reduce(_showInput))> (DomHelper.textEl(value)) </button>
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
                onChange=(reduce(_change))
              />
              <button onClick=(reduce(_submit))> (DomHelper.textEl("submit")) </button>
            </div> :
            ReasonReact.nullElement
        )
      </div>
  }
};