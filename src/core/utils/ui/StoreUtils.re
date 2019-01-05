open AppStore;

open UpdateStore;

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

let shouldComponentUpdateMany = (componentTypeArr, updateComponentTypeArr) =>
  ArrayService.hasIntersect(updateComponentTypeArr, componentTypeArr)
  || updateComponentTypeArr
  |> Js.Array.includes(UpdateStore.All);