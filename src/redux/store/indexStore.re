let store =
  Reductive.Store.create(
    ~reducer=AppStore.appReducter,
    ~preloadedState=AppStore.state,
    ~enhancer= HistoryStore.thunkedLoggedTimeTravelLogger,
    ()
  );