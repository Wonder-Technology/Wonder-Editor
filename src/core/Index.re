module IndexStoreProvider = {
  let make = Reductive.Provider.createMake(IndexStore.store);
};

LanguageEditorService.setType(
  Window.getLanguage(.) |> LanguageEditorService.convertToType,
)
|> StateLogicService.getAndSetEditorState;

ReactDOMRe.renderToElementWithId(
  <IndexStoreProvider component=App.make />,
  "index",
);