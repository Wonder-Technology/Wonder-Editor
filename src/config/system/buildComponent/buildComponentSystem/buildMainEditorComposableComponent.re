let buildMainEditor =
    (state_: option(AppStore.appState)) =>
  switch state_ {
  | Some(state) => <MainEditor state />
  | _ => ExcepetionHandleSystem.throwMessage({j|mainEditor build:the arguments is error|j})
  };