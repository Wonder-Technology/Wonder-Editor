let thunkedLoggedTimeTravelLogger = (store, next) =>
  next |> Middleware.logger(store) |> Middleware.thunk(store);

let store =
  Reductive.Store.create(
    ~reducer=AppStore.appReducter,
    ~preloadedState=AppStore.state,
    ~enhancer=thunkedLoggedTimeTravelLogger,
    (),
  );