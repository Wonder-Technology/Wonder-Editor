open AppStore;

let unsafeGetSceneGraphData = store =>
  store.sceneTreeState.sceneGraphData |> OptionService.unsafeGet;

let setSceneGraphData = (sceneGraphData, store) => {
  ...store,
  sceneTreeState: {
    ...store.sceneTreeState,
    sceneGraphData: Some(sceneGraphData),
  },
};