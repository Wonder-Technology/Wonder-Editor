let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let buildEmptyAppState = () => AppStore.state;

let initMainEditor = (sandbox) =>
  MainEditorViewToolEngine.init(sandbox) |> StateLogicService.setState;
