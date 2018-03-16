let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let buildEmptyAppState = () => AppStore.state;

let initMainEditor = (sandbox) =>
  MainEditorMainTool.init(sandbox) |> StateLogicService.setState;

let openContractCheck = () => EditorStateData.editorStateData.isDebug = true;

let closeContractCheck = () => EditorStateData.editorStateData.isDebug = false;