module IndexStoreProvider = {
  let make =
    Reductive.Provider.createMake(
      ~name="IndexStoreProvider",
      IndexStore.store,
    );
};

ReactDOMRe.renderToElementWithId(
  <IndexStoreProvider component=App.make />,
  "index",
);