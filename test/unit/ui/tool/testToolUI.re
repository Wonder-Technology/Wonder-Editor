let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

/* let componentsMap = ComponentMapConfig.createComponentMap("a"); */

let buildFakeAppState = () => {
  let state = AppStore.state;
  /* state.mapState.componentsMap = Some(componentsMap); */
  state
};

let initMainEditor = (sandbox) => {
  MainEditorViewTool.init(sandbox) |> MainEditorStateView.finishState;
}