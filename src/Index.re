module IndexStoreProvider = {
  let make = Reductive.Provider.createMake(IndexStore.store);
};

let extend = (fck) => Js.log(fck);

ReactDOMRe.renderToElementWithId(<IndexStoreProvider component=App.make />, "index");