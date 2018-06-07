/* TODO remove this utils */
/* TODO rename to getFlag */
/* TODO move to SceneTreeUtils */

/* TODO move to state->store service */
let unsafeGetSceneGraphDataFromStore = (store: AppStore.appState) =>
  store.sceneTreeState.sceneGraphData |> OptionService.unsafeGet;