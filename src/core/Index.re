module IndexStoreProvider = {
  let make = Reductive.Provider.createMake(IndexStore.store);
};

Window.setLanguage(.);

ReactDOMRe.renderToElementWithId(
  <IndexStoreProvider component=App.make />,
  "index",
);