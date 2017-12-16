let importCss = (css: string) => {};

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

let component = ReasonReact.reducerComponent("FileInput");

let setInputFiledRef = (value, {ReasonReact.state}) => state.inputField := Js.Null.to_opt(value);

let make = (~buttonText: option(string)=?, ~onSubmit: option((string => unit))=?, _children) => {
  let change = (event) =>
    Change(ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value);
  let triggerOnChangeWithValue = (value) =>
    switch onSubmit {
    | None => ()
    | Some(onSubmit) => onSubmit(value)
    };
  let submit = (_event) => Submit;
  let showInput = (_event) => ShowInput;
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
            ((_self) => triggerOnChangeWithValue(inputValue))
          )
        }
      },
    render: ({state, handle, reduce}) =>
      <div className="file-input">
        (
          switch buttonText {
          | None => ReasonReact.nullElement
          | Some(value) => <button onClick=(reduce(showInput))> (DomHelper.textEl(value)) </button>
          }
        )
        (
          state.isShowInput ?
            <div>
              <textarea
                ref=(handle(setInputFiledRef))
                className="ant-input number-input-input"
                _type="text"
                value=state.inputValue
                onChange=(reduce(change))
              />
              <button onClick=(reduce(submit))> (DomHelper.textEl("submit")) </button>
            </div> :
            ReasonReact.nullElement
        )
      </div>
  }
};