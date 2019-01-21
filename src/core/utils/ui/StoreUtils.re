open AppStore;

open UpdateStore;

let getUpdateComponentTypeArr = uiState => uiState.updateState.componentTypeArr;

let getBottomCurrentComponentType = uiState =>
  uiState.showComponentState.currentComponentType;

let geGameObjectisShowComponentFromStore = (uiState, componentType) =>
  switch (
    uiState.inspectorState.showComponentMap
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