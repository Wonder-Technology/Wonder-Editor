open DomHelper;

let buildNumberInput = (label, defaultValue, onChange) =>
  <NumberInput ?label ?defaultValue ?onChange />;

let buildMainEditor =
    (
      state_: option(StringStore.stringState),
      dispatch_: option((ReduxThunk.thunk('a) => unit)),
      appState_: option(AppStore.appState)
    ) =>
  switch (state_, dispatch_, appState_) {
  | (Some(state), Some(dispatch), Some(appState)) => <MainEditor state dispatch appState />
  | _ => ExcepetionHandleSystem.throwMessage({j|mainEditor:the arguments is error|j})
  };

let buildButton = (text, onClick) =>
  switch text {
  | None => ExcepetionHandleSystem.throwMessage({j|button:the text is empty|j})
  | Some(value) =>
    <Ant.Button ?onClick size="small" key=value _type="primary"> (textEl(value)) </Ant.Button>
  };

let buildErrText = () => <div> (textEl("this is error")) </div>;