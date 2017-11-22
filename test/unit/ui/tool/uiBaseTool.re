let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let componentsMap = ComponentMapConfig.createComponentMap(getDispatch());

let buildFakeAppState = () => {
  let state = AppStore.state;
  state.mapState.componentsMap = Some(componentsMap);
  state
};