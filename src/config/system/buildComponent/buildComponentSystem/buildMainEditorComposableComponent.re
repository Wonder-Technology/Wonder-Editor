let buildMainEditor =
    (state_: option(AppStore.appState), dispatch_: option((ReduxThunk.thunk('a) => unit))) =>
  switch (state_, dispatch_) {
  | (Some(state), Some(dispatch)) => <MainEditor state dispatch />
  | _ => ExcepetionHandleSystem.throwMessage({j|mainEditor:the arguments is error|j})
  };