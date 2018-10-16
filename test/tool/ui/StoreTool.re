open AppStore;

let setSceneGraphData = (sceneGraphData, store) => {
  ...store,
  sceneTreeState: {
    ...store.sceneTreeState,
    sceneGraphData: Some(sceneGraphData),
  },
};