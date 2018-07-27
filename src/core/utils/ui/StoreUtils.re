open AppStore;

open UpdateStore;

let unsafeGetSceneGraphDataFromStore = (store: AppStore.appState) =>
  store.sceneTreeState.sceneGraphData |> OptionService.unsafeGet;

let getUpdateComponentTypeArr = store => store.updateState.componentTypeArr;

let shouldComponentUpdate = (componentType, updateComponentTypeArr) =>
  updateComponentTypeArr
  |> Js.Array.includes(componentType)
  || updateComponentTypeArr
  |> Js.Array.includes(All);