let buildMainEditor =
    /* (state_: option(AppStore.appState), dispatch_: option((ReduxThunk.thunk('a) => unit))) => */
    (state_: option(AppStore.appState)) =>
  switch state_ {
  | Some(state) => <MainEditor state />
  | _ => ExcepetionHandleSystem.throwMessage({j|mainEditor:the arguments is error|j})
  };