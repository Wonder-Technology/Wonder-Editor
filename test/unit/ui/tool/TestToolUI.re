
let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let buildEmptyAppState = () => AppStore.state;

let initMainEditor = (sandbox) =>
  MainEditorViewTool.init(sandbox) |> MainEditorStateView.finishState;