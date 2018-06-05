module IndexStoreProvider = {
  let make = Reductive.Provider.createMake(IndexStore.store);
};

ReactDOMRe.renderToElementWithId(
  <IndexStoreProvider component=App.make />,
  "index",
);