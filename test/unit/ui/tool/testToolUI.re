let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let componentsMap = ExtendParseSystem.createExtendMapAddToComponentMap(ExtendText.extendText);

let buildFakeAppState = () => {
  let state = AppStore.state;
  state.mapState.componentsMap = Some(componentsMap);
  state
};

let initMainEditor = (sandbox) =>
  MainEditorViewTool.init(sandbox) |> MainEditorStateView.finishState;