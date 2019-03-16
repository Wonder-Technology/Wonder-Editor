module IndexStoreProvider = {
  let make = Reductive.Provider.createMake(IndexStore.store);
};

LanguageEditorService.setType(
  Window.getLanguage(.) |> LanguageUtils.getLanguageType,
)
|> StateLogicService.getAndSetEditorState;

ReactDOMRe.renderToElementWithId(
  <IndexStoreProvider component=App.make />,
  "index",
);