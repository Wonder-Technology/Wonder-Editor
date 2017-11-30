let buildMainEditor = (state_: option(AppStore.appState), dispatch) =>
  switch state_ {
  | Some(state) => <MainEditor state dispatch />
  | _ => ExcepetionHandleSystem.throwMessage({j|mainEditor build:the arguments is error|j})
  };