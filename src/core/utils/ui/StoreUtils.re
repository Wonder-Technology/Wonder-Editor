open AppStore;

open UpdateStore;

let getSceneGraphDataFromStore = (store: AppStore.appState) =>
  store.sceneTreeState.sceneGraphData;

let unsafeGetSceneGraphDataFromStore = (store: AppStore.appState) =>
  getSceneGraphDataFromStore(store) |> OptionService.unsafeGet;

let getUpdateComponentTypeArr = store => store.updateState.componentTypeArr;

let getBottomCurrentComponentType = store =>
  store.showComponentState.currentComponentType;

let geGameObjectisShowComponentFromStore = (store, componentType) =>
  switch (
    store.inspectorState.showComponentMap
    |> WonderCommonlib.SparseMapService.get(componentType)
  ) {
  | None => true
  | Some(isShowComponent) => isShowComponent
  };

let shouldComponentUpdate = (componentType, updateComponentTypeArr) =>
  updateComponentTypeArr
  |> Js.Array.includes(componentType)
  || updateComponentTypeArr
  |> Js.Array.includes(All);