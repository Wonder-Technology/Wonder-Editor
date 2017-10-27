module IndexStoreProvider = {
  let make = Reductive.Provider.createMake AppStore.store;
};

ReactDOMRe.renderToElementWithId <IndexStoreProvider component=App.make /> "index";