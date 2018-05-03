let getSign = () => "sceneTree";

let unsafeGetSceneGraphDataFromStore = (store: AppStore.appState) =>
  store.sceneTreeState.sceneGraphData |> OptionService.unsafeGet;