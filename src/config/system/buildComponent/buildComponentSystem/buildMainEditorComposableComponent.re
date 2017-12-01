let buildMainEditor = (store: option(AppStore.appState), dispatch) =>
  switch store {
  | Some(store) => <MainEditor store dispatch />
  | _ => ExcepetionHandleSystem.throwMessage({j|mainEditor build:the arguments is error|j})
  };